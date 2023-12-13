import React from "react";
import { Link } from "react-router-dom";
import styles from "../scss/Header.module.scss";
const Header = () => {
  return (
    <div className={styles.header}>
      <div>
        <Link to="">Home</Link>
      </div>
      <div>
        <Link to="/cart">Cart</Link>
        <Link to="/inventories">Products</Link>
        <Link to="/login">Login/Signup</Link>
        <Link to="/orders">Orders</Link>
      </div>
    </div>
  );
};

export default Header;
