(function(services){
    'use strict';

    services.factory("geoService", function ($resource, $rootScope) {

        return $resource(

            $rootScope.dhisAPI + '/api/geoFeatures',
            {
                "ou" : "ou:LEVEL-2"
            },
            {
            }
        );

    });
})(angular.module('appServices'));