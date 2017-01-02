'use strict';

const Validator = use('Validator');
const User = use('App/Model/User');

class UsersController {

  * login (request, response) {
    const email = request.input('email');
    const password = request.input('password');
    var token = "";

    try {
      token = yield request.auth.attempt(email, password)
    } catch (e) {
      response.unauthorized({error: e.message});
      return;
    }

    response.json({ 'token': token });
  }

  * register (request, response) {
    const userData = request.all();
    const validation = yield Validator.validate(userData, User.rules);

    if (validation.fails()) {
      response.status(409).json(validation.messages());
      return
    }

    // Validation passed, create the user.
    yield User.create(userData);
    response.status(200).json({succes : 'true'});
  }
}

module.exports = UsersController;
