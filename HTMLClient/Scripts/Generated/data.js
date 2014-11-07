/// <reference path="../Scripts/msls.js" />

window.myapp = msls.application;

(function (lightSwitchApplication) {

    var $Entity = msls.Entity,
        $DataService = msls.DataService,
        $DataWorkspace = msls.DataWorkspace,
        $defineEntity = msls._defineEntity,
        $defineDataService = msls._defineDataService,
        $defineDataWorkspace = msls._defineDataWorkspace,
        $DataServiceQuery = msls.DataServiceQuery,
        $toODataString = msls._toODataString;

    function DeliveryAssessmentDetail(entitySet) {
        /// <summary>
        /// Represents the DeliveryAssessmentDetail entity type.
        /// </summary>
        /// <param name="entitySet" type="msls.EntitySet" optional="true">
        /// The entity set that should contain this deliveryAssessmentDetail.
        /// </param>
        /// <field name="BookingInReferenceNumber" type="String">
        /// Gets or sets the bookingInReferenceNumber for this deliveryAssessmentDetail.
        /// </field>
        /// <field name="Question_No" type="String">
        /// Gets or sets the question_No for this deliveryAssessmentDetail.
        /// </field>
        /// <field name="AssessmentDate" type="Date">
        /// Gets or sets the assessmentDate for this deliveryAssessmentDetail.
        /// </field>
        /// <field name="Question" type="String">
        /// Gets or sets the question for this deliveryAssessmentDetail.
        /// </field>
        /// <field name="Weighting" type="Number">
        /// Gets or sets the weighting for this deliveryAssessmentDetail.
        /// </field>
        /// <field name="Score" type="Number">
        /// Gets or sets the score for this deliveryAssessmentDetail.
        /// </field>
        /// <field name="Score_Value" type="Number">
        /// Gets or sets the score_Value for this deliveryAssessmentDetail.
        /// </field>
        /// <field name="AssessmentId" type="Number">
        /// Gets or sets the assessmentId for this deliveryAssessmentDetail.
        /// </field>
        /// <field name="QuestionIndex" type="String">
        /// Gets or sets the questionIndex for this deliveryAssessmentDetail.
        /// </field>
        /// <field name="details" type="msls.application.DeliveryAssessmentDetail.Details">
        /// Gets the details for this deliveryAssessmentDetail.
        /// </field>
        $Entity.call(this, entitySet);
    }

    function DeliveryAssessment(entitySet) {
        /// <summary>
        /// Represents the DeliveryAssessment entity type.
        /// </summary>
        /// <param name="entitySet" type="msls.EntitySet" optional="true">
        /// The entity set that should contain this deliveryAssessment.
        /// </param>
        /// <field name="AssessmentId" type="Number">
        /// Gets or sets the assessmentId for this deliveryAssessment.
        /// </field>
        /// <field name="SupplierId" type="Number">
        /// Gets or sets the supplierId for this deliveryAssessment.
        /// </field>
        /// <field name="BookingInReferenceNumber" type="String">
        /// Gets or sets the bookingInReferenceNumber for this deliveryAssessment.
        /// </field>
        /// <field name="AssessmentDate" type="Date">
        /// Gets or sets the assessmentDate for this deliveryAssessment.
        /// </field>
        /// <field name="AssessmentUser" type="String">
        /// Gets or sets the assessmentUser for this deliveryAssessment.
        /// </field>
        /// <field name="Total" type="Number">
        /// Gets or sets the total for this deliveryAssessment.
        /// </field>
        /// <field name="Grade" type="String">
        /// Gets or sets the grade for this deliveryAssessment.
        /// </field>
        /// <field name="Comments" type="String">
        /// Gets or sets the comments for this deliveryAssessment.
        /// </field>
        /// <field name="AssessmentQ1" type="Number">
        /// Gets or sets the assessmentQ1 for this deliveryAssessment.
        /// </field>
        /// <field name="AssessmentQ2" type="Number">
        /// Gets or sets the assessmentQ2 for this deliveryAssessment.
        /// </field>
        /// <field name="AssessmentQ3" type="Number">
        /// Gets or sets the assessmentQ3 for this deliveryAssessment.
        /// </field>
        /// <field name="AssessmentQ4" type="Number">
        /// Gets or sets the assessmentQ4 for this deliveryAssessment.
        /// </field>
        /// <field name="AssessmentQ5" type="Number">
        /// Gets or sets the assessmentQ5 for this deliveryAssessment.
        /// </field>
        /// <field name="AssessmentQ6" type="Number">
        /// Gets or sets the assessmentQ6 for this deliveryAssessment.
        /// </field>
        /// <field name="AssessmentQ7" type="Number">
        /// Gets or sets the assessmentQ7 for this deliveryAssessment.
        /// </field>
        /// <field name="AssessmentQ8" type="Number">
        /// Gets or sets the assessmentQ8 for this deliveryAssessment.
        /// </field>
        /// <field name="AssessmentQ9" type="Number">
        /// Gets or sets the assessmentQ9 for this deliveryAssessment.
        /// </field>
        /// <field name="AssessmentQ10" type="Number">
        /// Gets or sets the assessmentQ10 for this deliveryAssessment.
        /// </field>
        /// <field name="AssessmentQ11" type="Number">
        /// Gets or sets the assessmentQ11 for this deliveryAssessment.
        /// </field>
        /// <field name="AssessmentQ12" type="Number">
        /// Gets or sets the assessmentQ12 for this deliveryAssessment.
        /// </field>
        /// <field name="AssessmentQ13" type="Number">
        /// Gets or sets the assessmentQ13 for this deliveryAssessment.
        /// </field>
        /// <field name="AssessmentQ14" type="Number">
        /// Gets or sets the assessmentQ14 for this deliveryAssessment.
        /// </field>
        /// <field name="AssessmentQ15" type="Number">
        /// Gets or sets the assessmentQ15 for this deliveryAssessment.
        /// </field>
        /// <field name="AssessmentQ16" type="Number">
        /// Gets or sets the assessmentQ16 for this deliveryAssessment.
        /// </field>
        /// <field name="AssessmentQ17" type="Number">
        /// Gets or sets the assessmentQ17 for this deliveryAssessment.
        /// </field>
        /// <field name="AssessmentQ18" type="Number">
        /// Gets or sets the assessmentQ18 for this deliveryAssessment.
        /// </field>
        /// <field name="details" type="msls.application.DeliveryAssessment.Details">
        /// Gets the details for this deliveryAssessment.
        /// </field>
        $Entity.call(this, entitySet);
    }

    function Question(entitySet) {
        /// <summary>
        /// Represents the Question entity type.
        /// </summary>
        /// <param name="entitySet" type="msls.EntitySet" optional="true">
        /// The entity set that should contain this question.
        /// </param>
        /// <field name="ID" type="Number">
        /// Gets or sets the iD for this question.
        /// </field>
        /// <field name="QuizTitle" type="String">
        /// Gets or sets the quizTitle for this question.
        /// </field>
        /// <field name="SectionTitle" type="String">
        /// Gets or sets the sectionTitle for this question.
        /// </field>
        /// <field name="QuestionIndex" type="String">
        /// Gets or sets the questionIndex for this question.
        /// </field>
        /// <field name="QuestionNumber" type="String">
        /// Gets or sets the questionNumber for this question.
        /// </field>
        /// <field name="Weighting" type="Number">
        /// Gets or sets the weighting for this question.
        /// </field>
        /// <field name="CriticalFlag" type="Number">
        /// Gets or sets the criticalFlag for this question.
        /// </field>
        /// <field name="QuestionType" type="String">
        /// Gets or sets the questionType for this question.
        /// </field>
        /// <field name="Question1" type="String">
        /// Gets or sets the question1 for this question.
        /// </field>
        /// <field name="AnswerYesAdvice" type="String">
        /// Gets or sets the answerYesAdvice for this question.
        /// </field>
        /// <field name="AnswerNoAdvice" type="String">
        /// Gets or sets the answerNoAdvice for this question.
        /// </field>
        /// <field name="details" type="msls.application.Question.Details">
        /// Gets the details for this question.
        /// </field>
        $Entity.call(this, entitySet);
    }

    function SupplierAssessment(entitySet) {
        /// <summary>
        /// Represents the SupplierAssessment entity type.
        /// </summary>
        /// <param name="entitySet" type="msls.EntitySet" optional="true">
        /// The entity set that should contain this supplierAssessment.
        /// </param>
        /// <field name="SupplyAssessmentID" type="Number">
        /// Gets or sets the supplyAssessmentID for this supplierAssessment.
        /// </field>
        /// <field name="SupplierAccountNumber" type="String">
        /// Gets or sets the supplierAccountNumber for this supplierAssessment.
        /// </field>
        /// <field name="FillRate" type="Number">
        /// Gets or sets the fillRate for this supplierAssessment.
        /// </field>
        /// <field name="LeadTime" type="Number">
        /// Gets or sets the leadTime for this supplierAssessment.
        /// </field>
        /// <field name="League" type="String">
        /// Gets or sets the league for this supplierAssessment.
        /// </field>
        /// <field name="Confirmation" type="String">
        /// Gets or sets the confirmation for this supplierAssessment.
        /// </field>
        /// <field name="ProgressChasing" type="String">
        /// Gets or sets the progressChasing for this supplierAssessment.
        /// </field>
        /// <field name="AssessmentCreated" type="Date">
        /// Gets or sets the assessmentCreated for this supplierAssessment.
        /// </field>
        /// <field name="AssessmentCompleted" type="Date">
        /// Gets or sets the assessmentCompleted for this supplierAssessment.
        /// </field>
        /// <field name="AssessmentComplete" type="Boolean">
        /// Gets or sets the assessmentComplete for this supplierAssessment.
        /// </field>
        /// <field name="PerformedBy" type="String">
        /// Gets or sets the performedBy for this supplierAssessment.
        /// </field>
        /// <field name="FillRatePoint" type="Number">
        /// Gets or sets the fillRatePoint for this supplierAssessment.
        /// </field>
        /// <field name="LeadTimePoint" type="Number">
        /// Gets or sets the leadTimePoint for this supplierAssessment.
        /// </field>
        /// <field name="Phase1Score" type="Number">
        /// Gets or sets the phase1Score for this supplierAssessment.
        /// </field>
        /// <field name="Phase2Score" type="Number">
        /// Gets or sets the phase2Score for this supplierAssessment.
        /// </field>
        /// <field name="ServiceFailures" type="Number">
        /// Gets or sets the serviceFailures for this supplierAssessment.
        /// </field>
        /// <field name="OverallScore" type="Number">
        /// Gets or sets the overallScore for this supplierAssessment.
        /// </field>
        /// <field name="GradeAwarded" type="String">
        /// Gets or sets the gradeAwarded for this supplierAssessment.
        /// </field>
        /// <field name="EDIPoints" type="Number">
        /// Gets or sets the eDIPoints for this supplierAssessment.
        /// </field>
        /// <field name="EDIGrade" type="Number">
        /// Gets or sets the eDIGrade for this supplierAssessment.
        /// </field>
        /// <field name="AssessmentMonth" type="Date">
        /// Gets or sets the assessmentMonth for this supplierAssessment.
        /// </field>
        /// <field name="Location" type="String">
        /// Gets or sets the location for this supplierAssessment.
        /// </field>
        /// <field name="SupplierID" type="Number">
        /// Gets or sets the supplierID for this supplierAssessment.
        /// </field>
        /// <field name="SupplierName" type="String">
        /// Gets or sets the supplierName for this supplierAssessment.
        /// </field>
        /// <field name="SupplierContactDetails" type="String">
        /// Gets or sets the supplierContactDetails for this supplierAssessment.
        /// </field>
        /// <field name="SupplierLastModified" type="Date">
        /// Gets or sets the supplierLastModified for this supplierAssessment.
        /// </field>
        /// <field name="SupplierCurrentGrade" type="String">
        /// Gets or sets the supplierCurrentGrade for this supplierAssessment.
        /// </field>
        /// <field name="SupplierLastAssessed" type="Date">
        /// Gets or sets the supplierLastAssessed for this supplierAssessment.
        /// </field>
        /// <field name="SupplierLastAssessedBy" type="String">
        /// Gets or sets the supplierLastAssessedBy for this supplierAssessment.
        /// </field>
        /// <field name="SupplierLastAssessedType" type="String">
        /// Gets or sets the supplierLastAssessedType for this supplierAssessment.
        /// </field>
        /// <field name="SupplierBeingAssessed" type="Boolean">
        /// Gets or sets the supplierBeingAssessed for this supplierAssessment.
        /// </field>
        /// <field name="Expr1" type="String">
        /// Gets or sets the expr1 for this supplierAssessment.
        /// </field>
        /// <field name="SupplierAlertEmailSent" type="Boolean">
        /// Gets or sets the supplierAlertEmailSent for this supplierAssessment.
        /// </field>
        /// <field name="SupplierType" type="Number">
        /// Gets or sets the supplierType for this supplierAssessment.
        /// </field>
        /// <field name="SupplierLeague" type="String">
        /// Gets or sets the supplierLeague for this supplierAssessment.
        /// </field>
        /// <field name="SupplierPalletExchangeEnabled" type="Boolean">
        /// Gets or sets the supplierPalletExchangeEnabled for this supplierAssessment.
        /// </field>
        /// <field name="SupplierPalletExchangeType" type="Number">
        /// Gets or sets the supplierPalletExchangeType for this supplierAssessment.
        /// </field>
        /// <field name="SupplierPalletExchangePallets" type="Number">
        /// Gets or sets the supplierPalletExchangePallets for this supplierAssessment.
        /// </field>
        /// <field name="SupplierPalletExchangeTotes" type="Number">
        /// Gets or sets the supplierPalletExchangeTotes for this supplierAssessment.
        /// </field>
        /// <field name="SupplierPalletExchangePalletsStartedOn" type="Number">
        /// Gets or sets the supplierPalletExchangePalletsStartedOn for this supplierAssessment.
        /// </field>
        /// <field name="SupplierPalletExchangeTotesStartedOn" type="Number">
        /// Gets or sets the supplierPalletExchangeTotesStartedOn for this supplierAssessment.
        /// </field>
        /// <field name="SupplierPalletExchangeReturnRate" type="String">
        /// Gets or sets the supplierPalletExchangeReturnRate for this supplierAssessment.
        /// </field>
        /// <field name="SupplierAcceptEDI" type="Boolean">
        /// Gets or sets the supplierAcceptEDI for this supplierAssessment.
        /// </field>
        /// <field name="SupplierDelAdvice" type="Boolean">
        /// Gets or sets the supplierDelAdvice for this supplierAssessment.
        /// </field>
        /// <field name="SupplierInvoice" type="Boolean">
        /// Gets or sets the supplierInvoice for this supplierAssessment.
        /// </field>
        /// <field name="SupplierPEResponsibleLocation" type="String">
        /// Gets or sets the supplierPEResponsibleLocation for this supplierAssessment.
        /// </field>
        /// <field name="SupplierEmail" type="String">
        /// Gets or sets the supplierEmail for this supplierAssessment.
        /// </field>
        /// <field name="details" type="msls.application.SupplierAssessment.Details">
        /// Gets the details for this supplierAssessment.
        /// </field>
        $Entity.call(this, entitySet);
    }

    function SupplierMonthlyScore(entitySet) {
        /// <summary>
        /// Represents the SupplierMonthlyScore entity type.
        /// </summary>
        /// <param name="entitySet" type="msls.EntitySet" optional="true">
        /// The entity set that should contain this supplierMonthlyScore.
        /// </param>
        /// <field name="IsCompleted" type="Boolean">
        /// Gets or sets the isCompleted for this supplierMonthlyScore.
        /// </field>
        /// <field name="CompletedDate" type="String">
        /// Gets or sets the completedDate for this supplierMonthlyScore.
        /// </field>
        /// <field name="CompletedBy" type="String">
        /// Gets or sets the completedBy for this supplierMonthlyScore.
        /// </field>
        /// <field name="AssessmentCount" type="Number">
        /// Gets or sets the assessmentCount for this supplierMonthlyScore.
        /// </field>
        /// <field name="AssessmentTotalScore" type="Number">
        /// Gets or sets the assessmentTotalScore for this supplierMonthlyScore.
        /// </field>
        /// <field name="DeliveryAverage" type="String">
        /// Gets or sets the deliveryAverage for this supplierMonthlyScore.
        /// </field>
        /// <field name="DeliveryGrade" type="String">
        /// Gets or sets the deliveryGrade for this supplierMonthlyScore.
        /// </field>
        /// <field name="ServiceFailureCount" type="Number">
        /// Gets or sets the serviceFailureCount for this supplierMonthlyScore.
        /// </field>
        /// <field name="ServiceFailureScore" type="String">
        /// Gets or sets the serviceFailureScore for this supplierMonthlyScore.
        /// </field>
        /// <field name="FillRate" type="String">
        /// Gets or sets the fillRate for this supplierMonthlyScore.
        /// </field>
        /// <field name="FillRateScore" type="String">
        /// Gets or sets the fillRateScore for this supplierMonthlyScore.
        /// </field>
        /// <field name="LeadTime" type="String">
        /// Gets or sets the leadTime for this supplierMonthlyScore.
        /// </field>
        /// <field name="LeadTimeScore" type="String">
        /// Gets or sets the leadTimeScore for this supplierMonthlyScore.
        /// </field>
        /// <field name="OverallScore" type="String">
        /// Gets or sets the overallScore for this supplierMonthlyScore.
        /// </field>
        /// <field name="League" type="String">
        /// Gets or sets the league for this supplierMonthlyScore.
        /// </field>
        /// <field name="OverallGrade" type="String">
        /// Gets or sets the overallGrade for this supplierMonthlyScore.
        /// </field>
        /// <field name="AwardDate" type="Date">
        /// Gets or sets the awardDate for this supplierMonthlyScore.
        /// </field>
        /// <field name="SupplierId" type="Number">
        /// Gets or sets the supplierId for this supplierMonthlyScore.
        /// </field>
        /// <field name="AwardYear" type="Number">
        /// Gets or sets the awardYear for this supplierMonthlyScore.
        /// </field>
        /// <field name="AwaordMonth" type="Number">
        /// Gets or sets the awaordMonth for this supplierMonthlyScore.
        /// </field>
        /// <field name="details" type="msls.application.SupplierMonthlyScore.Details">
        /// Gets the details for this supplierMonthlyScore.
        /// </field>
        $Entity.call(this, entitySet);
    }

    function Supplier(entitySet) {
        /// <summary>
        /// Represents the Supplier entity type.
        /// </summary>
        /// <param name="entitySet" type="msls.EntitySet" optional="true">
        /// The entity set that should contain this supplier.
        /// </param>
        /// <field name="SupplierID" type="Number">
        /// Gets or sets the supplierID for this supplier.
        /// </field>
        /// <field name="SupplierName" type="String">
        /// Gets or sets the supplierName for this supplier.
        /// </field>
        /// <field name="SupplierContactDetails" type="String">
        /// Gets or sets the supplierContactDetails for this supplier.
        /// </field>
        /// <field name="SupplierLastModified" type="Date">
        /// Gets or sets the supplierLastModified for this supplier.
        /// </field>
        /// <field name="SupplierCurrentGrade" type="String">
        /// Gets or sets the supplierCurrentGrade for this supplier.
        /// </field>
        /// <field name="SupplierLastAssessed" type="Date">
        /// Gets or sets the supplierLastAssessed for this supplier.
        /// </field>
        /// <field name="SupplierLastAssessedBy" type="String">
        /// Gets or sets the supplierLastAssessedBy for this supplier.
        /// </field>
        /// <field name="SupplierLastAssessedType" type="String">
        /// Gets or sets the supplierLastAssessedType for this supplier.
        /// </field>
        /// <field name="SupplierBeingAssessed" type="Boolean">
        /// Gets or sets the supplierBeingAssessed for this supplier.
        /// </field>
        /// <field name="SupplierAccountNumber" type="String">
        /// Gets or sets the supplierAccountNumber for this supplier.
        /// </field>
        /// <field name="SupplierAlertEmailSent" type="Boolean">
        /// Gets or sets the supplierAlertEmailSent for this supplier.
        /// </field>
        /// <field name="SupplierType" type="Number">
        /// Gets or sets the supplierType for this supplier.
        /// </field>
        /// <field name="SupplierLeague" type="String">
        /// Gets or sets the supplierLeague for this supplier.
        /// </field>
        /// <field name="SupplierPalletExchangeEnabled" type="Boolean">
        /// Gets or sets the supplierPalletExchangeEnabled for this supplier.
        /// </field>
        /// <field name="SupplierPalletExchangeType" type="Number">
        /// Gets or sets the supplierPalletExchangeType for this supplier.
        /// </field>
        /// <field name="SupplierPalletExchangePallets" type="Number">
        /// Gets or sets the supplierPalletExchangePallets for this supplier.
        /// </field>
        /// <field name="SupplierPalletExchangeTotes" type="Number">
        /// Gets or sets the supplierPalletExchangeTotes for this supplier.
        /// </field>
        /// <field name="SupplierPalletExchangePalletsStartedOn" type="Number">
        /// Gets or sets the supplierPalletExchangePalletsStartedOn for this supplier.
        /// </field>
        /// <field name="SupplierPalletExchangeTotesStartedOn" type="Number">
        /// Gets or sets the supplierPalletExchangeTotesStartedOn for this supplier.
        /// </field>
        /// <field name="SupplierPalletExchangeReturnRate" type="String">
        /// Gets or sets the supplierPalletExchangeReturnRate for this supplier.
        /// </field>
        /// <field name="SupplierAcceptEDI" type="Boolean">
        /// Gets or sets the supplierAcceptEDI for this supplier.
        /// </field>
        /// <field name="SupplierDelAdvice" type="Boolean">
        /// Gets or sets the supplierDelAdvice for this supplier.
        /// </field>
        /// <field name="SupplierInvoice" type="Boolean">
        /// Gets or sets the supplierInvoice for this supplier.
        /// </field>
        /// <field name="SupplierPEResponsibleLocation" type="String">
        /// Gets or sets the supplierPEResponsibleLocation for this supplier.
        /// </field>
        /// <field name="SupplierEmail" type="String">
        /// Gets or sets the supplierEmail for this supplier.
        /// </field>
        /// <field name="OverallGrade" type="String">
        /// Gets or sets the overallGrade for this supplier.
        /// </field>
        /// <field name="AwardDate" type="Date">
        /// Gets or sets the awardDate for this supplier.
        /// </field>
        /// <field name="details" type="msls.application.Supplier.Details">
        /// Gets the details for this supplier.
        /// </field>
        $Entity.call(this, entitySet);
    }

    function SupplierAssessmentData(dataWorkspace) {
        /// <summary>
        /// Represents the SupplierAssessmentData data service.
        /// </summary>
        /// <param name="dataWorkspace" type="msls.DataWorkspace">
        /// The data workspace that created this data service.
        /// </param>
        /// <field name="DeliveryAssessmentDetails" type="msls.EntitySet">
        /// Gets the DeliveryAssessmentDetails entity set.
        /// </field>
        /// <field name="DeliveryAssessments" type="msls.EntitySet">
        /// Gets the DeliveryAssessments entity set.
        /// </field>
        /// <field name="Questions" type="msls.EntitySet">
        /// Gets the Questions entity set.
        /// </field>
        /// <field name="SupplierAssessments" type="msls.EntitySet">
        /// Gets the SupplierAssessments entity set.
        /// </field>
        /// <field name="SupplierMonthlyScores" type="msls.EntitySet">
        /// Gets the SupplierMonthlyScores entity set.
        /// </field>
        /// <field name="Suppliers" type="msls.EntitySet">
        /// Gets the Suppliers entity set.
        /// </field>
        /// <field name="details" type="msls.application.SupplierAssessmentData.Details">
        /// Gets the details for this data service.
        /// </field>
        $DataService.call(this, dataWorkspace);
    };
    function DataWorkspace() {
        /// <summary>
        /// Represents the data workspace.
        /// </summary>
        /// <field name="SupplierAssessmentData" type="msls.application.SupplierAssessmentData">
        /// Gets the SupplierAssessmentData data service.
        /// </field>
        /// <field name="details" type="msls.application.DataWorkspace.Details">
        /// Gets the details for this data workspace.
        /// </field>
        $DataWorkspace.call(this);
    };

    msls._addToNamespace("msls.application", {

        DeliveryAssessmentDetail: $defineEntity(DeliveryAssessmentDetail, [
            { name: "BookingInReferenceNumber", type: String },
            { name: "Question_No", type: String },
            { name: "AssessmentDate", type: Date },
            { name: "Question", type: String },
            { name: "Weighting", type: Number },
            { name: "Score", type: Number },
            { name: "Score_Value", type: Number },
            { name: "AssessmentId", type: Number },
            { name: "QuestionIndex", type: String }
        ]),

        DeliveryAssessment: $defineEntity(DeliveryAssessment, [
            { name: "AssessmentId", type: Number },
            { name: "SupplierId", type: Number },
            { name: "BookingInReferenceNumber", type: String },
            { name: "AssessmentDate", type: Date },
            { name: "AssessmentUser", type: String },
            { name: "Total", type: Number },
            { name: "Grade", type: String },
            { name: "Comments", type: String },
            { name: "AssessmentQ1", type: Number },
            { name: "AssessmentQ2", type: Number },
            { name: "AssessmentQ3", type: Number },
            { name: "AssessmentQ4", type: Number },
            { name: "AssessmentQ5", type: Number },
            { name: "AssessmentQ6", type: Number },
            { name: "AssessmentQ7", type: Number },
            { name: "AssessmentQ8", type: Number },
            { name: "AssessmentQ9", type: Number },
            { name: "AssessmentQ10", type: Number },
            { name: "AssessmentQ11", type: Number },
            { name: "AssessmentQ12", type: Number },
            { name: "AssessmentQ13", type: Number },
            { name: "AssessmentQ14", type: Number },
            { name: "AssessmentQ15", type: Number },
            { name: "AssessmentQ16", type: Number },
            { name: "AssessmentQ17", type: Number },
            { name: "AssessmentQ18", type: Number }
        ]),

        Question: $defineEntity(Question, [
            { name: "ID", type: Number },
            { name: "QuizTitle", type: String },
            { name: "SectionTitle", type: String },
            { name: "QuestionIndex", type: String },
            { name: "QuestionNumber", type: String },
            { name: "Weighting", type: Number },
            { name: "CriticalFlag", type: Number },
            { name: "QuestionType", type: String },
            { name: "Question1", type: String },
            { name: "AnswerYesAdvice", type: String },
            { name: "AnswerNoAdvice", type: String }
        ]),

        SupplierAssessment: $defineEntity(SupplierAssessment, [
            { name: "SupplyAssessmentID", type: Number },
            { name: "SupplierAccountNumber", type: String },
            { name: "FillRate", type: Number },
            { name: "LeadTime", type: Number },
            { name: "League", type: String },
            { name: "Confirmation", type: String },
            { name: "ProgressChasing", type: String },
            { name: "AssessmentCreated", type: Date },
            { name: "AssessmentCompleted", type: Date },
            { name: "AssessmentComplete", type: Boolean },
            { name: "PerformedBy", type: String },
            { name: "FillRatePoint", type: Number },
            { name: "LeadTimePoint", type: Number },
            { name: "Phase1Score", type: Number },
            { name: "Phase2Score", type: Number },
            { name: "ServiceFailures", type: Number },
            { name: "OverallScore", type: Number },
            { name: "GradeAwarded", type: String },
            { name: "EDIPoints", type: Number },
            { name: "EDIGrade", type: Number },
            { name: "AssessmentMonth", type: Date },
            { name: "Location", type: String },
            { name: "SupplierID", type: Number },
            { name: "SupplierName", type: String },
            { name: "SupplierContactDetails", type: String },
            { name: "SupplierLastModified", type: Date },
            { name: "SupplierCurrentGrade", type: String },
            { name: "SupplierLastAssessed", type: Date },
            { name: "SupplierLastAssessedBy", type: String },
            { name: "SupplierLastAssessedType", type: String },
            { name: "SupplierBeingAssessed", type: Boolean },
            { name: "Expr1", type: String },
            { name: "SupplierAlertEmailSent", type: Boolean },
            { name: "SupplierType", type: Number },
            { name: "SupplierLeague", type: String },
            { name: "SupplierPalletExchangeEnabled", type: Boolean },
            { name: "SupplierPalletExchangeType", type: Number },
            { name: "SupplierPalletExchangePallets", type: Number },
            { name: "SupplierPalletExchangeTotes", type: Number },
            { name: "SupplierPalletExchangePalletsStartedOn", type: Number },
            { name: "SupplierPalletExchangeTotesStartedOn", type: Number },
            { name: "SupplierPalletExchangeReturnRate", type: String },
            { name: "SupplierAcceptEDI", type: Boolean },
            { name: "SupplierDelAdvice", type: Boolean },
            { name: "SupplierInvoice", type: Boolean },
            { name: "SupplierPEResponsibleLocation", type: String },
            { name: "SupplierEmail", type: String }
        ]),

        SupplierMonthlyScore: $defineEntity(SupplierMonthlyScore, [
            { name: "IsCompleted", type: Boolean },
            { name: "CompletedDate", type: String },
            { name: "CompletedBy", type: String },
            { name: "AssessmentCount", type: Number },
            { name: "AssessmentTotalScore", type: Number },
            { name: "DeliveryAverage", type: String },
            { name: "DeliveryGrade", type: String },
            { name: "ServiceFailureCount", type: Number },
            { name: "ServiceFailureScore", type: String },
            { name: "FillRate", type: String },
            { name: "FillRateScore", type: String },
            { name: "LeadTime", type: String },
            { name: "LeadTimeScore", type: String },
            { name: "OverallScore", type: String },
            { name: "League", type: String },
            { name: "OverallGrade", type: String },
            { name: "AwardDate", type: Date },
            { name: "SupplierId", type: Number },
            { name: "AwardYear", type: Number },
            { name: "AwaordMonth", type: Number }
        ]),

        Supplier: $defineEntity(Supplier, [
            { name: "SupplierID", type: Number },
            { name: "SupplierName", type: String },
            { name: "SupplierContactDetails", type: String },
            { name: "SupplierLastModified", type: Date },
            { name: "SupplierCurrentGrade", type: String },
            { name: "SupplierLastAssessed", type: Date },
            { name: "SupplierLastAssessedBy", type: String },
            { name: "SupplierLastAssessedType", type: String },
            { name: "SupplierBeingAssessed", type: Boolean },
            { name: "SupplierAccountNumber", type: String },
            { name: "SupplierAlertEmailSent", type: Boolean },
            { name: "SupplierType", type: Number },
            { name: "SupplierLeague", type: String },
            { name: "SupplierPalletExchangeEnabled", type: Boolean },
            { name: "SupplierPalletExchangeType", type: Number },
            { name: "SupplierPalletExchangePallets", type: Number },
            { name: "SupplierPalletExchangeTotes", type: Number },
            { name: "SupplierPalletExchangePalletsStartedOn", type: Number },
            { name: "SupplierPalletExchangeTotesStartedOn", type: Number },
            { name: "SupplierPalletExchangeReturnRate", type: String },
            { name: "SupplierAcceptEDI", type: Boolean },
            { name: "SupplierDelAdvice", type: Boolean },
            { name: "SupplierInvoice", type: Boolean },
            { name: "SupplierPEResponsibleLocation", type: String },
            { name: "SupplierEmail", type: String },
            { name: "OverallGrade", type: String },
            { name: "AwardDate", type: Date }
        ]),

        SupplierAssessmentData: $defineDataService(SupplierAssessmentData, lightSwitchApplication.rootUri + "/SupplierAssessmentData.svc", [
            { name: "DeliveryAssessmentDetails", elementType: DeliveryAssessmentDetail },
            { name: "DeliveryAssessments", elementType: DeliveryAssessment },
            { name: "Questions", elementType: Question },
            { name: "SupplierAssessments", elementType: SupplierAssessment },
            { name: "SupplierMonthlyScores", elementType: SupplierMonthlyScore },
            { name: "Suppliers", elementType: Supplier }
        ], [
            {
                name: "DeliveryAssessmentDetails_SingleOrDefault", value: function (BookingInReferenceNumber, Question_No, AssessmentId) {
                    return new $DataServiceQuery({ _entitySet: this.DeliveryAssessmentDetails },
                        lightSwitchApplication.rootUri + "/SupplierAssessmentData.svc" + "/DeliveryAssessmentDetails(" + "BookingInReferenceNumber=" + $toODataString(BookingInReferenceNumber, "String?") + "," + "Question_No=" + $toODataString(Question_No, "String?") + "," + "AssessmentId=" + $toODataString(AssessmentId, "Int32?") + ")"
                    );
                }
            },
            {
                name: "DeliveryAssessmentDetailsByBookingInReferenceNumber", value: function (BookingInReferenceNumber, AssessmentId) {
                    return new $DataServiceQuery({ _entitySet: this.DeliveryAssessmentDetails },
                        lightSwitchApplication.rootUri + "/SupplierAssessmentData.svc" + "/DeliveryAssessmentDetailsByBookingInReferenceNumber()",
                        {
                            BookingInReferenceNumber: $toODataString(BookingInReferenceNumber, "String?"),
                            AssessmentId: $toODataString(AssessmentId, "Int32?")
                        });
                }
            },
            {
                name: "DeliveryAssessments_SingleOrDefault", value: function (AssessmentId) {
                    return new $DataServiceQuery({ _entitySet: this.DeliveryAssessments },
                        lightSwitchApplication.rootUri + "/SupplierAssessmentData.svc" + "/DeliveryAssessments(" + "AssessmentId=" + $toODataString(AssessmentId, "Int32?") + ")"
                    );
                }
            },
            {
                name: "DeliveryAssessmentsBySupplierAndDate", value: function (SupplierId, StartDate, EndDate) {
                    return new $DataServiceQuery({ _entitySet: this.DeliveryAssessments },
                        lightSwitchApplication.rootUri + "/SupplierAssessmentData.svc" + "/DeliveryAssessmentsBySupplierAndDate()",
                        {
                            SupplierId: $toODataString(SupplierId, "Int32?"),
                            StartDate: $toODataString(StartDate, "DateTime?"),
                            EndDate: $toODataString(EndDate, "DateTime?")
                        });
                }
            },
            {
                name: "Questions_SingleOrDefault", value: function (ID) {
                    return new $DataServiceQuery({ _entitySet: this.Questions },
                        lightSwitchApplication.rootUri + "/SupplierAssessmentData.svc" + "/Questions(" + "ID=" + $toODataString(ID, "Int32?") + ")"
                    );
                }
            },
            {
                name: "FilterDefaultQuestions", value: function () {
                    return new $DataServiceQuery({ _entitySet: this.Questions },
                        lightSwitchApplication.rootUri + "/SupplierAssessmentData.svc" + "/FilterDefaultQuestions()",
                        {
                        });
                }
            },
            {
                name: "SupplierAssessments_SingleOrDefault", value: function (SupplyAssessmentID, SupplierAccountNumber, AssessmentComplete, SupplierID, SupplierBeingAssessed, Expr1, SupplierAlertEmailSent, SupplierPalletExchangeEnabled, SupplierAcceptEDI, SupplierDelAdvice, SupplierInvoice) {
                    return new $DataServiceQuery({ _entitySet: this.SupplierAssessments },
                        lightSwitchApplication.rootUri + "/SupplierAssessmentData.svc" + "/SupplierAssessments(" + "SupplyAssessmentID=" + $toODataString(SupplyAssessmentID, "Int32?") + "," + "SupplierAccountNumber=" + $toODataString(SupplierAccountNumber, "String?") + "," + "AssessmentComplete=" + $toODataString(AssessmentComplete, "Boolean?") + "," + "SupplierID=" + $toODataString(SupplierID, "Int32?") + "," + "SupplierBeingAssessed=" + $toODataString(SupplierBeingAssessed, "Boolean?") + "," + "Expr1=" + $toODataString(Expr1, "String?") + "," + "SupplierAlertEmailSent=" + $toODataString(SupplierAlertEmailSent, "Boolean?") + "," + "SupplierPalletExchangeEnabled=" + $toODataString(SupplierPalletExchangeEnabled, "Boolean?") + "," + "SupplierAcceptEDI=" + $toODataString(SupplierAcceptEDI, "Boolean?") + "," + "SupplierDelAdvice=" + $toODataString(SupplierDelAdvice, "Boolean?") + "," + "SupplierInvoice=" + $toODataString(SupplierInvoice, "Boolean?") + ")"
                    );
                }
            },
            {
                name: "AssessmentsBySupplierId", value: function (SupplierID) {
                    return new $DataServiceQuery({ _entitySet: this.SupplierAssessments },
                        lightSwitchApplication.rootUri + "/SupplierAssessmentData.svc" + "/AssessmentsBySupplierId()",
                        {
                            SupplierID: $toODataString(SupplierID, "Int32?")
                        });
                }
            },
            {
                name: "SupplierMonthlyScores_SingleOrDefault", value: function (SupplierId, AwardYear, AwaordMonth) {
                    return new $DataServiceQuery({ _entitySet: this.SupplierMonthlyScores },
                        lightSwitchApplication.rootUri + "/SupplierAssessmentData.svc" + "/SupplierMonthlyScores(" + "SupplierId=" + $toODataString(SupplierId, "Int32?") + "," + "AwardYear=" + $toODataString(AwardYear, "Int32?") + "," + "AwaordMonth=" + $toODataString(AwaordMonth, "Int32?") + ")"
                    );
                }
            },
            {
                name: "SupplierMonthlyScoresBySupplierId", value: function (SupplierId) {
                    return new $DataServiceQuery({ _entitySet: this.SupplierMonthlyScores },
                        lightSwitchApplication.rootUri + "/SupplierAssessmentData.svc" + "/SupplierMonthlyScoresBySupplierId()",
                        {
                            SupplierId: $toODataString(SupplierId, "Int32?")
                        });
                }
            },
            {
                name: "Suppliers_SingleOrDefault", value: function (SupplierID) {
                    return new $DataServiceQuery({ _entitySet: this.Suppliers },
                        lightSwitchApplication.rootUri + "/SupplierAssessmentData.svc" + "/Suppliers(" + "SupplierID=" + $toODataString(SupplierID, "Int32?") + ")"
                    );
                }
            },
            {
                name: "GetSupplierByLoggedInUser", value: function () {
                    return new $DataServiceQuery({ _entitySet: this.Suppliers },
                        lightSwitchApplication.rootUri + "/SupplierAssessmentData.svc" + "/GetSupplierByLoggedInUser()",
                        {
                        });
                }
            }
        ]),

        DataWorkspace: $defineDataWorkspace(DataWorkspace, [
            { name: "SupplierAssessmentData", type: SupplierAssessmentData }
        ])

    });

}(msls.application));
