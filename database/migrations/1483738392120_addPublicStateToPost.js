'use strict'

const Schema = use('Schema')

class AddPublicStateToPostsTableSchema extends Schema {

  up () {
    this.table('posts', (table) => {
      table.dropColumn('attachment');
      table.boolean('public');
    })
  }

  down () {
    this.drop('posts')
  }

}

module.exports = AddPublicStateToPostsTableSchema;
