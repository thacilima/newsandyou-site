app.controller('NewsCtrl', ["$scope", "$http",
    function ($scope, $http) {
        var NEWS_AND_YOU_WEBSERVICE = 'http://localhost:8080/NAndYWebService/rest/';
        // var NEWS_AND_YOU_WEBSERVICE = 'http://demo7633828.mockable.io/';
        var indexOffset = 0;

        $scope.articles = [];

        $scope.hideLoadMore = false;

        $scope.getAll = function () {
            var url = NEWS_AND_YOU_WEBSERVICE.concat('news/getAll');
            url = url.concat('?indexOffset=').concat(indexOffset);

            $http({
                method: "GET",
                url: url
            }).then(function succes(response) {
                console.log(response);
                $scope.articles = $scope.articles.concat(response.data);

                if (response.data.length == 0) {
                    $scope.hideLoadMore = true;
                }

            }, function error(response) {
                console.log(response);
                alert("OOPS! An error ocurred, try again later!");
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