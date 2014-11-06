(function(controllers){
    'use strict';
    controllers.controller('siteController', ['$scope', '$rootScope', 'apiService', 'geoService',
        function($scope, $rootScope, apiService, geoService){
            $scope.content = "Hello, this is your controller speaking";

            /* Retrieve facilities asynchronous  */
            apiService.query(function(result){
                $scope.facilities = result.organisationUnits;

            });

            geoService.query(function(result){
                $scope.topFacilities = result;
            });
        }
    ]);

    controllers.controller('listViewController', ['$scope',
        function($scope) {

            $scope.isHierarchy = true;

            $scope.show_hierarchy = function(){
                $scope.isHierarchy = true;
            };

            $scope.hide_hierarchy = function(){
                $scope.isHierarchy = false;
            };


        }
    ]);

})(angular.module('appControllers'));