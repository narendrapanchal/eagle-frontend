import React from "react";
import { Link } from "react-router-dom";
import styles from "../scss/Header.module.scss";
import { getRoleFromCookie } from "../helpers/getToken";
const Header = () => {
  const role=getRoleFromCookie();
  const logout=()=>{
    document.cookie="authToken=";
    document.cookie="role=";
    window.location="/login";
  }
  return (
    <div className={styles.header}>
      <div>
        {role==="Customer"||role==="Manager"?<Link to="/">Home</Link>:""}
      </div>
      <div>
        {role==="Customer"?<Link to="/cart">Cart</Link>:""}
        {role==="Manager"?<Link to="/add-inventory">Add Inventory</Link>:""}
        {role==="Manager" || role==="Customer"?<Link to="/orders">Orders</Link>:""}
        {role.length===0?<Link to="/login">Login/Signup</Link>:<button onClick={logout}>Logout</button>}
        
      </div>
    </div>
  );
};

export default Header;
