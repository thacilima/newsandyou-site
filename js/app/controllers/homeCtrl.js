app.controller('HomeCtrl', ["$scope", "$rootScope", "$location", "authFact", "apiFact", "$http",
    function ($scope, $rootScope, $location, authFact, apiFact, $http) {

        var NEWS_AND_YOU_WEBSERVICE = '//localhost:8080/NAndYWebService/rest/';

        $scope.authFact = authFact;

        $scope.hideLoading = true;

        $scope.goToNews = function () {
            $scope.hideLoading = true;
            $location.path('/news');
        }

        $scope.loginError = function () {
            $scope.hideLoading = true;
        }

        $scope.fbLogin = function () {
            $scope.hideLoading = false;

            FB.login(function (response) {
                if (response.status === 'connected') {

                    FB.api('/me?fields=id,name,email,link', function (response) {

                        if (response.id != null) {

                            // Setting the user object
                            var userObj = {
                                userFbId: response.id,
                                email: response.email,
                                name: response.name
                            };

                            var url = NEWS_AND_YOU_WEBSERVICE.concat('userModeling/loginCreatingUserIfNeeded');
                            var data = {
                                email: response.email,
                                name: response.name,
                                fbUri: response.link
                            };

                            $http({
                                method: "POST",
                                url: url,
                                data: data
                            }).then(function succes(response) {

                                // Setting the user object
                                userObj.userId = response.data.idUser;
                                authFact.setUserObj(userObj);

                                // Setting the access token
                                var fbAccessToken = FB.getAuthResponse().accessToken;
                                authFact.setAccessToken(fbAccessToken);

                                var limit = 25;
                                var offset = 0;
                                apiFact.syncFbFavoriteMusicians(
                                    function () {
                                        $scope.goToNews();
                                    },
                                    function () {
                                        $scope.goToNews();
                                    });

                            }, function error(response) {
                                $scope.loginError();
                            });
                        }
                        else {
                            $scope.loginError();
                        }
                    });

                } else if (response.status === 'not_authorized') {
                    // The person is logged into Facebook, but not your app.
                    $scope.loginError();
                } else {
                    // The person is not logged into Facebook, so we're not sure if
                    // they are logged into this app or not.
                    $scope.loginError();
                }
            }, { scope: 'public_profile,email,user_likes' });
        };

    }]);