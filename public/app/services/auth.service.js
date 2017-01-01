angular
  .module('app')
  .factory('authservice', authservice);

authservice.$inject = ['$http'];

function authservice($http) {
  return {
    login: login,
    register: register
  };

  function login(user) {
    return $http.post('/login', user)
      .then(loginSucces)
      .catch(loginFailed);

    function loginSucces(response) {
      $http.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
      return response.data;
    }

    function loginFailed(error) {
      console.log('XHR Failed for login.' + error.data);
    }
  }

  function register(user) {
    return $http.post('/register', user)
      .then(registerSucces)
      .catch(registerFailed);

    function registerSucces(response) {
      return response.data;
    }

    function registerFailed(error) {
      console.log('XHR Failed for register.' + error.data);
    }
  }
}
