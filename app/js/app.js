(function(angular){
    'use strict';

    /* Define modules */
    angular.module('appServices', ['ngResource']);
    angular.module('appControllers', ['appServices']);

    /* Define the app */
    var app = angular.module('app', [
        'appControllers'
    ]);

})(angular);