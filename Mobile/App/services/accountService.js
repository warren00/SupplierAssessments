define(['durandal/system', 'config'], function (system, config) {
    var getLoggedInSupplierAccountNumber = function () {
        return $.get('https://supplierassessmentnew.azurewebsites.net/api/account/getaccountnumber');
    }

    return {
        getLoggedInSupplierAccountNumber: getLoggedInSupplierAccountNumber
    }
});