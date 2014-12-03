define(["services/datacontext", "config"], function (datacontext, config) {
    assessment = ko.observable();

    return {
        displayName: "Assessment Detail",
        assessment: assessment,
        activate: function (assessmentId) {
            return datacontext.getMonthlyAssessmentById(assessmentId, assessment);
        }
    };
});