(function (controllers) {
    'use strict';

    controllers.controller('facilityController', ['$scope', 'apiService',
        function ($scope, apiService) {
            console.log($scope.selectedFacility );
        }
    ]);

})(angular.module('appControllers'));