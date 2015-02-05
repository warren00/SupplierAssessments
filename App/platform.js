define(function () {
    var shellAttached = function () {
        StatusBar.overlaysWebView(false);
        StatusBar.backgroundColorByHexString("#474D54");
        StatusBar.styleLightContent();
        StatusBar.show();

        if (device.platform === 'iOS') {

            $(".navbar").css("border", "none")
            $(".navbar-toggle").css("margin-right", "5px");

            $(document).on('blur', 'input, textarea', function () {
                setTimeout(function () {
                    window.scrollTo(document.body.scrollLeft, document.body.scrollTop);
                }, 0);
            });
        }
    }

    var showMessage = function (message) {
        window.navigator.notification.alert(message, null, "Supplier Assessment", "Ok");
    }

    var logout = function () {
        window.cookies.clear();
        document.location = "login.html";
    }

    var error = function () {
        var noConnectionMessage = "No internet connection. Please check your connection and try again.";
        var errorMessage = "Oops! There appears to be a problem with your application. Please close down and try again";

        var networkState = navigator.connection.type;

        if (networkState == Connection.NONE) {
            this.showMessage(noConnectionMessage);
            this.logout();
        }
        else {
            this.showMessage(errorMessage);
        }
    }

    var queryFailed = function (error) {
        if (error.status == 401) {
            this.logout();

            return;
        }

        var dialogTitle = "VOW Supplier Portal";
        var noConnectionMessage = "No internet connection. Please check your connection and try again.";
        var errorMessage = "Oops! There appears to be a problem with your application. Please close down and try again";

        if (error.message != "abort") {

            var networkState = navigator.connection.type;

            if (networkState == Connection.NONE) {
                this.showMessage(noConnectionMessage);
                this.logout();
            }
            else {
                this.showMessage(errorMessage);
            }
        }
    }

    return {
        shellAttached: shellAttached,
        showMessage: showMessage,
        logout: logout,
        error: error,
        queryFailed: queryFailed
    }
});