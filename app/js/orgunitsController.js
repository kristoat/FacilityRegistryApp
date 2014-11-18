(function (controllers) {
    'use strict';
    controllers.controller('orgunitsController', ['$scope', '$routeParams', 'apiService', 'GoogleMapApi'.ns(),
        function ($scope, $routeParams, apiService, GoogleMapApi) {

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
                apiService.getFacilitiesOnLevel(2).query(function (result){
                    $scope.facilities = result.organisationUnits;
                });
            }

            GoogleMapApi.then(function() {

                $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 2 };
                $scope.modalMap = {
                    center: {
                        latitude: 45,
                        longitude: -73
                    },
                    zoom: 2,
                    events: {
                        tilesloaded: function (map) {
                            $scope.$apply(function () {
                                google.maps.event.trigger(map, "resize");
                            });
                        }
                    }
                }
            });
        }
    ]);

})(angular.module('appControllers'));