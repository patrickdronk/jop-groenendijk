(function () {
    'use strict';

    angular
        .module('auth')
        .controller('AuthController', AuthController);

    AuthController.$inject = ['$state', 'authservice', 'toasty'];

    /* @ngInject */
    function AuthController($state, authservice, toasty) {
        var vm = this;
        vm.title = 'AuthController';

        activate();

        ////////////////

        function activate() {
          vm.show = true;
            // $('#body').addClass('login-background');
        }

        this.login = function () {
          authservice.login(vm.user).then(function (result) {
            if(result) {
              $state.go('home.timeline');
            } else {
              toasty.error({
                title: 'Login failed!',
                msg: 'Check your credentials'
              });
            }
          });

        };

      this.register = function () {
        authservice.register(vm.user).then(function (result) {
          if(result) {
            toasty.success({
              title: 'Registration succesfull!',
              msg: 'You can now login :)'
            });
            vm.show = true;
          }
        });

      }
    }

})();

