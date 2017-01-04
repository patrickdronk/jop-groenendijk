'use strict';

angular
  .module('timeline')
  .controller('TimelineController', TimelineController);

TimelineController.$inject = ['$uibModal', '$http', 'Lightbox'];

function TimelineController($uibModal, $http, Lightbox) {

  var vm = this;
  vm.posts = [];

  function activate() {
    vm.getMessages();
    // userService.getAuthenticatedUser().then(function(result) {
    //     vm.currentUser = result.data;
    // })
  }

  vm.getMessages = function () {
    $http.get('/posts').then(function (result) {
      vm.posts = result.data;
    })
  };

  vm.createMessage = function () {
    var modalInstance = $uibModal.open({
      templateUrl: 'app/components/timeline/createMessageModal.html',
      size: 'lg',
      controller: 'CreateMessageModalController',
      controllerAs: 'vm'
    });

    modalInstance.result.then(function (newMessage) {
      vm.posts.push(newMessage);
    });
  };

  vm.openLightboxModal = function (post, index) {
    console.log(post.attachments[0]);
     Lightbox.openModal(post.attachments, index);
  };

  activate();
}
