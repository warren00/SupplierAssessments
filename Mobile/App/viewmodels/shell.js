define(['durandal/system', 'plugins/router', 'config', 'services/datacontext'],
    function (system, router, config, datacontext) {
        var shell = {
            activate: activate,
            router: router
        };

        return shell;

        function activate() {
            return boot()
                .fail(failedInitialization);
        }

        function failedInitialization(error) {
            var msg = 'App initialization failed: ' + error.message;
            alert(msg);
        }

        function boot() {
            return router.map(config.routes)
                .buildNavigationModel()
                .activate(config.startModule);
        }
    }
);