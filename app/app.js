(function(angular){
    'use strict';

    /* Define modules */
    angular.module('appServices', ['ngResource']);
    angular.module('appControllers', ['appServices', 'google-maps'.ns()]);

    /* Define the app */
    var app = angular.module('app', [
        'ngRoute',
        'appControllers'
    ]);

    /* Enable CORS */
    app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }]);

    /* Google maps */
    app.config(['GoogleMapApiProvider'.ns(), function (GoogleMapApi) {
        GoogleMapApi.configure({
            //    key: 'your api key',
            v: '3.17',
            libraries: 'weather,geometry,visualization'
        });
    }])

    /* Config routes */
    app.config(['$routeProvider',
        function($routeProvider){
            $routeProvider.when('/orgunits/:query', {
                templateUrl : 'views/orglist.html',
                controller : 'orgunitsController'
            }).otherwise({
                redirectTo: '/orgunits/top'
            });
        }
    ]);

})(angular);