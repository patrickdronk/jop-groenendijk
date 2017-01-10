'use strict';

angular
  .module('timeline')
  .controller('EditMessageModalController', EditMessageModalController);

EditMessageModalController.$inject = ['$uibModalInstance','$http', 'toasty', 'Upload','post'];

function EditMessageModalController($uibModalInstance, $http, toasty, Upload, post) {
  var vm = this;
  vm.post = post;

  vm.ok = function () {
    $http.put("/posts/" + vm.post.id, vm.post).then(function(result){
      if(result.status == 200) {
        toasty.success({
          title: "Updated! :)",
          msg: "Your post is succesfully updated!"
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
      console.log(resp.data);
      vm.post.attachments.push(resp.data);
      toasty.success({
        title: "Uploaded",
        msg: "Your file has been uploaded succesfully, you will see the file after you finish your post"
      });
    }, function (resp) {
      console.log('Error status: ' + resp.status);
    });
  };

  // vm.mutate = function(post) {
  //   console.log(post)
  //   let newAttachments = [];
  //   for (let i = 0; i < post.attachments.length; i++) {
  //     newAttachments = post.attachments[i].location;
  //   }
  //   post.attachments = newAttachments;
  //   return post;
  // };

  // vm.post = vm.mutate(post);

}
