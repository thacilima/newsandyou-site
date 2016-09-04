app.controller('HomeCtrl', ["$scope", "$location", "authFact", "$cookieStore",
    function ($scope, $location, authFact, $cookieStore) {
        $scope.FBLogin = function () {
            $location.path('/news');
        };
    }]);