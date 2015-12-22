
var lapelaApp = angular.module('lapelaApp', [
    'ngStorage',
    'ngRoute',
    'angular-loading-bar',
    'lapelaControllers'
]);

lapelaApp.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $routeProvider.
        when('', {
            templateUrl: 'partials/carousel.html',
        }).when('/kontakt', {
            templateUrl: 'partials/kontakt.html',
            controller: 'lapelaControler'
        }).
        otherwise({
            redirectTo: '/'
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


