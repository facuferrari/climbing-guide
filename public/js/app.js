(function() {
	'use strict';

	window.app = window.app || {};

	app = angular.module('app', [
		'ngRoute',
		'controllers',
		'directives',
		'services'
	]);

	app.controllers = angular.module('controllers', []);
	app.directives  = angular.module('directives', []);
	app.services    = angular.module('services', []);

	app.config(function ($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'templates/home.html',
			controller : 'mainCtrl'
		});

		$routeProvider.otherwise({redirectTo: '/'});
	});

	app.run(function ($rootScope) {
		$rootScope.$on('$viewContentLoaded', function () {
			$(document).foundation();
		});
	});

	app.controllers.controller('mainCtrl', function ($scope) {
		$scope.sectors = [
			{
				name: 'La mosca',
				img: 'img/depo/la_mosca_min.jpg',
				style: 'Sport Climbing',
				desc: 'Sector de escalada cercano a la ciudad con rutas de excelente calidad.'
			},
			{
				name: 'Piedra Barco',
				img: 'img/depo/piedra_barco_min.jpg',
				style: 'Sport Climbing',
				desc: 'Excelente sector de boulder. Cuenta con problemas desde V4 a V9 y varios proyectos sin encadenar'
			},
			{
				name: 'Olum',
				img: 'img/depo/olum_min.jpg',
				style: 'Sport Climbing',
				desc: 'Aunque algo más lejos que el resto este sector cuenta con vías de excelente calidad con grados que van del 5+ al 7C+'
			},
			{
				name: 'Tres bolas',
				img: 'img/depo/la_mosca_min.jpg',
				style: 'Sport Climbing',
				desc: ''
			},
			{
				name: 'Ensenada',
				img: 'img/depo/la_mosca_min.jpg',
				style: 'Sport Climbing',
				desc: ''
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
	});

	app.directives.directive('gmap', function () {

		function Controller ($scope) {

			var init = function () {
				$scope.map.MapInstance = new google.maps.Map(document.getElementById('map'), scope.map.Options);
			}

			return {
				init: init
			}
		}

		function LinkFn (scope, iElement, iAttrs, Ctrl) {
			scope.map = {
				Options: {
					center          : new google.maps.LatLng(iAttrs.lat, iAttrs.lng),
					zoom            : 11,
					disableDefaultUI: true,
					mapTypeId       : google.maps.MapTypeId.SATELLITE
				},
				MapInstance: null
			}

			scope.map.MapInstance = new google.maps.Map(document.getElementById('map'), scope.map.Options);
		}

		return {
			controller: Controller,
			link: LinkFn,
			restrict: 'E',
			template: '<div id="map"></div>',
			replace: true
		};
	});

})();
