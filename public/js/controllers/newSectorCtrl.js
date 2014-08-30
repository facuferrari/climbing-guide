app.controllers.controller('newSectorCtrl', function ($scope, $rootScope, $state, $timeout) {
		$state.transitionTo('new-sector.location');

		$scope.form = {
			coords: {
				latitude: -54.77336558,
				longitude: -68.203125
			},
			info: {
				name: "",
				desc: ""
			},
			routes: [
				{ 
					name: "Nombre...",
					grade: "",
					ranking: ""
				}
			]
		};

		$scope.addRoute = function () {
			console.log('test');
			$scope.form.routes.push({
				name: "Nombre...",
				grade: "",
				ranking: ""
			});
		};

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
		};


		// Blocking the marker!
		$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
			// $scope.marker.options.draggable = false;
			console.log($scope.form);
		});
	});