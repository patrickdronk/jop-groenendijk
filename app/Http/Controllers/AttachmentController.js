'use strict';

var uuid = require('uuid');
const Helpers = use('Helpers');

class AttachmentController {

  /**
   * protect our images (kinda :'))
   * @param request
   * @param response
   */
  * get(request, response) {
    const id = request.param('id');
    response.download(Helpers.storagePath(id))
  }

  /**
   * upload a single image
   * @param request
   * @param response
   */
  * upload(request, response) {

    const attachment = request.file('files', {
      maxSize: '10mb',
      allowedExtensions: ['jpg', 'png', 'jpeg', 'JPG']
    });

    const fileName = uuid.v4();
    yield attachment.move(Helpers.storagePath(), fileName + '.' + attachment.extension());

    if (!attachment.moved()) {
      response.badRequest(attachment.errors());
      return;
    }
    response.ok(fileName + '.' + attachment.extension());
  }
}

module.exports = AttachmentController;
