'use strict';

const Schema = use('Schema');

class PostsTableSchema extends Schema {

  up () {
    this.create('posts', (table) => {
      table.increments();
      table.string('title');
      table.integer('user_id').unsigned().references('id').inTable('users');
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
