/// <reference path="data.js" />

(function (lightSwitchApplication) {

    var $Screen = msls.Screen,
        $defineScreen = msls._defineScreen,
        $DataServiceQuery = msls.DataServiceQuery,
        $toODataString = msls._toODataString,
        $defineShowScreen = msls._defineShowScreen;

    function BrowseSuppliers(parameters, dataWorkspace) {
        /// <summary>
        /// Represents the BrowseSuppliers screen.
        /// </summary>
        /// <param name="parameters" type="Array">
        /// An array of screen parameter values.
        /// </param>
        /// <param name="dataWorkspace" type="msls.application.DataWorkspace" optional="true">
        /// An existing data workspace for this screen to use. By default, a new data workspace is created.
        /// </param>
        /// <field name="Suppliers" type="msls.VisualCollection" elementType="msls.application.Supplier">
        /// Gets the suppliers for this screen.
        /// </field>
        /// <field name="details" type="msls.application.BrowseSuppliers.Details">
        /// Gets the details for this screen.
        /// </field>
        if (!dataWorkspace) {
            dataWorkspace = new lightSwitchApplication.DataWorkspace();
        }
        $Screen.call(this, dataWorkspace, "BrowseSuppliers", parameters);
    }

    function ViewDeliveryAssessment(parameters, dataWorkspace) {
        /// <summary>
        /// Represents the ViewDeliveryAssessment screen.
        /// </summary>
        /// <param name="parameters" type="Array">
        /// An array of screen parameter values.
        /// </param>
        /// <param name="dataWorkspace" type="msls.application.DataWorkspace" optional="true">
        /// An existing data workspace for this screen to use. By default, a new data workspace is created.
        /// </param>
        /// <field name="DeliveryAssessment" type="msls.application.DeliveryAssessment">
        /// Gets or sets the deliveryAssessment for this screen.
        /// </field>
        /// <field name="DeliveryAssessmentDetailsByBookingInReferenceNumber" type="msls.VisualCollection" elementType="msls.application.DeliveryAssessmentDetail">
        /// Gets the deliveryAssessmentDetailsByBookingInReferenceNumber for this screen.
        /// </field>
        /// <field name="details" type="msls.application.ViewDeliveryAssessment.Details">
        /// Gets the details for this screen.
        /// </field>
        if (!dataWorkspace) {
            dataWorkspace = new lightSwitchApplication.DataWorkspace();
        }
        $Screen.call(this, dataWorkspace, "ViewDeliveryAssessment", parameters);
    }

    function ViewSupplier(parameters, dataWorkspace) {
        /// <summary>
        /// Represents the ViewSupplier screen.
        /// </summary>
        /// <param name="parameters" type="Array">
        /// An array of screen parameter values.
        /// </param>
        /// <param name="dataWorkspace" type="msls.application.DataWorkspace" optional="true">
        /// An existing data workspace for this screen to use. By default, a new data workspace is created.
        /// </param>
        /// <field name="Supplier" type="msls.application.Supplier">
        /// Gets or sets the supplier for this screen.
        /// </field>
        /// <field name="AssessmentsBySupplierId" type="msls.VisualCollection" elementType="msls.application.SupplierAssessment">
        /// Gets the assessmentsBySupplierId for this screen.
        /// </field>
        /// <field name="SupplierMonthlyScoresBySupplierId" type="msls.VisualCollection" elementType="msls.application.SupplierMonthlyScore">
        /// Gets the supplierMonthlyScoresBySupplierId for this screen.
        /// </field>
        /// <field name="details" type="msls.application.ViewSupplier.Details">
        /// Gets the details for this screen.
        /// </field>
        if (!dataWorkspace) {
            dataWorkspace = new lightSwitchApplication.DataWorkspace();
        }
        $Screen.call(this, dataWorkspace, "ViewSupplier", parameters);
    }

    function ViewSupplierAssessment(parameters, dataWorkspace) {
        /// <summary>
        /// Represents the ViewSupplierAssessment screen.
        /// </summary>
        /// <param name="parameters" type="Array">
        /// An array of screen parameter values.
        /// </param>
        /// <param name="dataWorkspace" type="msls.application.DataWorkspace" optional="true">
        /// An existing data workspace for this screen to use. By default, a new data workspace is created.
        /// </param>
        /// <field name="SupplierMonthlyScore" type="msls.application.SupplierMonthlyScore">
        /// Gets or sets the supplierMonthlyScore for this screen.
        /// </field>
        /// <field name="AssessmentStartDate" type="Date">
        /// Gets or sets the assessmentStartDate for this screen.
        /// </field>
        /// <field name="AssessmentEndDate" type="Date">
        /// Gets or sets the assessmentEndDate for this screen.
        /// </field>
        /// <field name="DeliveryAssessmentsBySupplierAndDate" type="msls.VisualCollection" elementType="msls.application.DeliveryAssessment">
        /// Gets the deliveryAssessmentsBySupplierAndDate for this screen.
        /// </field>
        /// <field name="TotalScore" type="String">
        /// Gets or sets the totalScore for this screen.
        /// </field>
        /// <field name="ServiceScore" type="String">
        /// Gets or sets the serviceScore for this screen.
        /// </field>
        /// <field name="details" type="msls.application.ViewSupplierAssessment.Details">
        /// Gets the details for this screen.
        /// </field>
        if (!dataWorkspace) {
            dataWorkspace = new lightSwitchApplication.DataWorkspace();
        }
        $Screen.call(this, dataWorkspace, "ViewSupplierAssessment", parameters);
    }

    msls._addToNamespace("msls.application", {

        BrowseSuppliers: $defineScreen(BrowseSuppliers, [
            {
                name: "Suppliers", kind: "collection", elementType: lightSwitchApplication.Supplier,
                createQuery: function () {
                    return this.dataWorkspace.SupplierAssessmentData.Suppliers.orderBy("SupplierName");
                }
            }
        ], [
        ]),

        ViewDeliveryAssessment: $defineScreen(ViewDeliveryAssessment, [
            { name: "DeliveryAssessment", kind: "local", type: lightSwitchApplication.DeliveryAssessment },
            {
                name: "DeliveryAssessmentDetailsByBookingInReferenceNumber", kind: "collection", elementType: lightSwitchApplication.DeliveryAssessmentDetail,
                createQuery: function (BookingInReferenceNumber, AssessmentId) {
                    return this.dataWorkspace.SupplierAssessmentData.DeliveryAssessmentDetailsByBookingInReferenceNumber(BookingInReferenceNumber, AssessmentId);
                }
            }
        ], [
        ]),

        ViewSupplier: $defineScreen(ViewSupplier, [
            { name: "Supplier", kind: "local", type: lightSwitchApplication.Supplier },
            {
                name: "AssessmentsBySupplierId", kind: "collection", elementType: lightSwitchApplication.SupplierAssessment,
                createQuery: function (SupplierID) {
                    return this.dataWorkspace.SupplierAssessmentData.AssessmentsBySupplierId(SupplierID);
                }
            },
            {
                name: "SupplierMonthlyScoresBySupplierId", kind: "collection", elementType: lightSwitchApplication.SupplierMonthlyScore,
                createQuery: function (SupplierId) {
                    return this.dataWorkspace.SupplierAssessmentData.SupplierMonthlyScoresBySupplierId(SupplierId);
                }
            }
        ], [
        ]),

        ViewSupplierAssessment: $defineScreen(ViewSupplierAssessment, [
            { name: "SupplierMonthlyScore", kind: "local", type: lightSwitchApplication.SupplierMonthlyScore },
            { name: "AssessmentStartDate", kind: "local", type: Date },
            { name: "AssessmentEndDate", kind: "local", type: Date },
            {
                name: "DeliveryAssessmentsBySupplierAndDate", kind: "collection", elementType: lightSwitchApplication.DeliveryAssessment,
                createQuery: function (SupplierId, StartDate, EndDate) {
                    return this.dataWorkspace.SupplierAssessmentData.DeliveryAssessmentsBySupplierAndDate(SupplierId, StartDate, EndDate);
                }
            },
            { name: "TotalScore", kind: "local", type: String },
            { name: "ServiceScore", kind: "local", type: String }
        ], [
        ]),

        showBrowseSuppliers: $defineShowScreen(function showBrowseSuppliers(options) {
            /// <summary>
            /// Asynchronously navigates forward to the BrowseSuppliers screen.
            /// </summary>
            /// <param name="options" optional="true">
            /// An object that provides one or more of the following options:<br/>- beforeShown: a function that is called after boundary behavior has been applied but before the screen is shown.<br/>+ Signature: beforeShown(screen)<br/>- afterClosed: a function that is called after boundary behavior has been applied and the screen has been closed.<br/>+ Signature: afterClosed(screen, action : msls.NavigateBackAction)
            /// </param>
            /// <returns type="WinJS.Promise" />
            var parameters = Array.prototype.slice.call(arguments, 0, 0);
            return lightSwitchApplication.showScreen("BrowseSuppliers", parameters, options);
        }),

        showViewDeliveryAssessment: $defineShowScreen(function showViewDeliveryAssessment(DeliveryAssessment, options) {
            /// <summary>
            /// Asynchronously navigates forward to the ViewDeliveryAssessment screen.
            /// </summary>
            /// <param name="options" optional="true">
            /// An object that provides one or more of the following options:<br/>- beforeShown: a function that is called after boundary behavior has been applied but before the screen is shown.<br/>+ Signature: beforeShown(screen)<br/>- afterClosed: a function that is called after boundary behavior has been applied and the screen has been closed.<br/>+ Signature: afterClosed(screen, action : msls.NavigateBackAction)
            /// </param>
            /// <returns type="WinJS.Promise" />
            var parameters = Array.prototype.slice.call(arguments, 0, 1);
            return lightSwitchApplication.showScreen("ViewDeliveryAssessment", parameters, options);
        }),

        showViewSupplier: $defineShowScreen(function showViewSupplier(Supplier, options) {
            /// <summary>
            /// Asynchronously navigates forward to the ViewSupplier screen.
            /// </summary>
            /// <param name="options" optional="true">
            /// An object that provides one or more of the following options:<br/>- beforeShown: a function that is called after boundary behavior has been applied but before the screen is shown.<br/>+ Signature: beforeShown(screen)<br/>- afterClosed: a function that is called after boundary behavior has been applied and the screen has been closed.<br/>+ Signature: afterClosed(screen, action : msls.NavigateBackAction)
            /// </param>
            /// <returns type="WinJS.Promise" />
            var parameters = Array.prototype.slice.call(arguments, 0, 1);
            return lightSwitchApplication.showScreen("ViewSupplier", parameters, options);
        }),

        showViewSupplierAssessment: $defineShowScreen(function showViewSupplierAssessment(SupplierMonthlyScore, options) {
            /// <summary>
            /// Asynchronously navigates forward to the ViewSupplierAssessment screen.
            /// </summary>
            /// <param name="options" optional="true">
            /// An object that provides one or more of the following options:<br/>- beforeShown: a function that is called after boundary behavior has been applied but before the screen is shown.<br/>+ Signature: beforeShown(screen)<br/>- afterClosed: a function that is called after boundary behavior has been applied and the screen has been closed.<br/>+ Signature: afterClosed(screen, action : msls.NavigateBackAction)
            /// </param>
            /// <returns type="WinJS.Promise" />
            var parameters = Array.prototype.slice.call(arguments, 0, 1);
            return lightSwitchApplication.showScreen("ViewSupplierAssessment", parameters, options);
        })

    });

}(msls.application));
