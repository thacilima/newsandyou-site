var app = angular.module('NewsAndYouMusicApp', ['ngRoute', 'ngCookies']);

window.fbAsyncInit = function() {
    FB.init({
        appId      : '706477659481891',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.5'
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
    // FB init
}(document, 'script', 'facebook-jssdk'));