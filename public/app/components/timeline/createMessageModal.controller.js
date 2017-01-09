'use strict';

angular
  .module('timeline')
  .controller('CreateMessageModalController', CreateMessageModalController);

CreateMessageModalController.$inject = ['$uibModalInstance','$http', 'toasty', 'Upload', '$scope'];

function CreateMessageModalController($uibModalInstance, $http, toasty, Upload, $scope) {

  var vm = this;
  vm.post = {};
  vm.post.attachments = [];
  
  $scope.$watch('vm.files', function () {
        vm.upload(vm.files);
    });

  vm.ok = function () {
    $http.post("/posts", vm.post).then(function(result){
      if(result.status == 200) {
        toasty.success({
          title: "Placed :)",
          msg: "Your post is succesfully placed on the timeline!"
        });
        console.log(result.data);
        $uibModalInstance.close(result.data);
      }
    });

  };

  vm.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  vm.upload = function (file) {
    Upload.upload({
      url: 'attachment',
      data: {'files': file}
    }).then(function (resp) {
      console.log(resp);
      vm.post.attachments.push(resp.data);
      toasty.success({
        title: "Uploaded",
        msg: "Your file has been uploaded succesfully, you will see the file after you finish your post"
      });
    }, function (resp) {
      console.log('Error status: ' + resp.status);
    });
  }
}
