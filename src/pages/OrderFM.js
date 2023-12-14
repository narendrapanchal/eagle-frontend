import React, { useState, useEffect } from "react";
import { getAuthTokenFromCookie, getRoleFromCookie } from "../helpers/getToken";
import styles from "../scss/OrderFM.module.scss";
import UpdateOrder from "../components/UpdateOrder";
const OrderFM = () => {
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
        `https://eagle-backend-ekxb.onrender.com/order/all-orders`,
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
      console.log("res.orders",res.orders);
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
      <div>
        {orderList.map((item) => {
          return (
            <div className={styles.product_list}>
              {" "}
              {item.items.map((ele) => {
                return ele.quantity > 0 ? (
                  <div key={ele._id}>
                    <div className={styles.image}>
                      {" "}
                      <img
                        src={ele.productId.image}
                        alt={ele.productId.description}
                        width={40}
                        height={60}
                      />
                    </div>
                    <div>
                      <p>{ele.productId.name}</p>
                      <p>{ele.productId.description}</p>
                      <p>Quantity: {ele.quantity}</p>
                      <p>Weight: {ele.productId.weight} kg/item</p>
                      <p>Total Price: {ele.productId.price * ele.quantity}₹</p>
                    </div>
                    <div className={styles.status}>
                    <span>Status Of Order</span>

                      {item.status.map((ele, index) => {
                        if (index < 1) {
                          return <span>{ele}</span>;
                        }
                        return (
                          <>
                            <span>↓</span>
                            <span>{ele}</span>
                          </>
                        );
                      })}
                    </div>
                    <UpdateOrder statusString={item.status[item.status.length-1]}orderId={item._id}/>
                  </div>
                ) : (
                  ""
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderFM;
