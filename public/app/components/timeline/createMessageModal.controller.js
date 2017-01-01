'use strict';

angular
    .module('timeline')
    .controller('CreateMessageModalController', CreateMessageModalController);

CreateMessageModalController.$inject = ['$uibModalInstance',];

function CreateMessageModalController($uibModalInstance) {

    var vm = this;
    vm.ok = function () {
            // Data.post("/messages", vm.message).then(function(result){
            //     console.log(result);
            //     if(result.status == 200) {
            //         toasty.success({
            //             title: "Geplaatst :)",
            //             msg: "Uw bericht is geplaatst!"
            //         });
            //         $uibModalInstance.close(result.data);
            //     }
            // });

    };

    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}