import React from "react";
import { withAdminAuth } from "../HOC";

function AuthenticationTestAdmin() {
  return <div>accessable only for assigned and with admin role users</div>;
}

export default withAdminAuth(AuthenticationTestAdmin);
