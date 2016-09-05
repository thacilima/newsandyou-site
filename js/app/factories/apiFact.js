app.factory('apiFact', ['authFact', '$http',
    function (authFact, $http) {

        var NEWS_AND_YOU_WEBSERVICE = '//localhost:8080/NAndYWebService/rest/';

        var apiFact = {};

        var allUserLikesList = [];

        apiFact.syncFbFavoriteMusicians = function (callbackSucces, callbackError) {
            var limit = 25;
            var offset = 0;
            getUserLikes(limit, offset, callbackSucces, callbackError);
        }

        var getUserLikes = function (limit, offset, callbackSucces, callbackError) {
            FB.getLoginStatus(function (response) {
                if (response.status === 'connected') {
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
                        customUserLikesCallback(limit, offset, response, callbackSucces, callbackError);
                    });
                }
                else {
                    authFact.clearCookies();
                    $location.path("/");
                    $scope.$apply();
                }
            });
        };

        var customUserLikesCallback = function (limit, offset, response, callbackSucces, callbackError) {

            if (response[1] != null) {
                var userLikesList = JSON.parse(response[1].body);

                if (userLikesList.error == null) {
                    for (pageLikedId in userLikesList) {
                        allUserLikesList.push(userLikesList[pageLikedId]);
                    }

                    offset += limit;
                    getUserLikes(limit, offset, callbackSucces, callbackError);
                }
                else {
                    if (allUserLikesList.length > 0) {
                        var url = NEWS_AND_YOU_WEBSERVICE.concat('userModeling/modelUser');
                        var data = {
                            idUser: authFact.getUserObj().userId,
                            attributes: allUserLikesList
                        };

                        $http({
                            method: "POST",
                            url: url,
                            data: data
                        }).then(function succes(response) {

                            callbackSucces();

                        }, function error(response) {
                            callbackError();
                        });
                    }
                    else {
                        callbackSucces();
                    }
                }
            }
            else if (response[1] != null) {
                callbackError();
            }
        }

        return apiFact;

    }]);