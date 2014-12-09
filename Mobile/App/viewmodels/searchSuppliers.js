define(['durandal/system', 'services/datacontext'], function (system, datacontext) {
    suppliers = ko.observableArray();
    searchTerm = ko.observable();
    isSearching = ko.observable();

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
                updateTileWidth($("#supplier-list"));
            }

        }, 100);
    }

    return {
        select: function (assessment) {
            assessment.selected(true);
        },
        unselect: function (assessment) {
            assessment.selected(false);
        },
        searchTerm: searchTerm,
        activate: function () {
            isSearching(false);

            if (suppliers().length == 0) {
                return datacontext.getSuppliersByName(this.searchTerm(), 0, 100, suppliers)
                    .then(function () {
                        ko.utils.arrayForEach(this.suppliers(), function (supplier) {
                            supplier.selected = ko.observable();
                            supplier.selected(false);
                        })

                        this.searchTerm.subscribe(function (newValue) {
                            if (newValue != null) {
                                suppliers([]);

                                var newSuppliers = ko.observableArray();

                                return datacontext.getSuppliersByName(newValue, 0, 100, newSuppliers)
                                    .then(function () {
                                        ko.utils.arrayForEach(newSuppliers(), function (supplier) {
                                            supplier.selected = ko.observable();
                                            supplier.selected(false);
                                        })

                                        suppliers(newSuppliers());

                                        updateTileWidth($("#supplier-list"));
                                    });
                            }
                        });
                    });
            }
        },
        attached: function (view, parent) {
            $(window).off('scroll');

            pollForViewContainerWidthUpdate(view);

            $(window).scroll(function () {
                var newSuppliers = ko.observableArray();

                if ($(window).scrollTop() >= ($(document).height() - $(window).height()) * 0.5) {
                    if (!isSearching()) {
                        isSearching(true);

                        datacontext.getSuppliersByName(searchTerm(), suppliers().length, 100, newSuppliers)
                        .then(function () {
                            ko.utils.arrayForEach(newSuppliers(), function (supplier) {
                                supplier.selected = ko.observable();
                                supplier.selected(false);

                                suppliers.push(supplier);
                            })

                            isSearching(false);

                            updateTileWidth($("#supplier-list"));
                        });
                    }
                }
            });
        },
        detached: function () {
            $(window).off('scroll');
        },
        compositionComplete: function () {
            $(window).resize(function () {
                updateTileWidth($("#supplier-list"));
            });
        }
    }
});