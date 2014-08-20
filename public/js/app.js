(function() {
	'use strict';

	window.app = window.app || {};

	app = angular.module('app', [
		'ngRoute',
		'controllers',
		'directives',
		'services',
		'google-maps'
	]);

	app.controllers = angular.module('controllers', []);
	app.directives  = angular.module('directives', []);
	app.services    = angular.module('services', []);

	app.config(function ($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'templates/home.html',
			controller : 'mainCtrl'
		});

		$routeProvider.when('/new-sector', {
			templateUrl: 'templates/new-sector.html',
			controller : 'newSectorCtrl'
		});

		$routeProvider.otherwise({redirectTo: '/'});
	});


	app.run(function ($rootScope, $location, Facebook, $window) {
		var routesThatRequiereAuth = ["/"];

		$rootScope.currentUser = null;
		$rootScope.loggedIn = false;

		$rootScope.setCurrentUser = function (user) {
			$rootScope.currentUser = user;
		};

		$window.fbAsyncInit = function () {
	        FB.init({
	            appId:'338693356288487',
	            status:true,
	            cookie:true,
	            xfbml:true
	        });

	        FB.getLoginStatus(function (response){
	        	if (response.status == 'connected') {
	        		Facebook.getUserInfo().then(function (me) {
	        			$rootScope.currentUser = me.name;
	        			$rootScope.loggedIn = true;
	        		});
	        	} else {
	        	}
	        });
	    };


	    (function (d) {
	        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
	        if (d.getElementById(id)) {
	            return;
	        }
	        js = d.createElement('script');
	        js.id = id;
	        js.async = true;
	        js.src = "//connect.facebook.net/en_US/all.js";
	        ref.parentNode.insertBefore(js, ref);
	    }(document));

	});

})();
