angular.module('NewsAndYouMusicApp', [])
    .run(['$rootScope', '$window', 'srvAuth',
        function ($rootScope, $window, sAuth) {

            $rootScope.user = {};

            $window.fbAsyncInit = function () {
                // Executed when the SDK is loaded
                FB.init({

                    appId: '706477659481891',
                    /*
                     Adding a Channel File improves the performance
                     of the javascript SDK, by addressing issues
                     with cross-domain communication in certain browsers.
                    */
                    channelUrl: 'chanel.html',
                    /*
                     Set if you want to check the authentication status
                     at the start up of the app
                    */
                    status: true,
                    /*
                     Enable cookies to allow the server to access
                     the session
                    */
                    cookie: true,
                    /* Parse XFBML */
                    xfbml: true
                });

                sAuth.watchAuthenticationStatusChange();
            };

            (function (d) {
                // load the Facebook javascript SDK
                var js,
                    id = 'facebook-jssdk',
                    ref = d.getElementsByTagName('script')[0];

                if (d.getElementById(id)) {
                    return;
                }

                js = d.createElement('script');
                js.id = id;
                js.async = true;
                js.src = "//connect.facebook.net/en_US/all.js";

                ref.parentNode.insertBefore(js, ref);

            } (document));

        }]);