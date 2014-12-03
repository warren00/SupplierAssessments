define(["services/datacontext", "config"], function (datacontext, config) {

    assessments = ko.observableArray();

    var initialized = false;

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

    return {
        displayName: "Assessments",
        assessments: assessments,
        select: function (assessment) {
            assessment.selected(true);
        },
        unselect: function (assessment) {
            assessment.selected(false);
        },
        activate: function () {
            if (initialized) { return; }
            initialized = true;

            var supplierId = config.supplierId;

            return datacontext.getMonthlyAssessments(supplierId, 0, 100, assessments)
            .then(function () {
                ko.utils.arrayForEach(this.assessments(), function (assessment) {
                    assessment.selected = ko.observable();
                    assessment.selected(false);
                })
            });
        },
        attached: function (view, parent) {
            pollForViewContainerWidthUpdate(view);

            $(window).scroll(function () {
                var newAssessments = ko.observableArray();

                if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
                    datacontext.getMonthlyAssessments(config.supplierId, assessments().length, 45, newAssessments)
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
        },
        compositionComplete: function () {
            $(window).resize(function () {
                updateTileWidth($(".box-container"));
            });
        }
    }
});