'use strict';

const Post = use('App/Model/Post');

class PostsController {

  * index(request, response) {
    const posts = yield Post.all();
    yield response.json(posts);
  }
}

module.exports = PostsController;
