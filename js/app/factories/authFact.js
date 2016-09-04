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

    authFact.getuserObj = function () {
        var userObj = $cookieStore.get('userObj');

        if (userObj)
            return userObj;
        else
            console.log('User object not found');
    };

    return authFact;
}]);