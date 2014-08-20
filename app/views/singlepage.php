<html ng-app="app">
<head>
	<meta charset="utf-8">
	<title>Climbing Guide</title>

	<link rel="stylesheet" href="css/normalize.css" />
	<link rel="stylesheet" href="css/foundation.css" />
	<link rel="stylesheet" href="css/style.css" />
</head>

<body ng-controller="mainCtrl">

	<nav class="top-bar p3" data-topbar>
		<ul class="title-area mAuto">
			<li class="name">
				<h1><a href="#">Climbing Guide</a></h1>
			</li>
		</ul>

		<section class="top-bar-section">
			<ul class="right">
				<!-- Select the style filter for the markers to be shown -->
				<!-- <li class="has-dropdown">
					<a href="#">Climbing Style</a>
					<ul class="dropdown">
						<li ng-repeat="style in climbingStyles"><a href="#">{{ style.name }}</a></li>
					</ul>
				</li> -->

				<li>
					<a href="#/new-sector">+ Add new sector!</a>
				</li>

				<li ng-switch="loggedIn">
					<a ng-switch-when="false" href="#" class="button" ng-click="login()">Login with Facebook</a>

					<a href="#" ng-switch-when="true">{{ currentUser }}</a>
				</li>
			</ul>
		</section>
	</nav>

	<div ng-view></div>
</body>

<script src="components/jquery.js"></script>
<script src="components/modernizr.js"></script>
<script src="components/foundation/foundation.min.js"></script>
<script src="components/foundation/foundation.dropdown.js"></script>

<script src="components/angular/angular.js"></script>
<script src="components/angular-ui-router/release/angular-ui-router.min.js"></script>
<script src="components/underscore/underscore.js"></script>

<!-- <script src="http://maps.googleapis.com/maps/api/js?v=3.exp&libraries=weather&sensor=false&language=en"></script>
<script src="components/infobox.js"></script> -->

<script src='http://maps.googleapis.com/maps/api/js?sensor=false'></script>
<script src='components/lodash/dist/lodash.underscore.min.js'></script>
<script src='components/angular-google-maps/dist/angular-google-maps.min.js'></script>

<script src="js/app.js"></script>
<script src="js/controllers/mainCtrl.js"></script>
<script src="js/controllers/newSectorCtrl.js"></script>
<script src="js/directives/gmap-directive.js"></script>
<script src="js/directives/sideMenu-directive.js"></script>
<script src="js/services/facebookService.js"></script>

</html>