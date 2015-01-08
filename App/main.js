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

    function onDeviceReady() {

        if (device.platform === 'iOS' && parseFloat(device.version) >= 7.0) {
            StatusBar.overlaysWebView(true);
            StatusBar.styleLightContent();
            StatusBar.show();

            Keyboard.disableScrollingInShrinkView(true);
        }

        //>>excludeStart("build", true);
        system.debug(true);
        //>>excludeEnd("build");

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