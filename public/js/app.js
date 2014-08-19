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


		$rootScope.$on('$viewContentLoaded', function () {
			$(document).foundation();
		});
	});

	app.controllers.controller('mainCtrl', function ($scope, Facebook, $rootScope) {

		$scope.sectors = [
			{
				name: 'La Mosca Loca',
				img: 'img/depo/la_mosca_min.jpg',
				style: 'Sport Climbing',
				desc: 'Sector de escalada cercano a la ciudad con rutas de excelente calidad.Sector de escalada cercano a la ciudad con rutas de excelente calidad.',
				cords: {
					lat: -54.7972,
					lng: -68.2052
				},
				sectorId: 0
			},
			{
				name: 'Piedra Barco',
				img: 'img/depo/piedra_barco_min.jpg',
				style: 'Sport Climbing',
				desc: 'Excelente sector de boulder. Cuenta con problemas desde V4 a V9 y varios proyectos sin encadenar',
				cords: {
					lat: -54.7303,
					lng: -67.9316
				},
				sectorId: 1
			},
			{
				name: 'Tres bolas',
				img: 'img/depo/la_mosca_min.jpg',
				style: 'Sport Climbing',
				desc: 'Pequeño sector a 5 minutos de la ruta',
				cords: {
					lat: -54.7442,
					lng: -68.1922
				},
				sectorId: 2
			},
		];

		$scope.climbingStyles = [
			{
				name: 'Trad Climbing'
			},
			{
				name: 'Sport Climbing'
			},
			{
				name: 'Ice Climbing'
			},
			{
				name: 'Trekking'
			}
		];

		$scope.login = function () {
			event.preventDefault();
			Facebook.login().then(function () {
				Facebook.getUserInfo().then(function (me){
					$rootScope.setCurrentUser(me.name);
					$rootScope.loggedIn = true;
				});
			});
		};
	});

	app.controllers.controller('newSectorCtrl', function ($scope, $log) {
		$scope.form = {
			coords: {
				latitude: -54.77336558,
				longitude: -68.203125
			}
		}
		$scope.map = {
			center: {
				latitude: -54.77336558,
				longitude: -68.203125
			},
			zoom: 11,
			options: {
				disableDefaultUI: true,
				mapTypeId: google.maps.MapTypeId.SATELLITE
			}
		};

		$scope.marker = {
			id: 0,
			cords: {
				latitude: -54.77336558,
				longitude: -68.203125
			},
			options: {
				draggable: true
			},
			events: {
				dragend: function (marker, eventName, args) {
					$scope.$apply(function(){
						$scope.form.coords.latitude = marker.getPosition().lat();
						$scope.form.coords.longitude = marker.getPosition().lng();
					});
				}
			}
		}
		$scope.stage = 1;

		$scope.changeStage = function () {
			event.preventDefault();
			$scope.stage = 2;
		};
	});

	app.factory("Facebook", function ($q, $rootScope) {
		return {

			login: function () {
				var deferred = $q.defer();

				FB.login(function (response){
					if (response && !response.error) {
						$rootScope.$apply(function () {
							deferred.resolve(response);
						});
					} else {
						deferred.rejected(response.error.message);
					}
				});

				return deferred.promise;
			},

			getLoginStatus: function () {
				var deferred = $q.defer();

				FB.getLoginStatus(function (response){
					if (response && !response.error) {
						$rootScope.$apply(function(){
							deferred.resolve(response);
						});
					} else {
						deferred.rejected(response.error.message);
					}
				});

				return deferred.promise;
			},

			getUserInfo: function () {
				var deferred = $q.defer();

				FB.api('/me', function (response){
					if (response && !response.error) {
						$rootScope.$apply(function () {
							deferred.resolve(response);
						});
					} else {
						deferred.rejected(response.error.message);
					}
				});

				return deferred.promise;
			}
		}
	});

})();
