app.factory('authFact', ['$cookieStore', function ($cookieStore) {
    var authFact = {};

    authFact.setAccessToken = function (authToken) {
        $cookieStore.put('accessToken', authToken);
    };

    authFact.getAccessToken = function () {
        return $cookieStore.get('accessToken');
    };

    authFact.setUserObj = function (userObj) {
        $cookieStore.put('userObj', userObj);
    };

    authFact.getUserObj = function () {
        return $cookieStore.get('userObj');
    };

    authFact.clearCookies = function () {
        $cookieStore.remove('userObj');
        $cookieStore.remove('accessToken');
    };

    return authFact;
}]);