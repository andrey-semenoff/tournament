/**
 * 
 * 
**/
angular.module('tournamentApp').component('pagination', {
	templateUrl: 'app/pagination/pagination.template.html',
	controller: PaginationController
});

function PaginationController($http, $rootScope) {
	var vm = this;

	vm.pages = [];
	vm.start = 0;
	vm.n = 5;

	$rootScope.$on('dataLoaded', function(e, params) {
		var total = $rootScope.players_total,
				pages = Math.ceil(total/params.n);
// console.log(params, pages);
		vm.start = parseInt(params.start);

		if( pages >= 2 ) {
			vm.pages = [];
			
			if( vm.n != parseInt(params.n) ) {
				vm.n = parseInt(params.n);
			}
			
			for(var i = 1; i <= pages; i++) {
				vm.pages.push(i);	
			}
		} else {
			vm.pages = [];
		}
	});

	vm.setClass = function(classname, el) {
		var addClassname = '';

		if( classname == 'disabled' ) {
			if( el == 'next' ) {
				addClassname = vm.start / vm.n == (vm.pages.length - 1) ? 'disabled' : '';
			} else {
				addClassname = (vm.start == 0) ? 'disabled' : '';
			}
		} else {
			addClassname = ((el * vm.n) == vm.start) ? 'active' : '';
		}

		return addClassname;
	}

	vm.selectPage = function(index) {
		if( isNaN(index) ) {
			if( index == 'prev' ) {
				index = vm.start / vm.n - 1;
			} else if( index == 'next' ) {
				index = vm.start / vm.n + 1;
			}
		}

		if( index != vm.start && index >= 0 && index < vm.pages.length ) {
			$rootScope.$emit('goToPage', index * vm.n);
		}
	}
}