'use strict';

const Post = use('App/Model/Post');
const User = use ('App/Model/User');

class PostsController {

  * index(request, response) {
    const user = yield request.auth.getUser();
    const posts = yield user.posts().fetch();
    yield response.json(posts);
  }

  * store (request, response) {
    const user = yield request.auth.getUser();

    const post = new Post();
    post.title = request.input('title');
    post.content = request.input('content');


    yield user.posts().save(post);

    response.json(post);
  }

}

module.exports = PostsController;
