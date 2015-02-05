define(['durandal/system', 'plugins/router', 'config', 'services/datacontext', 'services/accountService', 'durandal/app', 'platform'],
    function (system, router, config, datacontext, accountService, app, platform) {

        var self = this;
        self.roles = null;

        var shell = {
            activate: activate,
            router: router,
            logout: logout,
            showBackButton: showBackButton,
            navigateBack: navigateBack,
            attached: function () {

                platform.shellAttached();

                $(document).on('blur', 'input, textarea', function () {
                    setTimeout(function () {
                        window.scrollTo(document.body.scrollLeft, document.body.scrollTop);
                    }, 0);
                });

                $(document).on('click', '.navbar-collapse.in', function (e) {
                    if ($(e.target).is('a')) {
                        $(this).collapse('hide');
                    }
                });
            }
        };

        return shell;

        function navigateBack() {

            if (!router.isNavigating())
                router.navigateBack();
        }
        function showBackButton() {
            for (var i = 0; i < router.routes.length; i++) {
                var route = router.routes[i];

                // Don't display back button on home screen.
                if (route.route == '' && route.isActive()) {
                    return false;
                }
            }

            return true;
        }

        function activate() {
            return initialize().then(boot);
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
                    platform.logout();
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
                    platform.logout();
                });
        }
    });