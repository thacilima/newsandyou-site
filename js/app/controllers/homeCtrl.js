app.controller('HomeCtrl', ["$scope", "$rootScope", "$location", "authFact" "$http",
    function ($scope, $rootScope, $location, authFact, $http) {

        var NEWS_AND_YOU_WEBSERVICE = '//localhost:8080/NAndYWebService/rest/';

        var userId = "";
        var allUserLikesList = [];

        $scope.hideLoading = true;

        $scope.goToNews = function () {
            $scope.hideLoading = true;
            $location.path('/news');
        }

        $scope.loginError = function() {
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

                                userId = response.data.idUser;

                                // Setting the user object
                                userObj.userId = response.data.idUser;
                                authFact.setUserObj(userObj);

                                // Setting the access token
                                var fbAccessToken = FB.getAuthResponse().accessToken;
                                authFact.setAccessToken(fbAccessToken);

                                var limit = 25;
                                var offset = 0;
                                getUserLikes(limit, offset, customUserLikesCallback);

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

        var getUserLikes = function (limit, offset, callback) {
            FB.api('/', 'POST', {
                batch: [
                    {
                        method: "GET",
                        name: "get-music-likes",
                        relative_url: "me/music?limit=" + limit + "&offset=" + offset
                    },
                    {
                        method: "GET",
                        relative_url: "?ids={result=get-music-likes:$.data.*.id}&fields=link"
                    }
                ]
            }, function (response) {
                customUserLikesCallback(limit, offset, response)
            });
        };

        var customUserLikesCallback = function (limit, offset, response) {

            if (response[1] != null) {
                var userLikesList = JSON.parse(response[1].body);

                if (userLikesList.error == null) {
                    for (pageLikedId in userLikesList) {
                        allUserLikesList.push(userLikesList[pageLikedId]);
                    }

                    offset += limit;
                    getUserLikes(limit, offset, customUserLikesCallback);
                }
                else {
                    if (allUserLikesList.length > 0) {
                        var url = NEWS_AND_YOU_WEBSERVICE.concat('userModeling/modelUser');
                        var data = {
                            idUser: userId,
                            attributes: allUserLikesList
                        };

                        $http({
                            method: "POST",
                            url: url,
                            data: data
                        }).then(function succes(response) {

                            $scope.goToNews();

                        }, function error(response) {
                            $scope.goToNews();
                        });
                    }
                    else {
                        $scope.goToNews()
                    }
                }
            }
            else if (response[1] != null) {
                $scope.goToNews();
            }
        }

    }]);