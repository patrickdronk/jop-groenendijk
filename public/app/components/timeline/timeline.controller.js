'use strict';

angular
    .module('timeline')
    .controller('TimelineController', TimelineController);

TimelineController.$inject = ['$uibModal'];

function TimelineController($uibModal) {

    var vm = this;
    vm.messages = [];

    function activate() {
        vm.getMessages();
        // userService.getAuthenticatedUser().then(function(result) {
        //     vm.currentUser = result.data;
        // })
    }

    vm.getMessages = function()
    {
        // Data.get("/messages").then(function(result) {
        //     vm.messages = result.data;
        // })
    };

    vm.createMessage = function() {
        var modalInstance = $uibModal.open({
            templateUrl: 'app/components/timeline/createMessageModal.html',
            size: 'lg',
            controller: 'CreateMessageModalController',
            controllerAs: 'vm'
        });

        modalInstance.result.then(function (newMessage) {
            vm.messages.push(newMessage);
        });
    };

    activate();
}
