/**
 * 
 * 
**/
angular.module('tournamentApp').component('formSearch', {
	templateUrl: 'app/form-search/form-search.template.html',
	controller: FormSearchController
});

function FormSearchController($http, $rootScope, fetchData) {
	var vm = this;
	
	vm.url = '/api/v1/players';
	vm.params = {
		start: '0'
	};

	vm.search = function() {
		fetchData(vm.url, vm.params);
	}

}