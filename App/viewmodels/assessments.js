define(["services/datacontext", "config"], function (datacontext, config) {
    var ctor = function () {
        assessments = ko.observableArray();
        supplier = ko.observable();

        function getAvailableClientWidth(element) {

            var result = 0,
                style = window.getComputedStyle(element),
                styleWidth = parseFloat(style.width);

            result = element.clientWidth + (isNaN(styleWidth) ? 0 : styleWidth - Math.round(styleWidth));
            result -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);

            result = isNaN(result) ? 0 : result;
            return Math.floor(result);
        }

        function updateTileWidth(boxContainer) {

            var specifiedTileWidth = 235,
            computedLiStyle,
            availableClientWidth,
            numberOfColumns,
            computedTileWidth,
            liMargin,
            $sampleLi = boxContainer.children("li");

            if (!$sampleLi.length) {
                return;
            }

            availableClientWidth = getAvailableClientWidth(boxContainer[0]);

            if (availableClientWidth <= 0 || boxContainer._lastWidth === availableClientWidth) {
                return;
            }

            boxContainer._lastWidth = availableClientWidth;
            computedLiStyle = window.getComputedStyle($sampleLi[0]);
            liMargin = parseFloat(computedLiStyle.marginLeft) + parseFloat(computedLiStyle.marginRight);
            liMargin = isNaN(liMargin) ? 0 : liMargin;

            specifiedTileWidth += liMargin;

            numberOfColumns = Math.max(Math.floor(availableClientWidth / (specifiedTileWidth + liMargin)), 1),
            computedTileWidth = Math.floor(availableClientWidth / numberOfColumns) - Math.ceil(liMargin);

            $('li.box').css('width', computedTileWidth);
        }

        function pollForViewContainerWidthUpdate(view) {
            var handle = window.setInterval(function () {

                var element = $(view, ".box-container");
                if (element.css("width") != "0px") {
                    // trigger the event
                    window.clearInterval(handle);
                    updateTileWidth($(".box-container"));
                }

            }, 100);
        }

        this.assessments = assessments;

        this.select = function (assessment) {
            assessment.selected(true);
        };

        this.unselect = function (assessment) {
            assessment.selected(false);
        };

        this.activate = function (accountNumber) {

            accountNumber = config.accountNumber != null ? config.accountNumber : accountNumber;

            return datacontext.getSupplier(accountNumber, supplier).then(function () {
                return datacontext.getMonthlyAssessments(supplier().id(), 0, 100, "desc", assessments)
                .then(function () {
                    ko.utils.arrayForEach(this.assessments(), function (assessment) {
                        assessment.selected = ko.observable();
                        assessment.selected(false);
                    })
                });
            });
        };

        this.attached = function (view, parent) {
            pollForViewContainerWidthUpdate(view);

            var supplierId = supplier().id();

            $(window).scroll(function () {
                var newAssessments = ko.observableArray();

                if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
                    datacontext.getMonthlyAssessments(supplierId, assessments().length, 45, "desc", newAssessments)
                    .then(function () {
                        ko.utils.arrayForEach(newAssessments(), function (assessment) {
                            assessment.selected = ko.observable();
                            assessment.selected(false);

                            assessments.push(assessment);
                        })

                        updateTileWidth($(".box-container"));
                    });
                }
            });
        };

        this.compositionComplete = function () {
            $(window).resize(function () {
                updateTileWidth($(".box-container"));
            });
        }
    };

    return ctor;
});