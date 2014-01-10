(function () {
	'use strict';

	app.directives.directive('smenu', function () {
		function LinkFn (scope, iElement, iAttrs, gmapCtrl) {
			scope.panToSector = function (sectorId) {
				event.preventDefault();
				gmapCtrl.panTo(sectorId);
			};
		}

		return {
			require: '^gmap',
			link: LinkFn,
			scope: {
				sectors: '='
			},
			restrict: 'E',
			templateUrl: 'templates/side-menu.html',
			replace: true
		};
	});

})();