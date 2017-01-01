angular
    .module('template')
    .config(config);

function config($stateProvider) {
    $stateProvider
        .state('home', {
            templateUrl: 'app/components/template/template.html',
            controller: 'TemplateController',
            controllerAs: 'vm'
        });
}