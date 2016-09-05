app.factory('authFact', ['$cookieStore', function ($cookieStore) {
    var authFact = {};

    this.authToken = null;

    authFact.setAccessToken = function(authToken) {
        $cookieStore.put('accessToken', authToken);
    };

    authFact.getAccessToken = function() {
        authFact.authToken = $cookieStore.get('accessToken');
        return authFact.authToken;
    };

    authFact.setUserObj = function(userObj) {
        $cookieStore.put('userObj', userObj);
    };

    authFact.getUserObj = function () {
        var userObj = $cookieStore.get('userObj');

        if (userObj)
            return userObj;

        return null;
    };

    return authFact;
}]);