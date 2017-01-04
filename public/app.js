var app = angular.module('app', ['ui.router','ui.bootstrap','auth', 'template', 'timeline', 'angular-toasty','ngStorage', 'angularMoment', 'ngFileUpload', 'bootstrapLightbox']);

app.run(function($state, $http, $localStorage){
    $state.go('login');
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + $localStorage.token;
});

angular.module('app').config(['toastyConfigProvider', function(toastyConfigProvider) {
  toastyConfigProvider.setConfig({
    sound: false,
    shake: false
  });
}]);

angular.module('app').config(function (LightboxProvider) {
  LightboxProvider.getImageUrl = function (image) {
    console.log(image);
    return '/attachment/' + image.location;
  };
});
