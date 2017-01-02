'use strict'

const Lucid = use('Lucid')
const Hash = use('Hash')

class User extends Lucid {

  static boot () {
    super.boot()

    /**
     * Hashing password before storing to the
     * database.
     */
    this.addHook('beforeCreate', function * (next) {
      this.password = yield Hash.make(this.password);
      yield next
    })
  }

  posts () {
    return this.hasMany('App/Model/Post');
  }

  /**
   * Api token
   * @returns {Object}
   */
  apiTokens () {
    return this.hasMany('App/Model/Token');
  }

  /**
   * Validation rules
   * @returns {{fullName: string, email: string, password: string}}
   */
  static get rules () {
    return {
      fullName: 'required',
      email: 'required|email|unique:users',
      password: 'required',
    }
  }
}

module.exports = User
