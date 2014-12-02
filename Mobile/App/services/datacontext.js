﻿define(['durandal/system', 'config'], function (system, config) {
    var EntityQuery = breeze.EntityQuery;
    var Predicate = breeze.Predicate;

    var manager = configureBreezeManager();

    function configureBreezeManager() {
        breeze.NamingConvention.camelCase.setAsDefault();

        return new breeze.EntityManager(config.remoteServiceName);
    }

    var getMonthlyAssessmentCount = function (supplierId, observable) {
        var p1 = new Predicate("supplierId", "eq", supplierId);
        var p2 = new Predicate("isComplete", "eq", 1);

        var query = EntityQuery.from("Assessments")
            .where(p1.and(p2))
            .take(0)
            .inlineCount(true);

        return manager.executeQuery(query)
            .then(querySucceeded)
            .fail(queryFailed)

        function querySucceeded(data) {
            if (observable) {
                observable(data.inlineCount);
            }
        }
    }

    var getMonthlyAssessments = function (supplierId, skip, take, observable) {
        var p1 = new Predicate("supplierId", "eq", supplierId);
        var p2 = new Predicate("isComplete", "eq", 1);

        var query = EntityQuery.from("Assessments")
            .where(p1.and(p2))
            .orderBy("date desc")
            .skip(skip).take(take);

        return manager.executeQuery(query)
            .then(querySucceeded)
            .fail(queryFailed)

        function querySucceeded(data) {

            if (observable) {
                observable(data.results);
            }
        }
    }

    var getCurrentMonthlyAssessment = function (supplierId, observable) {
        var p1 = new Predicate("supplierId", "eq", supplierId);
        var p2 = new Predicate("isComplete", "eq", 1);

        var query = EntityQuery.from("Assessments")
            .where(p1.and(p2))
            .orderBy("date desc").take(1);

        return manager.executeQuery(query)
                .then(querySucceeded)
                .fail(queryFailed)

        function querySucceeded(data) {
            if (observable) {

                var entity = data.results[0];
                observable(entity);
            }
        }
    }

    var getMonthlyAssessmentById = function(id, observable)
    {
        return manager.fetchEntityByKey("Assessment", id)
            .then(querySucceeded)
            .fail(queryFailed);

        function querySucceeded(data) {

            var entity = data.entity;

            entity.totalScore = ko.computed(function () {
                var serviceScore = parseFloat(entity.serviceFailureScore()) + parseFloat(entity.fillRateScore()) + parseFloat(entity.leadTimeScore());
                return entity.deliveryAssessmentAverage() + serviceScore;
            });

            if (observable)
                observable(entity);
        }
    }

    var getDeliveryAssessmentCount = function (supplierId, observable) {
        var query = EntityQuery.from("DeliveryAssessments")
            .where("supplierId", "eq", supplierId)
            .take(0).inlineCount(true);

        return manager.executeQuery(query)
            .then(querySucceeded)
            .fail(queryFailed)

        function querySucceeded(data) {
            if (observable)
                observable(data.inlineCount);
        }
    }

    var getCurrentDeliveryAssessment = function (supplierId, observable) {
        var query = EntityQuery.from("DeliveryAssessments")
            .where("supplierId", "eq", supplierId)
            .orderBy("date desc").take(1);

        return manager.executeQuery(query)
            .then(querySucceeded)
            .fail(queryFailed)

        function querySucceeded(data) {
            if (observable) {

                var entity = data.results[0];
                observable(entity);
            }
        }
    }

    var getDeliveryAssessmentsByDateRange = function (supplierId, startDate, endDate, observable) {
        var p1 = new Predicate("supplierId", "eq", supplierId);
        var p2 = new Predicate("date", ">=", startDate);
        var p3 = new Predicate("date", "<=", endDate);
        var p4 = new Predicate("bookingInReferenceNumber", "!=", '')

        var query = EntityQuery.from("DeliveryAssessments")
            .where(p1.and(p2.and(p3)).and(p4))
            .orderBy("date desc");

        return manager.executeQuery(query)
                .then(querySucceeded)
                .fail(queryFailed)

        function querySucceeded(data) {
            if (observable) {
                observable(data.results);
            }
        }
    }

    var getDeliveryAssessmentById = function (id, observable) {

        return manager.fetchEntityByKey('DeliveryAssessment', id, true)
            .then(fetchNavigationProperties)
            .fail(queryFailed)

        function fetchNavigationProperties(data) {
            var entity = data.entity;

            return EntityQuery.fromEntities(entity)
                .expand("details")
                .using(manager).execute()
                .then(querySucceeded)
                .fail(queryFailed)
        }


        function querySucceeded(data) {
            if (observable) {
                var question_sort_desc = function (left, right) {
                    if (left.questionIndex() > right.questionIndex()) return 1;
                    if (left.questionIndex() < right.questionIndex()) return -1;
                    return 0;
                };

                var entity = data.results[0];

                entity.details.sort(question_sort_desc);

                observable(entity);
            }
        }
    };

    var getDeliveryAssessmentDetail = function (assessmentId, observable) {
        var query = EntityQuery.from("DeliveryAssessmentDetails")
            .where("assessmentId", "eq", assessmentId);

        return manager.executeQuery(query)
            .then(querySucceeded)
            .fail(queryFailed)

        function querySucceeded(data) {
            if (observable) {
                observable(data.results);
            }
        }
    }

    var getSupplier = function (id, observable) {
        var query = EntityQuery.from("Suppliers")
            .where("id", "eq", id)

        return manager.executeQuery(query)
            .then(querySucceeded)
            .fail(queryFailed)

        function querySucceeded(data) {
            if (observable) {

                var results = data.results[0];

                var date_sort_desc = function (left, right) {
                    if (left.date() > right.date()) return -1;
                    if (left.date() < right.date()) return 1;
                    return 0;
                };

                var entity = data.results[0];

                entity.assessments.sort(date_sort_desc);
                entity.deliveryAssessments.sort(date_sort_desc);

                observable(entity);
            }
        }
    }

    function queryFailed(error) {
        var msg = "Error retreiving data. '" + error.message;
        alert(msg);
    }

    return {
        getSupplier: getSupplier,
        getCurrentMonthlyAssessment: getCurrentMonthlyAssessment,
        getCurrentDeliveryAssessment: getCurrentDeliveryAssessment,
        getMonthlyAssessmentCount: getMonthlyAssessmentCount,
        getDeliveryAssessmentCount: getDeliveryAssessmentCount,
        getMonthlyAssessments: getMonthlyAssessments,
        getMonthlyAssessmentById: getMonthlyAssessmentById,
        getDeliveryAssessmentsByDateRange: getDeliveryAssessmentsByDateRange,
        getDeliveryAssessmentDetail: getDeliveryAssessmentDetail,
        getDeliveryAssessmentById: getDeliveryAssessmentById
    };

});