function setFBAccessToken (response) {

  if (response.status === 'connected') {

    localStorage.setItem('facebookId', response.authResponse.userID);
    loggedInState();

  }

}

function loggedInState () {
  $('#login-button').addClass('hidden');
  $('#upload-button').removeClass('hidden');
  $('#logout-button').removeClass('hidden');
}

function loggedOutState () {
  $('#login-button').removeClass('hidden');
  $('#upload-button').addClass('hidden');
  $('#logout-button').addClass('hidden');
}

function facebookIdCheck () {
  if (localStorage.getItem('facebookId'))
    loggedInState();
  else
    loggedOutState();
}

function logout () {
  localStorage.removeItem('facebookId');
  location.reload();
}

function facebookLogin () {

  FB.login(function (response) {

    FB.getLoginStatus(function (response) {

      setFBAccessToken(response);

    });

  }, { scope: 'public_profile,email' });

}
