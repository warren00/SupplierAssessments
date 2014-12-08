define(['plugins/router', 'knockout', 'durandal/system', 'services/datacontext'], function (router, ko, system, context) {
    var ctor = function () {
        var assessment = ko.observable();

        var childRouter = router.createChildRouter()
            .makeRelative({ moduleId: "viewmodels/assessment", fromParent: true, dynamicHash: ':id' })
            .map([
                { route: ['', 'summary'], moduleId: 'summary', title: 'Summary', nav: true },
                { route: 'deliveryAssessments', moduleId: 'deliveryAssessments', title: 'Delivery Assessments', nav: true }
            ]).buildNavigationModel();

        this.assessment = assessment;
        this.router = childRouter;
        this.activate = function (assessmentId) {
                return context.getMonthlyAssessmentById(assessmentId, assessment);
        };
    }

    return ctor;
});