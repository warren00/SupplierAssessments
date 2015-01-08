define(['durandal/system', 'plugins/router', 'config', 'services/datacontext', 'services/accountService', 'durandal/app'],
    function (system, router, config, datacontext, accountService, app) {

        var self = this;
        self.roles = null;

        var shell = {
            activate: activate,
            router: router,
            logout: logout,
            showBackButton: showBackButton,
            navigateBack: navigateBack,
            attached: function () {

                StatusBar.overlaysWebView(false);
                StatusBar.backgroundColorByHexString("#474D54");
                StatusBar.styleLightContent();
                StatusBar.show();

                if (device.platform === 'iOS' && parseFloat(device.version) >= 7.0) {
                    cordova.plugins.Keyboard.disableScroll(true);

                    $(".navbar").css("border", "none")
                    $(".navbar-toggle").css("margin-right", "5px");
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar();

                    $(document).on('focus', 'textarea,input,select', function () {
                        $('.navbar.navbar-fixed-top').css('position', 'absolute');
                    }).on('blur', 'textarea,input,select', function () {
                        $('.navbar.navbar-fixed-top').css('position', '');
                    });
                }

                $(document).on('click', '.navbar-collapse.in', function (e) {
                    if ($(e.target).is('a')) {
                        $(this).collapse('hide');
                    }
                });
            }
        };

        return shell;

        function navigateBack() {
            router.navigateBack();
        }

        function showBackButton() {
            for (var i = 0; i < router.routes.length; i++) {
                var route = router.routes[i];

                // Don't display back button on home screen.
                if (route.route == '' && route.isActive())
                    return false;
            }

            return true;
        }

        function activate() {
            return initialize().then(boot)
                .fail(failedInitialization);
        }


        function failedInitialization(error) {

            var dialogTitle = "VOW Supplier Portal";
            var noConnectionMessage = "No internet connection. Please check your connection and try again.";
            var errorMessage = "Oops! There appears to be a problem with your application. Please close down and try again";

            if (error.status != 401) {
                if (window.cordova != null) {
                    var networkState = navigator.connection.type;

                    if (networkState == Connection.NONE) {
                        window.navigator.notification.alert(noConnectionMessage, null, dialogTitle, "Ok");
                        document.location = "login.html"
                    }
                    else {
                        window.navigator.notification.alert(errorMessage, null, dialogTitle, "Ok");
                    }
                }
                else {
                    alert(errorMessage);
                }
            }
        }

        function checkConnection() {
            var networkState = navigator.connection.type;

            if (networkState == Connection.NONE) {
                window.navigator.notification.alert("No internet connection. Please check your connection and try again.", null, "VOW Supplier Portal", "Ok");

                document.location = "login.html"
            }
        }

        function initialize() {

            var supplier = ko.observable();

            return Q.when(accountService.getLoggedInUserRoles().then(function (roles) {

                self.roles = roles;

                if (roles != null && $.inArray("Supplier", roles) != -1) {
                    return accountService.getLoggedInSupplierAccountNumber()
                        .then(function (accountNumber) {

                            config.accountNumber = accountNumber;

                            return datacontext.getSupplier(accountNumber, supplier);
                        })
                }
            }).fail(function (result) {
                if (result.status == 401)
                    document.location = "./login.html";
            }));
        }

        function boot() {

            var routes = [];

            for (var i = 0; i < this.roles.length; i++) {

                var roleRoutes = config.routes[this.roles[i]];

                for (var j = 0; j < roleRoutes.length; j++)
                    routes.push(roleRoutes[j]);
            }

            router.isNavigating.subscribe(function (isNavigating) {

                if (isNavigating == true) {

                    var expandedMenu = $('.navbar-collapse.in');

                    if (expandedMenu != null && expandedMenu.length > 0)
                        $('.navbar-collapse.in').collapse('hide');
                }
            });

            router.activeItem.subscribe(function (activeItem) {
                if (roles != null && ($.inArray("Administrator", roles) != -1 ||
                    $.inArray("Operator", roles) != -1)) {

                    if (activeItem.__moduleId__ == "viewmodels/dashboard") {

                        for (var i = 0; i < router.routes.length; i++) {

                            var route = router.routes[i];

                            if (route.title == "Dashboard") {
                                route.nav = true;
                                route.hash = "#" + router.activeInstruction().fragment;
                            }
                        }
                    }

                    router.buildNavigationModel();
                }
            });

            return router.map(routes)
                .buildNavigationModel()
                .activate(config.startModule);
        }

        function logout() {
            accountService.logout()
                .done(function (result) {
                    window.cookies.clear();
                    document.location = "./login.html";
                });
        }
    });