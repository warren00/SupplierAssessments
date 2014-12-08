define(["services/datacontext", "config"], function (datacontext, config) {

    var ctor = function () {
        assessment = ko.observable();

        this.displayName = "Assessment Detail";
        this.assessment = assessment;
        this.activate =function (assessmentId) {
            return datacontext.getMonthlyAssessmentById(assessmentId, assessment);
        }
    }

    return ctor;
});