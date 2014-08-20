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