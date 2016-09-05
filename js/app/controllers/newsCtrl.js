app.controller('NewsCtrl', ["$scope", "authFact", "$http",
    function ($scope, authFact, $http) {
        var NEWS_AND_YOU_WEBSERVICE = '//localhost:8080/NAndYWebService/rest/';

        var indexOffset = 0;

        $scope.articles = [];

        $scope.hideLoadMore = false;

        $scope.hideNoArticles = true;

        $scope.hideError = true;

        $scope.getAll = function () {
            var url = NEWS_AND_YOU_WEBSERVICE.concat('news/getAll');
            url = url.concat('?indexOffset=').concat(indexOffset);
            url = url.concat('&loggedUserId=').concat(authFact.getUserObj().userId);

            $http({
                method: "GET",
                url: url
            }).then(function succes(response) {

                $scope.articles = $scope.articles.concat(response.data);

                if (response.data.length == 0) {
                    $scope.hideLoadMore = true;

                    if ($scope.articles.length == 0) {
                        $scope.hideNoArticles = false;
                    }
                }

                $scope.hideError = true;

            }, function error(response) {
                if ($scope.articles.length == 0) {
                    $scope.hideError = false;
                }
            });
        };

        $scope.loadMoreArticles = function () {
            indexOffset++;
            $scope.getAll();
        }

        $scope.getFormattedDate = function (dateString) {
            var date = new Date(dateString);
            return date.toLocaleDateString()
        }

        $scope.getAll();

    }]);