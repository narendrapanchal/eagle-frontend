import React, { useState, useEffect } from "react";
import { getAuthTokenFromCookie, getRoleFromCookie } from "../helpers/getToken";
import styles from "../scss/Order.module.scss";
const Order = () => {
  const [orderList, setOrderList] = useState([]);
  const token = getAuthTokenFromCookie();
  if (!token) {
    window.location = "/login";
  }
  const role = getRoleFromCookie();
  const [loading, setLoading] = useState(false);
  const callList = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://eagle-backend-ekxb.onrender.com/order/orders/${role}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          // Your request body
          body: JSON.stringify({}),
        }
      );
      let res = await response.json();
      console.log("res", res);
      setOrderList(res.orders);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    (async function () {
      callList();
    })();
  }, []);
  if (loading) {
    return <div>Loading....</div>;
  }
  return (
    <div className={styles.order}>
      <h2 className={styles.heading}>Orders </h2>
      <div className={styles.product_list}>
        {orderList.map((item) =>
          item.quantity > 0 ? (
            <div key={item.productId._id}>
              <div className={styles.image}>
                {" "}
                <img
                  src={item.productId.image}
                  alt={item.description}
                  width={40}
                  height={60}
                />
              </div>
              <div>
                <p>{item.productId.name}</p>
                <p>{item.productId.description}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Weight: {item.productId.weight} kg/item</p>
                <p>Total Price: {item.productId.price * item.quantity}₹</p>
              </div>
            </div>
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
};

export default Order;
