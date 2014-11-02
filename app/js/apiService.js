(function(services){
    'use strict';
    services.factory('apiService', ['$q',
        function($q){
            return {
                getFacilities : function(){
                    return $q(function(resolve, reject){
                        /* Fake response */
                        resolve([{name : "Ullevåll", short :'u'}, {name : 'Rikshospitalet', short: 'r'}]);
                    });
                }
            }
        }]);
})(angular.module('appServices'));