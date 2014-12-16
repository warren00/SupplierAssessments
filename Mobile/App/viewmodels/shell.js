define(['durandal/system', 'plugins/router', 'config', 'services/datacontext', 'services/accountService'],
    function (system, router, config, datacontext, accountService) {

        var self = this;
        self.roles = null;

        var shell = {
            activate: activate,
            router: router,
            logout: logout,
            showBackButton: showBackButton,
            navigateBack: navigateBack,
            attached: function()
            {
                $(document).on('click', '.navbar-collapse.in', function (e) {
                    if ($(e.target).is('a')) {
                        $(this).collapse('hide');
                    }
                });
            }
        };

        return shell;

        function navigateBack()
        {
            router.navigateBack();
        }

        function showBackButton()
        {
            for (var i = 0; i < router.routes.length; i++)
            {
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
                var msg = 'App initialization failed: ' + error.message;
                alert(msg);
            }
        }

        function initialize() {

            var dialogVisible = false;

            var handle = window.setInterval(function () {
                if (!dialogVisible && !window.navigator.onLine) {
                    dialogVisible = true;

                    app.showMessage("No data connection available.", "VOW Supplier Portal").then(function (result) {
                        dialogVisible = false;
                    });

                    $(document).resize();
                }
            }, 5000);

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

            return router.map(routes)
                .buildNavigationModel()
                .activate(config.startModule);
        }

        function logout() {
            $.get('http://supplierassessmentnew.azurewebsites.net/api/account/logout')
                .done(function (result) {
                    document.location = "./login.html";
                });
        }
    });