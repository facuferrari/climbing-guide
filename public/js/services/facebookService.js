	app.factory("Facebook", function ($q, $rootScope) {
		return {

			login: function () {
				var deferred = $q.defer();

				FB.login(function (response){
					if (response && !response.error) {
						$rootScope.$apply(function () {
							deferred.resolve(response);
						});
					} else {
						deferred.rejected(response.error.message);
					}
				});

				return deferred.promise;
			},

			getLoginStatus: function () {
				var deferred = $q.defer();

				FB.getLoginStatus(function (response){
					if (response && !response.error) {
						$rootScope.$apply(function(){
							deferred.resolve(response);
						});
					} else {
						deferred.rejected(response.error.message);
					}
				});

				return deferred.promise;
			},

			getUserInfo: function () {
				var deferred = $q.defer();

				FB.api('/me', function (response){
					if (response && !response.error) {
						$rootScope.$apply(function () {
							deferred.resolve(response);
						});
					} else {
						deferred.rejected(response.error.message);
					}
				});

				return deferred.promise;
			}
		}
	});