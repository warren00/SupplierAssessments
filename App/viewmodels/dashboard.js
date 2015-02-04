define(['plugins/router', 'services/datacontext', 'services/accountService', 'config'], function (router, datacontext, accountService, config) {
    var ctor = function () {
        var supplier = ko.observable();
        var monthlyAssessment = ko.observable();
        var deliveryAssessment = ko.observable();
        var deliveryAssessments = ko.observableArray();

        var supplierAssessmentCount = ko.observable();
        var deliveryAssessmentCount = ko.observable();

        var assessmentCount = ko.observable();

        var monthlyAssessmentScores = ko.observableArray();

        var initialized = false;

        function pollForGraphContainerUpdate(view) {
            var handle = window.setInterval(function () {

                var element = $(view, "#monthly-assessments-graph");
                if (element.css("width") != "0px") {
                    // trigger the event
                    window.clearInterval(handle);
                    $('#monthly-assessments-graph').resize();
                }

            }, 100);
        }

        this.supplier = supplier;
        this.monthlyAssessment = monthlyAssessment;
        this.deliveryAssessment = deliveryAssessment;
        this.assessmentCount = assessmentCount;
        this.deliveryAssessmentCount = deliveryAssessmentCount;
        this.monthlyAssessmentScores = monthlyAssessmentScores;

        this.accountNumber = null;

        this.attached = function (view, parent) {
            pollForGraphContainerUpdate(view);
        };

        this.activate = function (accountNumber) {

            monthlyAssessmentScores([]);

            this.accountNumber = accountNumber != null ? accountNumber : config.accountNumber;

            var monthlyAssessments = ko.observable();

            var startDate = moment().subtract(12, "month");
            var endDate = moment();

            return datacontext.getSupplier(this.accountNumber, supplier)
                .then(function () {
                    return Q.all([datacontext.getCurrentMonthlyAssessment(supplier().id(), monthlyAssessment),
                        datacontext.getCurrentDeliveryAssessment(supplier().id(), deliveryAssessment),
                        datacontext.getMonthlyAssessmentCount(supplier().id(), assessmentCount),
                        datacontext.getDeliveryAssessmentCount(supplier().id(), deliveryAssessmentCount),
                        datacontext.getMonthlyAssessments(supplier().id(), 0, 45, "asc", monthlyAssessments),
                        datacontext.getDeliveryAssessmentsByDateRange(supplier().id(), startDate.toDate(), endDate.toDate(), deliveryAssessments)
                    ])
                }).then(function () {

                    var deliveryDateGrades = {};

                    for (var i = 0; i < deliveryAssessments().length; i++) {
                        var deliveryAssessment = deliveryAssessments()[i];
                        var date = moment(deliveryAssessment.date()).format("YYYY-MM");

                        if (deliveryDateGrades[date] == null) {
                            deliveryDateGrades[date] = {}
                            deliveryDateGrades[date]["Gold"] = 0;
                            deliveryDateGrades[date]["Silver"] = 0;
                            deliveryDateGrades[date]["Bronze"] = 0;
                            deliveryDateGrades[date]["Merchandise Review"] = 0;
                        }

                        deliveryDateGrades[date][deliveryAssessment.currentGrade()]++;
                    }

                    var assessmentDate = startDate;

                    while (assessmentDate <= endDate) {
                        var date = assessmentDate.format("YYYY-MM");

                        if (deliveryDateGrades[date] != null) {
                            monthlyAssessmentScores.push({
                                date: date,
                                gold: deliveryDateGrades[date]["Gold"],
                                silver: deliveryDateGrades[date]["Silver"],
                                bronze: deliveryDateGrades[date]["Bronze"],
                                merchandiseReview: deliveryDateGrades[date]["Merchandise Review"]
                            });
                        }

                        assessmentDate.add(1, "month");
                    }
                });
        };
    }

    return ctor;
});