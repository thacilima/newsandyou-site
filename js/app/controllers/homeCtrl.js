app.controller('HomeCtrl', ["$scope", "$location", "authFact", "$cookieStore",
    function ($scope, $location, authFact, $cookieStore) {

        $scope.hideLoading = true;

        $scope.fbLogin = function () {
            $scope.hideLoading = false;
            
            FB.login(function (response) {
                if (response.status === 'connected') {

                    console.log('Welcome!  Fetching your information.... ');

                    FB.api('/me?fields=id,name,email,link', function (response) {
                        // Setting the user object
                        $cookieStore.put('userObj', response);

                        // Get the access token
                        var fbAccessToken = FB.getAuthResponse().accessToken;
                        console.log('access token', fbAccessToken);
                        authFact.setAccessToken(fbAccessToken);

                        FB.api('/', 'POST', {
                            batch: [
                                {
                                    method: "GET",
                                    name: "get-music-likes",
                                    relative_url: "me/music?limit=25&offset=0"
                                },
                                {
                                    method: "GET",
                                    relative_url: "?ids={result=get-music-likes:$.data.*.id}&fields=link"
                                }
                            ]
                        }, function (response) {
                            console.log(response);

                            $location.path('/news');
                            $scope.$apply();
                        });



                    });

                } else if (response.status === 'not_authorized') {
                    // The person is logged into Facebook, but not your app.
                } else {
                    // The person is not logged into Facebook, so we're not sure if
                    // they are logged into this app or not.
                }
            }, { scope: 'public_profile,email,user_likes' });


        };
    }]);