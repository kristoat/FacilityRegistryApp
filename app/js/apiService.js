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
                    $rootScope.dhisAPI + '/api/organisationUnits',
                    {
                        level: level,
                        fields: "id,name,coordinates"
                    },
                    {
                        'query': {
                            isArray: false
                        }
                    }
                );
            },

            getFacility: function (id) {

                return $resource(
                    $rootScope.dhisAPI + '/api/organisationUnits/', {
                        filter: "id:eq:" + id,
                        fields: "id,name,children[id,name,coordinates]"
                    }, {
                        'query': {
                            isArray: false
                        }
                    }
                );
            }
        }
    });
})(angular.module('appServices'));