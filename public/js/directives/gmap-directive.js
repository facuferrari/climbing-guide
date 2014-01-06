(function () {
	'use strict';

	app.directives.directive('gmap', function () {

		function Controller ($scope) {
			var init = function () {
				$scope.map.MapInstance = new google.maps.Map(document.getElementById('map'), $scope.map.Options);
			}

			return {
				init: init
			}
		}

		function LinkFn (scope, iElement, iAttrs, Ctrl) {
			scope.map = {
				Options: {
					center          : new google.maps.LatLng(scope.lat, scope.lng),
					zoom            : 11,
					disableDefaultUI: true,
					mapTypeId       : google.maps.MapTypeId.SATELLITE
				},
				MapInstance: null
			}

			Ctrl.init();
		}

		return {
			scope: {
				lat: '@',
				lng: '@',
				sectors: '='
			},
			controller: Controller,
			link: LinkFn,
			restrict: 'E',
			template: '<div id="map"></div>',
			replace: true
		};
	});
})();