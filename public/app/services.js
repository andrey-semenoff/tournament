/**
 * 
 * 
**/
angular.module('tournamentApp')
.factory('fetchData', function($http, $rootScope) {
	return function(url, params) {

		if( !$rootScope.n ) {
			$rootScope.n = '5';
		}

		params.n = $rootScope.n;

		if($rootScope.searchText) {
			params.search = $rootScope.searchText;
		} else {
			params.search = '';
		}

		if($rootScope.levelFilter) {
			params.level = $rootScope.levelFilter;
		} else {
			params.level = '';
		}

		var query = serialize(params);

		$rootScope.is_loading = true;

		$http.get(url + '?' + query)
			.then(function(responce) {
				$rootScope.players_total = responce.headers('x-total');
				$rootScope.players = responce.data;
				$rootScope.loading = '<span class="text-success">' + responce.config.url + ' - ' + responce.statusText + '</span>';
				$rootScope.is_loading = false;

				$rootScope.$broadcast('dataLoaded', params);
			
			}, function(e) {
				// console.log(e);
				$rootScope.loading = $sce.trustAsHtml('<span class="text-danger">' + e.config.url + ' - ' + e.statusText + '</span>');
				$rootScope.is_loading = false;
			});

		// Converts object to query string, like start=0&n=5
		function serialize(obj) {
		  var str = [];
		  for (var p in obj)
		    if (obj.hasOwnProperty(p)) {
		      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		    }
		  return str.join("&");
		}
	}
});