define(["services/datacontext", "config"], function (datacontext, config) {
    var deliveryAssessment = ko.observable();

    return {
        displayName: "Delivery Assessment",
        deliveryAssessment: deliveryAssessment,
        supplierId: config.supplierId,
        activate: function (assessmentId) {

            return datacontext.getDeliveryAssessmentById(assessmentId, deliveryAssessment);
        }
    };
});