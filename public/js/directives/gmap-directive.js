(function () {
	'use strict';

	app.directives.directive('gmap', function () {

		function Controller ($scope) {
			$scope.markers = [];

			var init = function () {
				$scope.map.MapInstance = new google.maps.Map(document.getElementById('map'), $scope.map.Options);
				angular.forEach($scope.sectors, function (sector) {
					drawMarkers(sector.cords, sector.id);
				});

			};

			var panToMarker = function (markerId) {
				angular.forEach($scope.markers, function(marker) {
					if (marker.id === markerId) {
						$scope.map.MapInstance.panTo(marker.getPosition());
					};
				})
			}

			var drawMarkers = function (cords, id) {
				var _marker = new google.maps.Marker({
					position: new google.maps.LatLng(cords.lat, cords.lng),
					map: $scope.map.MapInstance,
					id: id
				});

				$scope.markers.push(_marker);

			};

			return {
				init: init,
				panToMarker: panToMarker
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