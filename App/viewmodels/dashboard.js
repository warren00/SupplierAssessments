define(['plugins/router', 'services/datacontext', 'services/accountService', 'config'], function (router, datacontext, accountService, config) {
    var ctor = function () {

        function pollForGraphContainerUpdate(view) {
            var handle = window.setInterval(function () {

                var element = $(view, "#monthly-assessments-graph");
                if (element.css("width") != "0px") {
                    window.clearInterval(handle);
                    $('#monthly-assessments-graph').resize();
                }

            }, 100);
        }

        this.supplierAccountNumber = ko.observableArray();
        this.currentMonthlyAssessmentId = ko.observableArray();
        this.monthlyAssessmentScores = ko.observableArray();

        this.supplier = ko.observable();
        this.deliveryAssessments = ko.observable();

        this.currentMonthlyAssessment = ko.observable();
        this.currentDeliveryAssessment = ko.observable();

        var self = this;

        this.monthlyAssessmentAvailable = ko.computed(function () {
            return self.currentMonthlyAssessment() != null;
        });

        this.yearToDateGrade = ko.computed(function () {
            if (self.supplier() == null)
                return "Unknown";

            return self.supplier().yearToDateGrade();
        });

        this.monthlyAssessmentGrade = ko.computed(function () {
            if (self.currentMonthlyAssessment() == null)
                return "Unknown";

            return self.currentMonthlyAssessment().currentGrade();
        })

        this.deliveryAssessmentGrade = ko.computed(function () {
            if (self.currentDeliveryAssessment() == null)
                return "Unknown";

            return self.currentDeliveryAssessment().currentGrade();
        });

        this.serviceGrade = ko.computed(function () {
            if (self.currentMonthlyAssessment() == null)
                return "Unknown";

            return self.currentMonthlyAssessment().serviceGrade();
        });

        this.attached = function (view, parent) {
            pollForGraphContainerUpdate(view);
        };

        this.activate = function (accountNumber) {

            self.supplierAccountNumber(accountNumber != null ? accountNumber : config.accountNumber);

            var monthlyAssessments = ko.observable();

            var startDate = moment().subtract(12, "month");
            var endDate = moment();

            return datacontext.getSupplier(self.supplierAccountNumber(), self.supplier)
                .then(function () {
                    return Q.all([datacontext.getCurrentMonthlyAssessment(self.supplier().id(), self.currentMonthlyAssessment),
                        datacontext.getCurrentDeliveryAssessment(self.supplier().id(), self.currentDeliveryAssessment),
                        datacontext.getMonthlyAssessments(self.supplier().id(), 0, 45, "asc", monthlyAssessments),
                        datacontext.getDeliveryAssessmentsByDateRange(self.supplier().id(), startDate.toDate(), endDate.toDate(), self.deliveryAssessments)
                    ])
                }).then(function () {

                    if (self.currentMonthlyAssessment() != null)
                        self.currentMonthlyAssessmentId(self.currentMonthlyAssessment().id());

                    var deliveryDateGrades = {};

                    for (var i = 0; i < self.deliveryAssessments().length; i++) {
                        var currentDeliveryAssessment = self.deliveryAssessments()[i];
                        var date = moment(currentDeliveryAssessment.date()).format("YYYY-MM");

                        if (deliveryDateGrades[date] == null) {
                            deliveryDateGrades[date] = {}
                            deliveryDateGrades[date]["Gold"] = 0;
                            deliveryDateGrades[date]["Silver"] = 0;
                            deliveryDateGrades[date]["Bronze"] = 0;
                            deliveryDateGrades[date]["Merchandise Review"] = 0;
                        }

                        deliveryDateGrades[date][currentDeliveryAssessment.currentGrade()]++;
                    }

                    self.monthlyAssessmentScores([]);

                    var assessmentDate = startDate;

                    while (assessmentDate <= endDate) {
                        var date = assessmentDate.format("YYYY-MM");

                        if (deliveryDateGrades[date] != null) {
                            self.monthlyAssessmentScores.push({
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