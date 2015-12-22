
var lapelaApp = angular.module('lapelaApp', [
    'ngStorage',
    'ngRoute',
    'angular-loading-bar',
    'lapelaControllers'
]);

lapelaApp.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $routeProvider.
        when('/home', {
            templateUrl: 'partials/lapela.html',
            controller: 'lapelaControler'
        }).when('/kontakt', {
            templateUrl: 'partials/kontakt.html',
            controller: 'lapelaControler'
        }).
        otherwise({
            redirectTo: '/home'
        });



    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                if ($localStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $localStorage.token;
                }
                return config;
            },
            'responseError': function(response) {
                if(response.status === 401 || response.status === 403) {
                    $location.path('/authentication');
                }
                return $q.reject(response);
            }
        };
    }]);

}]);


