define(['services/datacontext', 'services/accountService', 'config'], function (datacontext, accountService, config) {

    var supplier = ko.observable();
    var monthlyAssessment = ko.observable();
    var deliveryAssessment = ko.observable();

    var supplierAssessmentCount = ko.observable();
    var deliveryAssessmentCount = ko.observable();

    var assessmentCount = ko.observable();

    var monthlyAssessmentScores = [];

    var initialized = false;

    return {
        title: "Supplier",
        subtitle: "Dashboard",
        supplier: supplier,
        monthlyAssessment: monthlyAssessment,
        deliveryAssessment: deliveryAssessment,
        assessmentCount: assessmentCount,
        deliveryAssessmentCount: deliveryAssessmentCount,
        monthlyAssessmentScores: new ko.observable(monthlyAssessmentScores),
        compositionComplete: function () {
            $('#monthly-assessments-graph').resize();
        },
        activate: function () {
            if (initialized) { return; }
            initialized = true;

            var supplierId = config.supplierId;

            var monthlyAssessments = ko.observable();

            var supplierId

            return Q.when(accountService.getLoggedInSupplierAccountNumber(),
                function (accountNumber) {
                    return datacontext.getSupplier(accountNumber, supplier);
                }
            ).then(function () {
                return Q.all([datacontext.getCurrentMonthlyAssessment(supplier().id(), monthlyAssessment),
                      datacontext.getCurrentDeliveryAssessment(supplier().id(), deliveryAssessment),
                      datacontext.getMonthlyAssessmentCount(supplier().id(), assessmentCount),
                      datacontext.getDeliveryAssessmentCount(supplier().id(), deliveryAssessmentCount),
                      datacontext.getMonthlyAssessments(supplier().id(), 0, 45, monthlyAssessments)])
            }).then(function () {
                for (var i = 0; i < monthlyAssessments().length; i++) {
                    var monthlyAssessment = {
                        date: moment(monthlyAssessments()[i].date()).format("YYYY-MM").toString(),
                        scoreAverage: parseFloat(monthlyAssessments()[i].scoreAverage()),
                        deliveryAssessmentAverage: parseFloat(monthlyAssessments()[i].deliveryAssessmentAverage()),
                        serviceFailureScore: parseFloat(monthlyAssessments()[i].serviceFailureScore())
                    };

                    monthlyAssessmentScores.push(monthlyAssessment);
                }
            }).then(function () {
                config.supplierId = supplier().id();
            }).fail(function(result)
            {
                document.location = "login.html";
            })
        }
    }
});