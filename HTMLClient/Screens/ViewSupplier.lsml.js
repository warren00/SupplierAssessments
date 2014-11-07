/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewSupplier.created = function (screen) {
    $.getJSON("https://supplierassessment.azurewebsites.net/Permissions/UserPermissions/GetPermissions", function (data) {
        myapp.permissions = data;

        var isAdmin = myapp.permissions["LightSwitchApplication:CanViewSuppliers"];

        // If user is not an admin retrieve supplier details associated with currently logged in user.
        if (!isAdmin) {
            myapp.activeDataWorkspace.SupplierAssessmentData.GetSupplierByLoggedInUser()
                  .execute().then(function (promise) {
                      screen.Supplier = promise.results[0];
                  });
        }
    });
};
myapp.ViewSupplier.AssessmentCreated_postRender = function (element, contentItem) {
    contentItem.dataBind("value", function (value) {
        if (value) {
            $(element).text(value.format("MMMM yyyy"));
        }
    });
};

myapp.ViewSupplier.AwardDate_postRender = function (element, contentItem) {
    contentItem.dataBind("value", function (value) {
        if (value) {
            $(element).text(value.format("MMMM yyyy"));
        }
    });
};

myapp.ViewSupplier.ScreenContent_render = function (element, contentItem) {
    var container = $('.msls-screen-buttons');
    var logout = $("<div class='subControl msls-logout-button msls-large-icon msls-tap ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-notext ui-btn-up-a' tabindex='0' data-icon='msls-logout' data-iconpos='notext' data-role='button' data-ls-content='content:{data.shell.logoutCommand.displayName}' data-ls-isvisible='isVisible:{tap.canExecute}' data-ls-isenabled='isEnabled:{tap.canExecute}' data-ls-tap='tap:{data.shell.logoutCommand.command}' data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span' data-theme='a' title='Log out'><span class='ui-btn-inner'><span class='ui-btn-text'><a class='id-element ui-btn ui-btn-up-a ui-shadow ui-btn-corner-all ui-mini' data-role='button' data-mini='true' data-theme='a' data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span'><span class='ui-btn-inner'><span class='ui-btn-text'>Log out</span></span></a></span><span class='ui-icon ui-icon-msls-logout ui-icon-shadow'>&nbsp;</span></span></div>");
    var back = $("<div class='subControl msls-back-button msls-large-icon msls-tap ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-notext ui-btn-up-a' tabindex='0' data-icon='msls-logout' data-iconpos='notext' data-role='button' data-ls-content='content:{data.shell.logoutCommand.displayName}' data-ls-isvisible='isVisible:{tap.canExecute}' data-ls-isenabled='isEnabled:{tap.canExecute}' data-ls-tap='tap:{data.shell.logoutCommand.command}' data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span' data-theme='a' title='Back'><span class='ui-btn-inner'><span class='ui-btn-text'><a class='id-element ui-btn ui-btn-up-a ui-shadow ui-btn-corner-all ui-mini' data-role='button' data-mini='true' data-theme='a' data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span'><span class='ui-btn-inner'><span class='ui-btn-text'>Log out</span></span></a></span><span class='ui-icon ui-icon-msls-back ui-icon-shadow'>&nbsp;</span></span></div>");

    container.empty();

    $(container).on('tap', '.msls-logout-button', function () {
        document.location.href = '../logout.html'
    });

    $(container).on('tap', '.msls-back-button', function () {
        if (myapp.permissions["LightSwitchApplication:CanViewSuppliers"]) {
            if (container.closest('.ui-page-active').attr('data-title') != "Browse Suppliers")
                history.back();
        }
        else {
            if (container.closest('.ui-page-active').attr('data-title') != "Supplier")
                history.back();
        }
    })

    $(container).on('tap', '.msls-forward-button', function () {
        history.forward();
    })

    back.appendTo(container);
    logout.appendTo(container);

    $("[data-title='Browse Suppliers'] .msls-screen-buttons .msls-back-button").css('opacity', '0.4');
    $("[data-title='Browse Suppliers'] .msls-screen-buttons .msls-back-button .ui-btn-inner .ui-icon-msls-back").css("background-color", "transparent");

    $("[data-title='Supplier'] .msls-screen-buttons .msls-back-button").css('opacity', '0.4');
    $("[data-title='Supplier'] .msls-screen-buttons .msls-back-button .ui-btn-inner .ui-icon-msls-back").css("background-color", "transparent");
};