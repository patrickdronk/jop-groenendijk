'use strict'

const Schema = use('Schema')

class AttachmentsTableSchema extends Schema {

  up () {
    this.create('attachments', (table) => {
      table.increments();
      table.integer('post_id').unsigned().references('id').inTable('posts');
      table.string('location');
      table.timestamps();
    })
  }

  down () {
    this.drop('attachments')
  }

}

module.exports = AttachmentsTableSchema
