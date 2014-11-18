(function (services) {
    'use strict';

    services.factory("apiService", function ($resource, $rootScope) {

        var xhReq = new XMLHttpRequest();
        xhReq.open("GET", "manifest.webapp", false);
        xhReq.send(null);

        var serverResponse = JSON.parse(xhReq.responseText);
        $rootScope.dhisAPI = serverResponse.activities.dhis.href;


        return {

            getFacilitiesOnLevel: function (level) {

                return $resource(
                    $rootScope.dhisAPI + '/api/geoFeatures.json',
                    {
                        ou: "ou:LEVEL-" + level
                    }, {}
                );
            },

            getAllFacilities: function () {
                return $resource(
                    $rootScope.dhisAPI + '/api/organisationUnits',
                    {
                        // If you're passing variables, for example into the URL
                        // they would be here and then as :varName in the URL
                    },
                    {
                        'query': {
                            isArray: false
                        }
                    }
                );
            },

            getFacilitiesWithParent: function (parent) {

                console.log("parent", parent);
                var level = (parent.level || parent.le) + 1;


                return $resource(
                    $rootScope.dhisAPI + '/api/geoFeatures.json',
                    {
                        "ou": "ou:LEVEL-" + level + ";" + parent.id
                    },
                    {}
                );
            }
        }
    });
})(angular.module('appServices'));