define(["services/datacontext", "config"], function (datacontext, config) {

    assessments = ko.observableArray();

    var initialized = false;

    return {
        displayName: "Assessments",
        assessments: assessments,
        select: function (assessment) {
            assessment.selected(true);
        },
        unselect: function (assessment) {
            assessment.selected(false);
        },
        activate: function () {
            if (initialized) { return; }
            initialized = true;

            var supplierId = config.supplierId;

            return datacontext.getMonthlyAssessments(supplierId, 0, 45, assessments)
            .then(function () {
                ko.utils.arrayForEach(this.assessments(), function (assessment) {
                    assessment.selected = ko.observable();
                    assessment.selected(false);
                })
            });
        },
        attached: function () {
            $(window).scroll(function () {
                var newAssessments = ko.observableArray();

                if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
                    datacontext.getMonthlyAssessments(config.supplierId, assessments().length, 45, newAssessments)
                    .then(function () {
                        ko.utils.arrayForEach(newAssessments(), function (assessment) {
                            assessment.selected = ko.observable();
                            assessment.selected(false);

                            assessments.push(assessment);
                        })
                    });
                }
            });
        }
    }
});