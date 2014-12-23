define(['durandal/system', 'config'], function (system, config) {

    var servicePath = config.remoteAccountServicePath;

    var getLoggedInSupplierAccountNumber = function () {
        return $.get(servicePath + "/getAccountNumber");
    }

    var getLoggedInUserRoles = function () {
        return $.get(servicePath + "/getLoggedInUserRoles");
    }

    var logout = function () {
        return $.get(servicePath + "/logout");
    }

    return {
        getLoggedInSupplierAccountNumber: getLoggedInSupplierAccountNumber,
        getLoggedInUserRoles: getLoggedInUserRoles,
        logout: logout
    }
});