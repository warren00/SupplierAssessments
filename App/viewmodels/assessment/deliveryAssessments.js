define(["services/datacontext", "plugins/router"], function (datacontext, router) {
    var ctor = function () {
        var deliveryAssessments = ko.observable();

        this.deliveryAssessments = deliveryAssessments;

        this.select = function(assessment)
        {
            router.navigate("#deliveryAssessment/" + assessment.id());
        }

        this.activate = function (assessmentId) {

            var assessment = ko.observable();

            Q.all(datacontext.getMonthlyAssessmentById(assessmentId, assessment)
                .then(function () {
                    var startDate = moment(assessment().date());
                    var endDate = startDate.clone().add(1, "M");

                    return datacontext.getDeliveryAssessmentsByDateRange(assessment().supplierId(), startDate.toDate(), endDate.toDate(), deliveryAssessments)
                }));
        };
    }

    return ctor;
});