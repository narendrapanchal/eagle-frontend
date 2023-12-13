import React, { useState, useEffect } from "react";
import { getAuthTokenFromCookie, getRoleFromCookie } from "../helpers/getToken";
import { Redirect } from "react-router-dom";
import AddToCart from "../components/AddToCart";
import styles from "../scss/Inventory.module.scss";
const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const token = getAuthTokenFromCookie();
  const role = getRoleFromCookie();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async function () {
      try {
        if (!token) {
          window.location = "/login";
        }
        setLoading(true);
        const response = await fetch(
          "https://eagle-backend-ekxb.onrender.com/inventory/all-inventories",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({}),
          }
        );
        let res = await response.json();
        setInventory(res);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <div>Loading....</div>;
  }
  return (
    <div className={styles.inventory}>
      <h2>Inventory</h2>
      <div className={styles.product_list}>
        {inventory.map((item) => (
          <div key={item._id}>
            <div className={styles.image}>
              {" "}
              <img
                src={item.image}
                alt={item.description}
                width={40}
                height={60}
              />
            </div>
            <div>
              <p>{item.name}</p>
              <p>{item.description}</p>
              <p>Weight: {item.weight} kg</p>
              <p>Price: {item.price}₹</p>
              <AddToCart product={item} user={{ role, token }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
