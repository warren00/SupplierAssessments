requirejs.config({
    paths: {
        'text': '../Scripts/text',
        'durandal': '../Scripts/durandal',
        'plugins': '../Scripts/durandal/plugins',
        'transitions': '../Scripts/durandal/transitions'
    }
});

define('jquery', function () { return jQuery; });
define('knockout', ko);

define(['durandal/system', 'durandal/app', 'durandal/viewLocator'], function (system, app, viewLocator) {

    document.addEventListener("deviceready", onDeviceReady, false);

    function operationFailed() {

        var dialogTitle = "VOW Supplier Portal";
        var noConnectionMessage = "No internet connection. Please check your connection and try again.";
        var errorMessage = "Oops! There appears to be a problem with your application. Please close down and try again";

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

    function onDeviceReady() {
        StatusBar.overlaysWebView(false);
        StatusBar.styleLightContent();
        StatusBar.backgroundColorByHexString("#272b30");
        StatusBar.show();

        //>>excludeStart("build", true);
        system.debug(false);
        //>>excludeEnd("build");

        system.error = function (e) {
            operationFailed();

            throw e;
        };

        app.title = 'Supplier';

        app.configurePlugins({
            router: true,
            dialog: true
        });

        app.start().then(function () {
            //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
            //Look for partial views in a 'views' folder in the root.
            viewLocator.useConvention();

            //Show the app by setting the root view model for our application with a transition.
            app.setRoot('viewmodels/shell', 'entrance');
        });
    }
});