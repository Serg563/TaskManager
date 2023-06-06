import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";

declare global {
  interface Window {
    google: any;
  }
}

function handleCallbackResponse(response: any) {
  console.log("Encoded token: " + response.credential);
  console.log("aud: " + response.iss); // Accessing using dot notation
  var user_object: any = jwt_decode(response.credential);
  console.log(user_object);
}

function GoogleAuthTest2() {
  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id:
        "21864522446-3iak4mufblmmtgni0iks2e6p90n9nnhr.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );
  }, []);

  return (
    <div>
      <div id="signInDiv"></div>
    </div>
  );
}

export default GoogleAuthTest2;
