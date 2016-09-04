app.config(["$routeProvider", function($routeProvider) {
	$routeProvider

		.when("/", {
			templateUrl : 'views/home.html',
			controller : 'HomeCtrl'
		})
		// .when("/login", {
		// 	templateUrl : 'login.html',
		// 	controller : 'LoginCtrl'
		// })
		.when('/news', {
			templateUrl : 'views/news.html',
			controller : 'NewsCtrl',
			authenticated: false
		})
		.otherwise('/', {
			templateUrl : 'views/home.html',
			controller : 'HomeCtrl'
		});
}]);

app.run(["$rootScope", "$location", "authFact", function($rootScope, $location, authFact) {
	$rootScope.$on('$routeChangeStart', function(event, next, current) {

		/*If route is authenticated then check if the user has access token, else return to login screen*/
		if (next.$$route.authenticated) {
			var userAuth = authFact.getAccessToken();
			if (!userAuth) {
				$location.path("/");
			}
		}
	});
}]);