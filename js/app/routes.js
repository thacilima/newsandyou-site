app.config(["$routeProvider", function($routeProvider) {
	$routeProvider

		.when("/", {
			templateUrl : 'views/home.html',
			controller : 'HomeCtrl',
			authenticated: false
		})
		.when('/news', {
			templateUrl : 'views/news.html',
			controller : 'NewsCtrl',
			authenticated: true
		})
		.otherwise('/', {
			templateUrl : 'views/home.html',
			controller : 'HomeCtrl',
			authenticated: false
		});
}]);

app.run(["$rootScope", "$location", "authFact", function($rootScope, $location, authFact) {
	$rootScope.$on('$routeChangeStart', function(event, next, current) {

		// If route is authenticated then check if the user has access token, else return to login screen
		if (next.$$route.authenticated) {
			var userAuth = authFact.getAccessToken();
			if (!userAuth) {
				$location.path("/");
			}
		}
	});
}]);