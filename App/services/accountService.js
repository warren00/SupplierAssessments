define(['durandal/system', 'config'], function (system, config) {
    var getLoggedInSupplierAccountNumber = function () {
        return $.get("http://supplierassessmentnew.azurewebsites.net/api/account/getAccountNumber");
    }

    var getLoggedInUserRoles = function () {
        return $.get("http://supplierassessmentnew.azurewebsites.net/api/account/getLoggedInUserRoles");
    }

    return {
        getLoggedInSupplierAccountNumber: getLoggedInSupplierAccountNumber,
        getLoggedInUserRoles: getLoggedInUserRoles
    }
});