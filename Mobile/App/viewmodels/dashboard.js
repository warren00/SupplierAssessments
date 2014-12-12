define(['plugins/router', 'services/datacontext', 'services/accountService', 'config'], function (router, datacontext, accountService, config) {
    var ctor = function () {
        var supplier = ko.observable();
        var monthlyAssessment = ko.observable();
        var deliveryAssessment = ko.observable();

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

        this.title = "Supplier";
        this.subtitle = "Dashboard";
        this.supplier = supplier;
        this.monthlyAssessment = monthlyAssessment;
        this.deliveryAssessment = deliveryAssessment;
        this.assessmentCount = assessmentCount;
        this.deliveryAssessmentCount = deliveryAssessmentCount;
        this.monthlyAssessmentScores = monthlyAssessmentScores;

        this.accountNumber = null;

        this.attached = function (view, parent) {
            pollForGraphContainerUpdate(view);

            updateDashboardRoute(this.accountNumber);
        };

        function updateDashboardRoute(accountNumber) {

            return accountService.getLoggedInUserRoles().then(function (roles) {
                for (var i = 0; i < router.routes.length; i++) {
                    var route = router.routes[i];

                    if (route.name == 'Dashboard') {
                        route.nav = true;

                        if (roles != null && ($.inArray("Administrator", roles) != -1) || $.inArray("Operator", roles) != -1) {
                            route.hash = "#dashboard/" + accountNumber;
                        }
                    }
                }

                router.buildNavigationModel();
            });
        }

        this.activate = function (accountNumber) {

            monthlyAssessmentScores([]);

            this.accountNumber = accountNumber != null ? accountNumber : config.accountNumber;

            var monthlyAssessments = ko.observable();

            return datacontext.getSupplier(this.accountNumber, supplier)
                .then(function () {
                    return Q.all([datacontext.getCurrentMonthlyAssessment(supplier().id(), monthlyAssessment),
                        datacontext.getCurrentDeliveryAssessment(supplier().id(), deliveryAssessment),
                        datacontext.getMonthlyAssessmentCount(supplier().id(), assessmentCount),
                        datacontext.getDeliveryAssessmentCount(supplier().id(), deliveryAssessmentCount),
                        datacontext.getMonthlyAssessments(supplier().id(), 0, 45, monthlyAssessments)])
                }).then(function () {
                    for (var i = 0; i < monthlyAssessments().length; i++) {
                        var monthlyAssessment = {
                            date: moment(monthlyAssessments()[i].date()).format("YYYY-MM").toString(),
                            scoreAverage: parseFloat(monthlyAssessments()[i].scoreAverage()),
                            deliveryAssessmentAverage: parseFloat(monthlyAssessments()[i].deliveryAssessmentAverage()),
                            serviceFailureScore: parseFloat(monthlyAssessments()[i].serviceFailureScore())
                        };

                        monthlyAssessmentScores.push(monthlyAssessment);
                    }
                });
        };
    }

    return ctor;
});