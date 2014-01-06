(function () {
	'use strict';

	app.directives.directive('smenu', function () {
		function Controller ($scope) {

		}

		function LinkFn (scope, iElement, iAttrs, Ctrl) {
		}

		return {
			controller: Controller,
			link: LinkFn,
			scope: {
				sectors: '='
			},
			restrict: 'E',
			templateUrl: 'templates/side-menu.html',
			replace: true
		}
	});

})();