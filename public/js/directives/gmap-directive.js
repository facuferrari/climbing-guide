(function () {
	'use strict';

	app.directives.directive('gmap', function () {

		function Controller ($scope) {

			var init = function () {
				$scope.map.MapInstance = new google.maps.Map(document.getElementById('map'), $scope.map.Options);
				angular.forEach($scope.sectors, function (sector) {
					drawMarkers(sector.cords);
				});
			};

			var drawMarkers = function (cords) {
				/*var _infoWindowContent =
					'<div id="infoBox">' +
					'<h1 class="infoWindowHeading">'+ 'hola' + '</h1>'+
					'<p>'+  'test' +'</p>' +
					'</div>';

				var _infoBox = new InfoBox({
					content: _infoWindowContent,
					disableAutoPan: false,

					maxWiwdth: 150,
					pixelOffset: new google.maps.Size(-140, 0),
					zIndex: null,
					boxStyle: {
						width: '280px',
						height: '200px'
					},
					closeBoxMargin: '12px 4px 2px 2px',
					closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
					infoBoxClearance: new google.maps.Size(1, 1)
				});*/

				var _marker = new google.maps.Marker({
					position: new google.maps.LatLng(cords.lat, cords.lng),
					map: $scope.map.MapInstance,
				})
				.setMap($scope.map.MapInstance);

			};

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