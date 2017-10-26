function setFBAccessToken (response) {

  if (response.status === 'connected') {

    localStorage.setItem('facebookId', response.authResponse.userID);
    location.reload();

  }

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
