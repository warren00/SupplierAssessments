define(function () {

    var remoteDataServicePath = "http://supplierassessmentnew.azurewebsites.net/api/breeze"
    var remoteAccountServicePath = "http://supplierassessmentnew.azurewebsites.net/api/account";

    var accountNumber = null;

    var routes = {};

    routes['Supplier'] = [{ route: "", title: "Dashboard", moduleId: "viewmodels/dashboard", nav: true, name: "Dashboard", nav: true },
                          { route: "assessments/:id", moduleId: "viewmodels/assessments", name: "Assessments", hash: "#assessments/:id", nav: false, },
                          { route: "assessment/:id*details", moduleId: "viewmodels/assessmentDetail", title: "Assessment Detail", hash: "#assessment/:id", nav: false },
                          { route: "deliveryAssessment/:id*details", moduleId: "viewmodels/deliveryAssessment", title: "Delivery Assessment", nav: false }];

    routes['Administrator'] = [{ route: "", title: "Suppliers", moduleId: "viewmodels/searchSuppliers", name: "Search", nav: true },
                               { route: "dashboard/:id", title: "Dashboard", moduleId: "viewmodels/dashboard", name: "Dashboard", nav: false },
                               { route: "assessments/:id", moduleId: "viewmodels/assessments", name: "Assessments", hash: "#assessments/:id", nav: false, },
                               { route: "assessment/:id*details", moduleId: "viewmodels/assessmentDetail", title: "Assessment Detail", hash: "#assessment/:id", nav: false },
                               { route: "deliveryAssessment/:id*details", moduleId: "viewmodels/deliveryAssessment", title: "Delivery Assessment", nav: false }];

    routes['Operations'] = [{ route: "", title: "Suppliers", moduleId: "viewmodels/searchSuppliers", name: "Search", nav: true },
                               { route: "dashboard/:id", title: "Dashboard", moduleId: "viewmodels/dashboard", name: "Dashboard", nav: false },
                               { route: "assessments", moduleId: "viewmodels/assessments", name: "Assessments", nav: false },
                               { route: "assessment/:id*details", moduleId: "viewmodels/assessmentDetail", title: "Assessment Detail", hash: "#assessment/:id", nav: false },
                               { route: "deliveryAssessment/:id*details", moduleId: "viewmodels/deliveryAssessment", title: "Delivery Assessment", nav: false }];

    return {
        remoteDataServicePath: remoteDataServicePath,
        remoteAccountServicePath: remoteAccountServicePath,
        routes: routes,
        accountNumber: accountNumber,
    };
});