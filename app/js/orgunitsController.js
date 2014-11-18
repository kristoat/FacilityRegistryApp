(function (controllers) {
    'use strict';
    controllers.controller('orgunitsController', ['$scope', '$routeParams', 'apiService', 'GoogleMapApi'.ns(),
        function ($scope, $routeParams, apiService, GoogleMapApi) {

            $scope.navItems = [];
            setActiveFacility("Top level", "#/orgunits/all", undefined, undefined);

            if($routeParams.query === 'top'){
                getTopLevelFacilities();
            }else {
                apiService.getAllFacilities().query(function (result) {
                    $scope.facilities = result;
                });
            }

            $scope.onFacilityClick = function(facility){

                console.log(facility);
                var level = parseInt(facility.properties.level) + 1;

                apiService.getFacilitiesWithParent(facility.id, level).query(function(result){

                    setActiveFacility(facility.properties.name, "/#/orgunits", facility.id, facility.properties.level);
                    $scope.facilities = result.features;
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

                    var level = parseInt(navItem.level) + 1;
                    console.log("navitem", navItem);

                    apiService.getFacilitiesWithParent(navItem.id, level).query(function(result){
                        console.log(result);
                        $scope.facilities = result.features;
                    });
                }
            };

            $scope.showDetails = function(facility){
                $scope.selectedFacility = facility;
            };

            function setActiveFacility(text, href, id, level){
                for(var i = 0; i < $scope.navItems.length; i++){
                    $scope.navItems[i].active = false;
                }
                var navItem = {
                    text : text,
                    href : href,
                    active : true,
                    id : id,
                    level : level
                };

                $scope.navItems.push(navItem);
            };

            function getTopLevelFacilities(){
                apiService.getFacilitiesOnLevel(2).get(function (result){
                    $scope.facilities = result.features;

                    var coordinates = result.features[0].geometry.coordinates[0][0];
                    /* Retrieve the coordinates of first facility on level 2 and zoom in on the first pair of coordinates */
                    $scope.map = { center: { latitude: coordinates[0][1], longitude: coordinates[0][0]}, zoom: 8 };
                });
            };

            GoogleMapApi.then(function() {
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