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

    var queryFailed = function(jqXHR, textStatus, errorThrown) {
        var noConnectionMessage = "No internet connection. Please check your connection and try again.";
        var errorMessage = "Oops! There appears to be a problem with your application. Please close down and try again";

        if (jqXHR.message != "abort") {

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

    var connectionError = function(jqXHR, textStatus, errorThrown)
    {
        var noConnectionMessage = "No internet connection. Please check your connection and try again.";
        var errorMessage = "Oops! There appears to be a problem with your application. Please close down and try again";

        if (textStatus != "abort") {

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
        queryFailed: queryFailed,
        connectionError: connectionError
    }
});