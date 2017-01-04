'use strict';

const Post = use('App/Model/Post');
const User = use ('App/Model/User');
const Attachment = use ('App/Model/Attachment');

class PostsController {

  * index(request, response) {
    const user = yield request.auth.getUser();
    const posts = yield user.posts().with('attachments').fetch();
    yield response.json(posts);
  }

  * store (request, response) {
    const user = yield request.auth.getUser();

    const post = new Post();
    post.title = request.input('title');
    post.content = request.input('content');
    let attachments = request.input('attachments');

    let newAttachments = [];
    for (var i = 0, len = attachments.length; i < len; i++) {
      const attachment = new Attachment();
      attachment.location = attachments[i];
      newAttachments.push(attachment);
    }

    yield user.posts().save(post);

    yield post.attachments().saveMany(newAttachments);

    console.log(post.id);
    const returnPost = yield Post
      .query()
      .where('id', post.id)
      .with('attachments')
      .first();
    // const returnPost = yield Post.query().where('id', post.id).fetch();

    response.json(returnPost);
  }

}

module.exports = PostsController;
