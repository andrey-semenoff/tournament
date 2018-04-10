/**
 * 
 * 
**/
angular.module('tournamentApp').component('formNewPlayer', {
	templateUrl: 'app/form-new-player/form-new-player.template.html',
	controller: FormNewPlayerController
});

function FormNewPlayerController($rootScope, $http) {
	var vm = this;

	vm.$onInit = function() {
		$('#addNewPlayer').on('shown.bs.modal', function () {
		  $(this).find('form input').first().trigger('focus');
		});
	}

	vm.addNewPlayer = function(player) {
		var params = {
			start: 0
		};

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

		$http.post('/api/v1/player' + '?' + query, player)
			.then(function(responce) {
				console.log(responce);

				$rootScope.players_total = responce.headers('x-total');
				$rootScope.players = responce.data;

				$rootScope.$broadcast('dataLoaded', params);

				// $rootScope.players.push(responce.data);
				// $rootScope.players_total++;
				$('#addNewPlayer').modal('hide');
				$('#addNewPlayer form')[0].reset();

			}, function(e) {
				console.log(e);
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
}