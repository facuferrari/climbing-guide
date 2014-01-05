<html ng-app="app">
<head>
	<meta charset="utf-8">
	<title>Climbing Guide</title>

	<link rel="stylesheet" href="css/normalize.css" />
	<link rel="stylesheet" href="css/foundation.css" />
	<link rel="stylesheet" href="css/style.css" />
</head>
<body>
	<div ng-view></div>
</body>

<script src="components/jquery.js"></script>
<script src="components/modernizr.js"></script>
<script src="components/foundation/foundation.min.js"></script>
<script src="components/foundation/foundation.dropdown.js"></script>

<script src="components/angular/angular.js"></script>
<script src="components/angular-route/angular-route.min.js"></script>

<script src="http://maps.googleapis.com/maps/api/js?v=3.exp&libraries=weather&sensor=false&language=en"></script>
<!--<script src="app/vendor/infobox.js"></script>-->

<script src="js/app.js"></script>
<script src="js/directives/gmap-directive.js"></script>

</html>