(function () {
	'use strict';

	app.directives.directive('gmap', function () {

		function Controller ($scope) {
			var markers = [];

			var init = function () {
				$scope.map.MapInstance = new google.maps.Map(document.getElementById('map'), $scope.map.Options);
				angular.forEach($scope.sectors, function (sector) {
					_makeMarkers(sector.cords, sector.sectorId);
				});
				_drawMarkers();

			};

			var _makeMarkers = function (cords, markerId) {
				var _marker = new google.maps.Marker({
					position: new google.maps.LatLng(cords.lat, cords.lng),
					map: $scope.map.MapInstance,
					id: markerId
				});
				markers.push(_marker);

			};

			var _drawMarkers = function () {
				angular.forEach($scope.markers, function (marker) {
					marker.setMap($scope.map.MapInstance);
				});
			};

			var panTo = function (markerId) {
				$scope.map.MapInstance.panTo(markers[markerId].getPosition());
				$scope.map.MapInstance.setZoom(13);
			};

			return {
				init: init,
				panTo: panTo
			};
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
			};

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
			templateUrl: 'templates/gmap.html'
		};
	});
})();