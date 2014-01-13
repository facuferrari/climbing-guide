(function () {
	'use strict';

	app.directives.directive('gmap', function () {

		function Controller ($scope) {
			var markers = [];
			var infoBoxes = [];

			var init = function () {
				$scope.map.MapInstance = new google.maps.Map(document.getElementById('map'), $scope.map.Options);
				angular.forEach($scope.sectors, function (sector) {
					_makeMarkers(sector.cords, sector.sectorId);
				});
				_drawMarkers();

			};

			var panTo = function (markerId) {
				$scope.map.MapInstance.panTo(markers[markerId].getPosition());
				$scope.map.MapInstance.setZoom(13);
				_openInfoBox(markers[markerId]);
			};

			var _makeMarkers = function (cords, markerId) {
				var _marker = new google.maps.Marker({
					position: new google.maps.LatLng(cords.lat, cords.lng),
					map: $scope.map.MapInstance,
					id: markerId
				});

				// Add an info box which opens on click
				infoBoxes.push(_makeInfoBox(_marker.id));
				google.maps.event.addListener(_marker, 'click', function () {
					_openInfoBox(this, this.id);
				});

				markers.push(_marker);
			};

			var _drawMarkers = function () {
				angular.forEach(markers, function (marker) {
					marker.setMap($scope.map.MapInstance);
				});
			};

			var _makeInfoBox = function (markerId) {
				var _heading = null;
				var _desc    = null;

				angular.forEach($scope.sectors, function (sector) {
					if (sector.sectorId == markerId) {
						_heading = sector.name;
						_desc    = sector.desc;
					};
				});

				var infoBoxContent =
					'<div id="infoBox">' +
					'<h1 class="infoWindowHeading"><a href="#" ng-click="scope.openModal()">'+ _heading + '</a></h1>'+
					'<p>'+ _desc +'</p>' +
					'</div>';

				var infoBox = new InfoBox({
					content: infoBoxContent,
					disableAutoPan: false,

					pixelOffset: new google.maps.Size(-100, 10),
					zIndex: null,
					boxStyle: {
						width: "250px",
						height: "300px"
					},
					closeBoxMargin: "5px 5px 2px 2px",
					closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
					infoBoxClearance: new google.maps.Size(1, 1)
				});

				return infoBox;
			};

			var	_openInfoBox = function (marker) {
				infoBoxes[marker.id].open($scope.map.MapInstance, marker);
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

			scope.openModal = function () {
				/*event.preventDefault();*/
				$('#myModal').foundation('reveal', 'open');
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
			templateUrl: 'templates/gmap.html'
		};
	});
})();