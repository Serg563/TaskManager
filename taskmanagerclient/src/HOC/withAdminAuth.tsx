import { is } from "immer/dist/internal";
import jwt_decode from "jwt-decode";
import { SD_Roles } from "../Utility/SD";

const withAdminAuth = (WrappedComponent: any) => {
  return (props: any) => {
    //console.log("HOC called");
    const accessToken = localStorage.getItem("token") ?? "";

    if (accessToken) {
      const decode: { role: string } = jwt_decode(accessToken);

      if (decode.role !== SD_Roles.ADMIN) {
        window.location.replace("/accessDenied");
        return null;
      }
    } else {
      window.location.replace("/login");
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAdminAuth;
