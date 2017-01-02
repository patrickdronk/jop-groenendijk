'use strict';

const Schema = use('Schema');

class PostsTableSchema extends Schema {

  up () {
    this.create('posts', (table) => {
      table.increments();
      table.string('title');
      table.string('content', 5000);
      table.string('attachment');
      table.timestamps();
    })
  }

  down () {
    this.drop('posts')
  }

}

module.exports = PostsTableSchema
