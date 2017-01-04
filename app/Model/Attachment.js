'use strict';

const Lucid = use('Lucid');

class Attachment extends Lucid {

  /**
   * an attachment always belongs to a post
   * @returns {Object}
   */
  post () {
    return this.belongsTo('App/Model/Post')
  }
}

module.exports = Attachment;
