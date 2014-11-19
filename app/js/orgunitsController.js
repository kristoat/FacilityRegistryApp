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


            $scope.onFacilityClick = function(facility) {

                apiService.getFacility(facility.id).get(function (result) {


                    console.log(result);

                    setActiveFacility(facility.name, "/#/orgunits", facility.id);
                    $scope.facilities = result.organisationUnits[0].children;
                });
            }

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
                        $scope.facilities = result.organisationUnits[0].children;
                    });
                }
            };

            $scope.showDetails = function(facility){

                var rawGeoData = facility.coordinates[0][0];
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
            };

            function getTopLevelFacilities(){
                apiService.getFacilitiesOnLevel(2).get(function (result){
                    $scope.facilities = result.organisationUnits;


                    var coordinates = JSON.parse($scope.facilities[0].coordinates)[0][0];

                    /* Retrieve the coordinates of first facility on level 2 and zoom in on the first pair of coordinates */
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