angular
  .module('app')
  .factory('authservice', authservice);

authservice.$inject = ['$http', '$localStorage'];

function authservice($http, $localStorage) {
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
      $localStorage.token = response.data.token;
      return true;
    }

    function loginFailed(error) {
      console.log(error);
      return false;
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
