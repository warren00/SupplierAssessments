define(["services/datacontext", "config"], function (datacontext, config) {
    var deliveryAssessments = ko.observable();

    return {
        displayName: "Delivery Assessment",
        deliveryAssessments: deliveryAssessments,
        activate: function (assessmentId) {

            var assessment = ko.observable();

            Q.all(datacontext.getMonthlyAssessmentById(assessmentId, assessment)
                .then(function () {
                    var startDate = moment(assessment().date());
                    var endDate = startDate.clone().add(1, "M");

                    return datacontext.getDeliveryAssessmentsByDateRange(config.supplierId, startDate.toDate(), endDate.toDate(), deliveryAssessments)
                }));
        }
    };
});