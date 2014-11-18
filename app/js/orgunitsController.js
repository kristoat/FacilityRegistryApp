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
                   console.log($scope.facilities);
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

            $scope.showDetails = function(facility){
                console.log(facility);
                $scope.selectedFacility = facility;
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

})(angular.module('appControllers'));