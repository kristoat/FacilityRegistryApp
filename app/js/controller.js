(function(controllers){
    'use strict';
    controllers.controller('siteController', ['$scope', '$rootScope', 'apiService',
        function($scope, $rootScope, apiService){
            $scope.content = "Hello, this is your controller speaking";

            /* Retrieve facilities asynchronous  */
            console.log(apiService);
            apiService.query(function(result){
                $scope.facilities = result.organisationUnits;
            });
        }
    ]);
})(angular.module('appControllers'));