'use strict';

const Lucid = use('Lucid');

class Post extends Lucid {

  /**
   * A Post is always coupled with a User
   * @returns {Object}
   */
  user () {
    return this.belongsTo('App/Model/User')
  }

  /**
   * return the posts of this user
   * @returns {Object}
   */
  attachments () {
    return this.hasMany('App/Model/Attachment');
  }
}

module.exports = Post;
