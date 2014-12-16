define(['plugins/router', 'durandal/system', 'services/datacontext'], function (router, system, datacontext) {
    suppliers = ko.observableArray();
    searchTerm = ko.observable().extend({ rateLimit: 500 });
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

    function Canceller() {
        var canceller = this;
        var _cancelled = false;
        canceller.cancelled = function () { return _cancelled; };
        canceller.requestInfo = null; // to be set by requestInterceptor
        canceller.cancel = function (/*reason*/) {
            var jqxhr = canceller.requestInfo && canceller.requestInfo.jqXHR;
            if (jqxhr && jqxhr.abort) {
                jqxhr.abort();
                _cancelled = true;
            }
            canceller.close();
        };
        this.close = function () {
            canceller.requestInfo = null; // release memory
            canceller.cancel = noop;
        };
    }

    function noop() { }

    var canceller = null;

    return {
        select: function (assessment) {
            assessment.selected(true);

            return true;
        },
        unselect: function (assessment) {
            assessment.selected(false);

            return true;
        },
        searchTerm: searchTerm,
        activate: function () {

            for (var i = 0; i < router.routes.length; i++) {
                var route = router.routes[i];

                if (route.name == 'Dashboard') {
                    route.nav = false;
                }
            }

            router.buildNavigationModel();

            this.searchTerm.subscribe(function (newValue) {

                suppliers([]);

                isSearching(true);

                if (newValue != null) {

                    if (canceller != null) {
                        canceller.cancel();
                    }

                    canceller = new Canceller();

                    var ajaxAdapter = breeze.config.getAdapterInstance("ajax", "jQuery", true);

                    ajaxAdapter.requestInterceptor = function (requestInfo) {
                        canceller.requestInfo = requestInfo;
                    }

                    var newSuppliers = ko.observableArray();

                    return datacontext.getSuppliersByName(newValue, 0, 100, newSuppliers)
                        .then(function () {
                            ko.utils.arrayForEach(newSuppliers(), function (supplier) {
                                supplier.selected = ko.observable();
                                supplier.selected(false);
                            })

                            suppliers(newSuppliers());

                            updateTileWidth($("#supplier-list"));

                            isSearching(false);
                        })
                }
            });

            if (suppliers().length == 0) {

                isSearching(true);

                return datacontext.getSuppliersByName(this.searchTerm(), 0, 100, suppliers)
                    .then(function () {
                        ko.utils.arrayForEach(this.suppliers(), function (supplier) {
                            supplier.selected = ko.observable();
                            supplier.selected(false);
                        })

                        isSearching(false);
                    })
            }
        },
        attached: function (view, parent) {
            $(window).off('scroll');

            pollForViewContainerWidthUpdate(view);

            $(document).ready(function () {
                $(document).on('keyup keypress', 'form input[type="text"]', function (e) {

                    if (e.keyCode == 13) {
                        e.preventDefault();

                        $('input:focus').blur();

                        return false;
                    }
                });
            });

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