app.controller('MainCtrl', ["$scope", "authFact", "apiFact", "$location", "$window",
    function ($scope, authFact, apiFact, $location, $window) {

        $scope.authFact = authFact;

        $scope.goToHome = function () {
            $location.path('/');
        }

        $scope.fbLogout = function () {
            FB.getLoginStatus(function (response) {
                if (response.status === 'connected') {
                    FB.logout(function (response) {
                        // User is now logged out
                        authFact.clearCookies();
                        $location.path("/");
                        $scope.$apply();
                    });
                }
                else {
                    authFact.clearCookies();
                    $location.path("/");
                    $scope.$apply();
                }
            });
        };

        $scope.syncFacebookData = function () {
            apiFact.syncFbFavoriteMusicians(
                function () {
                    $window.location.reload();
                },
                function () {
                    alert("OOPS! An error ocurred, please try again later!");
                });
        }
    }]);