(function (controllers) {
    'use strict';
    controllers.controller('siteController', ['$scope', '$rootScope', 'apiService',
        function ($scope, $rootScope, apiService) {
            $scope.content = "Hello, this is your controller speaking";

            $scope.getFacilitiesOnLevel = function (level) {
                apiService.getFacilitiesOnLevel(level).query(function (result) {
                    $scope.topFacilities = result;
                });
            };

            /* Retrieve facilities asynchronous  */
            apiService.getAllFacilities().query(function (result) {
                $scope.facilities = result.organisationUnits;
            });

            $scope.getFacilitiesOnLevel(2);
        }
    ]);

    controllers.controller('listViewController', ['$scope', 'apiService',
        function ($scope, apiService) {

            $scope.isHierarchy = true;

            $scope.showHierarchy = function () {
                $scope.isHierarchy = true;
            };

            $scope.hideHierarchy = function () {
                $scope.isHierarchy = false;
            };

            $scope.chooseFacility = function (facility) {
                $scope.chosenFacility = facility;

                apiService.getFacilitiesWithParent(facility).query(function (result) {
                    $scope.topFacilities = result;
                });
            };
        }
    ]);

})(angular.module('appControllers'));