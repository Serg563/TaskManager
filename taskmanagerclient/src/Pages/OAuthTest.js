import React from "react";
import GoogleLogin from "react-google-login";

const clientId =
  "21864522446-3iak4mufblmmtgni0iks2e6p90n9nnhr.apps.googleusercontent.com";

function OAuthTest() {
  const onFailure = (res) => {
    console.log("failed", res);
  };
  const onSucces = (res) => {
    console.log("success", res);
  };
  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSucces}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}

export default OAuthTest;
