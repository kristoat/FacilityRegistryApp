(function(services){
    'use strict';

    services.factory("apiService", function ($resource, $rootScope) {

        var xhReq = new XMLHttpRequest();
        xhReq.open("GET", "manifest.webapp", false);
        xhReq.send(null);

        var serverResponse = JSON.parse(xhReq.responseText);
        $rootScope.dhisAPI = serverResponse.activities.dhis.href;


        return {

            getFacilitiesOnLevel: function(level){

                return $resource(

                    $rootScope.dhisAPI + '/api/geoFeatures',
                    {
                        "ou" : "ou:LEVEL-" + level
                    },
                    {
                    }
                );

            },

            getFacilitiesWithParent: function(parent){
                return $resource(

                $rootScope.dhisAPI + '/api/geoFeatures.json',
                {
                    "ou" : "ou:LEVEL-" + (parent.le + 1) + ";" + parent.id
                },
                {
                }
                );

            },

            getAllFacilities: function(){
                return $resource(


                    $rootScope.dhisAPI + '/api/organisationUnits',
                    {
                        // If you're passing variables, for example into the URL
                        // they would be here and then as :varName in the URL
                    },
                    {
                        'query' : {
                            isArray : false
                        }
                    }
                );
            }
        }


    });
})(angular.module('appServices'));