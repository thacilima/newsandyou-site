angular.module('NewsAndYouMusicApp', [])
    .controller('NewsController', ['$http', function ($http) {
        var NEWS_AND_YOU_WEBSERVICE = 'http://localhost:8080/NAndYWebService/rest/';
        
        var indexOffset = 0;

        var newsCtrl = this;

        newsCtrl.articles = [];

        newsCtrl.hideLoadMore = false;

        newsCtrl.getAll = function () {
            var url = NEWS_AND_YOU_WEBSERVICE.concat('news/getAll');
            url = url.concat('?indexOffset=').concat(indexOffset);
            
            $http({
                method : "GET",
                url : url
            }).then(function succes(response) {
                console.log(response);
                newsCtrl.articles = newsCtrl.articles.concat(response.data);  

                if (response.data.length == 0) {
                    newsCtrl.hideLoadMore = true;
                }

            }, function error(response) {
                console.log(response);
                alert("OOPS! An error ocurred, try again later!");
            });
        };

        newsCtrl.loadMoreArticles = function() {
            indexOffset++;
            newsCtrl.getAll();
        }

        newsCtrl.getFormattedDate = function(dateString) {
            var date = new Date(dateString);
            return date.toLocaleDateString()
        }

        newsCtrl.getAll();

    }]);