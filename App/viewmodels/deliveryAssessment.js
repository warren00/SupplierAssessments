define(["services/datacontext", "config"], function (datacontext, config) {
    var ctor = function () {
        var deliveryAssessment = ko.observable();

        this.deliveryAssessment = deliveryAssessment,
        this.activate = function (assessmentId) {
            return datacontext.getDeliveryAssessmentById(assessmentId, deliveryAssessment);
        };
    }

    return ctor;
});