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

                window.onunload(function unloaded() {
                    window.cookies.clear();
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
            router.navigateBack();
        }

        function showBackButton() {
            for (var i = 0; i < router.routes.length; i++) {
                var route = router.routes[i];

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
            if (error.status != 401) {
                if (window.cordova != null) {
                    checkConnection();
                }
                else {
                    var msg = 'App initialization failed: ' + error.message;
                    alert(msg);
                }
            }
        }

        function checkConnection() {
            var networkState = navigator.connection.type;

            if (networkState == Connection.NONE) {
                window.navigator.notification.alert("No data connection", null, "VOW Supplier Portal", "Ok");

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

            router.isNavigating.subscribe(function (newValue) {

                if (newValue == true) {

                    var collapsedMenu = $('.navbar-collapse.in');

                    if (collapsedMenu != null && collapsedMenu.length > 0)
                        $('.navbar-collapse.in').collapse('hide');
                }
            });

            return router.map(routes)
                .buildNavigationModel()
                .activate(config.startModule);
        }

        function logout() {
            $.get('http://supplierassessmentnew.azurewebsites.net/api/account/logout')
                .done(function (result) {
                    window.cookies.clear();
                    document.location = "./login.html";
                });
        }
    });