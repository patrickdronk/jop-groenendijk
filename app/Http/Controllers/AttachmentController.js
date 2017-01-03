'use strict';

var uuid = require('uuid');

class AttachmentController {
  * upload(request, response) {

    const attachment = request.file('file', {
      maxSize: '5mb',
      allowedExtensions: ['jpg', 'png', 'jpeg']
    });

    const fileName = uuid.v4();

    yield attachment.move(Helpers.storagePath(), fileName);

    if (!attachment.moved()) {
      response.badRequest(attachment.errors());
      return
    }
  }
}

module.exports = AttachmentController;
