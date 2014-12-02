define(['services/datacontext', 'config'], function(datacontext, config) {

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
        deliveryGrade: "Bronze",
        monthlyAssessmentScores: new ko.observable(monthlyAssessmentScores),
        attached: function () {
            $('#monthly-assessments-graph').resize();
        },
        activate: function () {
            if (initialized) { return; }
            initialized = true;

            var supplierId = config.supplierId;

            var monthlyAssessments = ko.observable();

            return Q.all([datacontext.getSupplier(supplierId, supplier),
                datacontext.getCurrentMonthlyAssessment(supplierId, monthlyAssessment),
                datacontext.getCurrentDeliveryAssessment(supplierId, deliveryAssessment),
                datacontext.getMonthlyAssessmentCount(supplierId, assessmentCount),
                datacontext.getDeliveryAssessmentCount(supplierId, deliveryAssessmentCount),
                datacontext.getMonthlyAssessments(supplierId, 0, 45, monthlyAssessments)]).then(function()
                {
                    for(var i = 0; i < monthlyAssessments().length; i++)
                    {
                        var monthlyAssessment = {
                            date: moment(monthlyAssessments()[i].date()).format("YYYY-MM").toString(),
                            scoreAverage: parseFloat(monthlyAssessments()[i].scoreAverage()),
                            deliveryAssessmentAverage: parseFloat(monthlyAssessments()[i].deliveryAssessmentAverage()),
                            serviceFailureScore: parseFloat(monthlyAssessments()[i].serviceFailureScore())
                        };

                        monthlyAssessmentScores.push(monthlyAssessment);
                    }
                });
        }
    }
});