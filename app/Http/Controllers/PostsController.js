'use strict';

const Post = use('App/Model/Post');
const User = use ('App/Model/User');
const Attachment = use ('App/Model/Attachment');

class PostsController {

  /**
   * index function
   * @param request
   * @param response
   */
  * index(request, response) {
    //the public posts
    const user = yield request.auth.getUser();

    // const privatePosts = yield user.posts().with('attachments').where('public', '0').fetch();
    const publicPosts = yield Post
      .query()
      .with('attachments', 'user')
      .where('public', '1')
      .fetch();

    //the private posts
    const privatePosts = yield Post
      .query()
      .with('attachments', 'user')
      .where('user_id', user.id)
      .where('public', '0')
      .fetch();

    let allPosts = this.createReturnArray(publicPosts, privatePosts);

    yield response.json(allPosts);
  }

  /**
   * store function (POST)
   * @param request
   * @param response
   */
  * store (request, response) {
    const user = yield request.auth.getUser();

    const post = new Post();
    post.title = request.input('title');
    post.content = request.input('content');
    post.public = request.input('public') === null ? 0 : 1;
    let attachments = request.input('attachments');

    let newAttachments = [];
    for (var i = 0, len = attachments.length; i < len; i++) {
      const attachment = new Attachment();
      attachment.location = attachments[i];
      newAttachments.push(attachment);
    }

    yield user.posts().save(post);

    yield post.attachments().saveMany(newAttachments);

    const returnPost = yield Post
      .query()
      .where('id', post.id)
      .with('attachments', 'user')
      .first();
    // const returnPost = yield Post.query().where('id', post.id).fetch();

    response.json(returnPost);
  }

  /**
   * update function (PUT)
   * @param request
   * @param response
   */
  * update(request, response) {
    let post = yield Post.find(request.param('id'));
    const user = yield request.auth.getUser();
    let title = request.input('title');
    let content = request.input('content');
    let publicState = request.input('public') === null ? 0 : 1;
    let attachments = request.input('attachments');

    let newAttachments = [];
    for (var i = 0, len = attachments.length; i < len; i++) {
      const attachment = new Attachment();
      attachment.location = attachments[i];
      newAttachments.push(attachment);
    }

    post.fill({
      title: title,
      content: content,
      public: publicState
    });

    yield user.posts().save(post);
    try {
      yield post.attachments().saveMany(newAttachments);
    } catch (error) {}
    response.ok();
  }


  /**
   * weird not good method but don't know how to solve it better :')
   * @param publicPosts
   * @param privatePosts
   * @returns {Array}
   */
  createReturnArray(publicPosts, privatePosts) {
    let newPublicPosts = publicPosts.toJSON();
    let newPrivatePosts = privatePosts.toJSON();

    let allPosts = [];
    for (let i = 0; i < newPublicPosts.length; i++) {
      allPosts.push(newPublicPosts[i]);
    }

    for (let i = 0; i < newPrivatePosts.length; i++) {
      allPosts.push(newPrivatePosts[i]);
    }

    allPosts.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(a.created_at) - new Date(b.created_at);
    });
    return allPosts;
  }

}

module.exports = PostsController;
