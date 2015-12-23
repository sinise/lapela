var lapelaControllers = angular.module('lapelaControllers', []);

lapelaControllers.controller('laepalController', function ($scope, $http) {

});


lapelaControllers.controller('UserController', function ($scope, $http) {
    // when submitting the add form, send the text to the node API
    $scope.registerUser = function() {
        $http.post('./users/updateUser', $scope.formData)
            .success(function (data, response) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.response = response;
                $scope.data = data;
				$http.get("./users/getAllUsers")
        			.success(function (response) {
            			$scope.Users = response;
        			});
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    $scope.authenticateUser = function() {
        $http.post('./users/authenticate', $scope.formData)
            .success(function (data, response) {
                $scope.response = response;
                $scope.data = data;
                //if login was successfull add received token to all headers
                if(data.success){
                    $http.defaults.headers.common = { token : data.token }
                }
                $http.get("./users/getAllUsers")
                    .success(function (response) {
                        $scope.Users = response;
                    });
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
});

lapelaControllers.controller('GetUserController', function ($scope, $http) {
    
    $http.get("./users/getAllUsers")
        .success(function (response) {
            $scope.Users = response;
            //This part check if the tokken is set. This is not a security thing
            //but is used to modify layout depending on visitor is loggged in or not
            if ($http.defaults.headers.common.token){
                $scope.Logedin = true;
                $scope.token = $http.defaults.headers.common.token;
            } else{
                $scope.Logedin = false;
            }

        });

});

