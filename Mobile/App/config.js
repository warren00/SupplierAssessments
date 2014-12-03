define(function () {

    var remoteServiceName = "https://supplierassessmentnew.azurewebsites.net/api/breeze"

    var startModule = "home";
    var supplierId = 396;

    var routes = [{
        route: "",
        title: "Dashboard",
        moduleId: "viewmodels/home",
        nav: true,
        name: "Home"
    }, {
        route: "assessments",
        moduleId: "viewmodels/assessments",
        nav: true,
        name: "Assessments"
    }, {
        route: "assessment/:id*details",
        moduleId: "viewmodels/assessmentDetail",
        title: "Assessment Detail",
        hash: "#assessment/:id",
        nav: false
    }, {
        route: "deliveryAssessment/:id*details",
        moduleId: "viewmodels/deliveryAssessment",
        title: "Delivery Assessment",
        nav: false
    }];

    return {
        remoteServiceName: remoteServiceName,
        routes: routes,
        startModule: startModule,
        supplierId: supplierId
    };
});