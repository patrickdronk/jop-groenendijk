angular
    .module('auth')
    .config(config);

function config($stateProvider) {
    $stateProvider
    .state('login', {
        url: '/login',
        templateUrl: 'app/components/auth/login.html',
        controller: 'AuthController',
        controllerAs: 'vm'
    });
}
    