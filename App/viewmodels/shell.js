﻿define(['durandal/system', 'plugins/router', 'config', 'services/datacontext', 'services/accountService'],
    function (system, router, config, datacontext, accountService) {

        var self = this;
        self.roles = null;

        var shell = {
            activate: activate,
            router: router,
            logout: logout,
            showBackButton: showBackButton,
            navigateBack: navigateBack,
            attached: function () {
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

        function onDeviceReady() {
            checkConnection();
        }

        function checkConnection() {
            var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN] = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI] = 'WiFi connection';
            states[Connection.CELL_2G] = 'Cell 2G connection';
            states[Connection.CELL_3G] = 'Cell 3G connection';
            states[Connection.CELL_4G] = 'Cell 4G connection';
            states[Connection.CELL] = 'Cell generic connection';
            states[Connection.NONE] = 'No network connection';

            if (networkState == Connection.NONE) {
                window.navigator.notification.alert("No data connection", function () {
                    document.location = "../../login.html"
                }, "Supplier Assessment Portal", "Ok");
            }
        }

        function initialize() {

            document.addEventListener("deviceready", onDeviceReady, false);

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