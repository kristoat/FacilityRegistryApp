(function (controllers) {
    'use strict';
    controllers.controller('orgunitsController', ['$scope', '$routeParams', 'apiService',
        function ($scope, $routeParams, apiService) {

            $scope.navItems = [];
            setActiveFacility("Top level", "#/orgunits/all", undefined);

            if($routeParams.query === 'top'){
                getTopLevelFacilities();
            }else {
                apiService.getAllFacilities().query(function (result) {
                    $scope.facilities = result;
                });
            }

            $scope.onFacilityClick = function(facility){
               apiService.getFacility(facility.id).get(function(result){
                   setActiveFacility(result.name, "/#/orgunits", facility.id);
                   $scope.facilities = result.children;
               });
            };

            $scope.onNavItemClick = function(navItem){
                function removeNestedItems() {
                    for (var i = 0; i < $scope.navItems.length; i++) {
                        if ($scope.navItems[i] === navItem) {
                            $scope.navItems = $scope.navItems.slice(0, i + 1);
                            break;
                        }
                    }
                }
                removeNestedItems();
                navItem.active = true;

                if(navItem.id === undefined){
                    getTopLevelFacilities();
                }else {
                    apiService.getFacility(navItem.id).get(function(result){
                        $scope.facilities = result.children;
                    });
                }
            };

            function setActiveFacility(text, href, id){
                for(var i = 0; i < $scope.navItems.length; i++){
                    $scope.navItems[i].active = false;
                }
                var navItem = {
                    text : text,
                    href : href,
                    active : true,
                    id : id
                };

                $scope.navItems.push(navItem);
            }

            function getTopLevelFacilities(){
                apiService.getFacilitiesOnLevel(2).query(function (result) {
                    $scope.facilities = result;
                });
            }
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