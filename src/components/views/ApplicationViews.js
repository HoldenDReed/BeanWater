import { EmployeeView } from "./EmployeeViews";
import { CustomerView } from "./CustomerViews";

export const ApplicationViews = () => {

  const localUser = localStorage.getItem("capstone_user");
  const userObject = JSON.parse(localUser);
  
 
  if (userObject.staff) {
    return <EmployeeView />;
  } else {
    return <CustomerView />;
  }

};

// import { logout } from "../helpers/logout";

// const onLogout = () => {
//   logout.logout(navigate);
// };

// <button type="submit" onClick={onLogout}>
//         Logout
//       </button>