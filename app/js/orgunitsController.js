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

                apiService.getFacilitiesWithParent(facility).query(function(result){

                    var name = facility.na || facility.name;
                    var level = facility.le || facility.level;

                    setActiveFacility(name, "/#/orgunits", facility.id, level);
                    $scope.facilities = result;
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

                    console.log("navitem", navItem);
                    apiService.getFacilitiesWithParent(navItem).query(function(result){
                        console.log(result);
                        $scope.facilities = result;
                    });
                }
            };

            $scope.showDetails = function(facility){

                var rawGeoData = JSON.parse(facility.coordinates || facility.co)[0][0];
                $scope.selectedFacility = facility;

                var coords = [];
                for(var i = 0; i < rawGeoData.length; i++){
                    var x = rawGeoData[i][0];
                    var y = rawGeoData[i][1];
                    coords.push({latitude : y, longitude : x});
                }

                $scope.polygons = [ {
                    id: 1,
                    path:coords,
                    stroke: {
                        color: '#6060FB',
                        weight: 3
                    },
                    editable: true,
                    draggable: false,
                    geodesic: false,
                    visible: true,
                    fill: {
                        color: '#ff0000',
                        opacity: 0.8
                    }
                }];
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
                    le : level
                };

                $scope.navItems.push(navItem);
            };

            function getTopLevelFacilities(){
                apiService.getFacilitiesOnLevel(2).query(function (result){
                    $scope.facilities = result;

                    /* Retrieve the coordinates of first facility on level 2 and zoom in on the first pair of coordinates */
                    var coordinates = JSON.parse($scope.facilities[0].co)[0][0];
                    $scope.map = { center: { latitude: coordinates[0][1], longitude: coordinates[0][0]}, zoom: 8 };
                });
            };

            GoogleMapApi.then(function() {
                $scope.modalMap = {
                    center: {
                        latitude: 7.4434,
                        longitude: -12.4815
                    },
                    zoom: 8,
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