(function(controllers){
    'use strict';
    controllers.controller('siteController', ['$scope', 'apiService',
        function($scope, apiService){
            $scope.content = "Hello, this is your controller speaking";

            /* Retrieve facilities asynchronous  */
            apiService.getFacilities().then(function(result){
                $scope.facilities = result;
            });
        }
    ]);
})(angular.module('appControllers'));