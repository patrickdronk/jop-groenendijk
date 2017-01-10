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

  vm.editMessage = function(post) {
    var modalInstance = $uibModal.open({
      templateUrl: 'app/components/timeline/editMessage/editMessageModal.html',
      size: 'lg',
      controller: 'EditMessageModalController',
      controllerAs: 'vm',
      resolve: {
        post: function () {
          return post;
        }
    },
    });
  };

  vm.openLightboxModal = function (post, index) {
    console.log(post.attachments[0]);
     Lightbox.openModal(post.attachments, index);
  };


  vm.stringToColour = function(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  };

  vm.fullNameToAbbreviation = function(str) {
    return str.match(/[A-Z]/g).join('');
  };

  activate();
}
