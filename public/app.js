var app = angular.module('app', ['ui.router','ui.bootstrap','auth', 'template', 'timeline', 'angular-toasty']);

app.run(function($state){
    $state.go('login');
});

angular.module('app').config(['toastyConfigProvider', function(toastyConfigProvider) {
  toastyConfigProvider.setConfig({
    sound: false,
    shake: false
  });
}]);
