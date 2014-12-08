define(['durandal/system', 'plugins/router', 'config', 'services/datacontext', 'services/accountService'],

    function (system, router, config, datacontext, accountService) {

        var self = this;
        self.roles = null;

        var shell = {
            activate: activate,
            router: router,
            logout: logout,
            roles: roles
        };

        return shell;

        function activate() {
            return initialize().then(boot)
                .fail(failedInitialization);
        }

        function failedInitialization(error) {
			if (error.status != 401)
			{
				var msg = 'App initialization failed: ' + error.message;
				alert(msg);
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