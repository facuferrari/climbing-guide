app.controllers.controller('newSectorCtrl', function ($scope, $rootScope) {

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