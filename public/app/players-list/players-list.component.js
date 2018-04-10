/**
 * 
 * 
**/
angular.module('tournamentApp').component('playersList', {
	templateUrl: 'app/players-list/players-list.template.html',
	controller: PlayersListController
});

function PlayersListController(fetchData, $sce, $http, $rootScope) {
	var vm = this;

	vm.$onInit = function() {
		$rootScope.players = [];
		$rootScope.loading = true;
		vm.sort_col = '-id';
		vm.filter_id = '';
		vm.filter_name = '';
		vm.filter_level = '';
		vm.filter_score = '';

		vm.url = '/api/v1/players';
		vm.params = {
			start: '0'
		};

		$(function() {
			$('.table-header-sort').find('svg').hide();
		});

		fetchData(vm.url, vm.params);
	}

	vm.setSortCol = function($event, colname) {
		$('.table-header-sort').find('svg').hide();
		if( vm.sort_col == colname ) {
			vm.sort_col = '-' + colname;
			$($event.currentTarget).find('svg').removeClass('fa-chevron-down').addClass('fa-chevron-up').show();
		} else {
			vm.sort_col = colname;
			$($event.currentTarget).find('svg').removeClass('fa-chevron-up').addClass('fa-chevron-down').show();
		}
	}

	// 
	vm.filterByColValues = function(player) {
		if( vm.filter_id !== ''
			|| vm.filter_name !== '' 
			|| vm.filter_level !== ''
			|| vm.filter_score !== '' ) {
			
			if( player.id.toString().toLowerCase().indexOf(vm.filter_id.toLowerCase()) != -1
				&& player.name.toString().toLowerCase().indexOf(vm.filter_name.toLowerCase()) != -1 
				&& player.level.toString().toLowerCase().indexOf(vm.filter_level.toLowerCase()) != -1 
				&& player.score.toString().toLowerCase().indexOf(vm.filter_score.toLowerCase()) != -1  ) {
				
				return true;
			} else {
				return false;
			}

		} else {
			return true;
		}
	}

	// Change paging players per page
	vm.changePagingPlayers = function() {
		vm.params.start = 0;
		fetchData(vm.url, vm.params);
	}

	$rootScope.$on('goToPage', function(e, page_start) {
		// console.log(page_start);
		vm.params.start = page_start;
		fetchData(vm.url, vm.params);
	});

	// Change filter of level
	vm.changeLevelFilter = function() {
		fetchData(vm.url, vm.params);
	}
}