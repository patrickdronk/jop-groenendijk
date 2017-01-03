'use strict';

angular
  .module('timeline')
  .controller('CreateMessageModalController', CreateMessageModalController);

CreateMessageModalController.$inject = ['$uibModalInstance','$http', 'toasty'];

function CreateMessageModalController($uibModalInstance, $http, toasty) {

  var vm = this;
  vm.ok = function () {
    $http.post("/posts", vm.post).then(function(result){
      console.log(result);
      if(result.status == 200) {
        toasty.success({
          title: "Placed :)",
          msg: "Your post is succesfully placed on the timeline!"
        });
        $uibModalInstance.close(result.data);
      }
    });

  };

  vm.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

}
