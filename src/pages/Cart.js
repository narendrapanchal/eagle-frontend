import React, { useState, useEffect } from "react";
import { getAuthTokenFromCookie, getRoleFromCookie } from "../helpers/getToken";
import styles from "../scss/Cart.module.scss";
const Cart = () => {
  const [cartList, setCartList] = useState([]);
  const token = getAuthTokenFromCookie();
  if (!token) {
    window.location = "/login";
  }
  const role = getRoleFromCookie();
  const [loading, setLoading] = useState(false);
  const [quantityUpdate, setQuantityUpdate] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const callList = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://eagle-backend-ekxb.onrender.com/cart/user-cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Include the authentication token in the request headers
            Authorization: `Bearer ${token}`,
          },
          // Your request body
          body: JSON.stringify({}),
        }
      );
      let res = await response.json();
      console.log("res", res);
      setCartList(res.cart);
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
  const updateQuantity = async (quantity, productId) => {
    setQuantityUpdate(true);
    try {
      console.log(productId, quantity);
      const response = await fetch(
        `http://localhost:8000/cart/update-cart/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantity }),
        }
      );
      if (response.status === 200) {
      }
      callList();
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Something went wrong", error.message);
    } finally {
      setQuantityUpdate(false); // Reset pending state
    }
  };
  const placeOrder = async () => {
    try {
      setPlacingOrder(true);
      const response = await fetch(
        "https://eagle-backend-ekxb.onrender.com/order/place-order",
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
      if (response.status == 200) {
        alert("Order placed successfully");
        window.location = "/orders";
      }
    } catch (error) {
      console.error("Error fetching inventory:", error);
    } finally {
      setPlacingOrder(false);
    }
  };
  if (loading) {
    return <div>Loading....</div>;
  }
  return (
    <div className={styles.cart}>
      <h2 className={styles.heading}>
        <span>Cart</span>
        <button disabled={placingOrder} onClick={placeOrder}>
          Place Order
        </button>{" "}
      </h2>
      <div className={styles.product_list}>
        {cartList.map((item) =>
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
                <p>Weight: {item.productId.weight} kg/item</p>
                <p>Total Price: {item.productId.price * item.quantity}₹</p>
                <p className={styles.quantity}>
                  <button
                    onClick={() => {
                      updateQuantity(item.quantity - 1, item._id);
                    }}
                    disabled={quantityUpdate}
                  >
                    -
                  </button>{" "}
                  <span>{item.quantity}</span>{" "}
                  <button
                    onClick={() => {
                      updateQuantity(item.quantity + 1, item._id);
                    }}
                    disabled={quantityUpdate}
                  >
                    +
                  </button>
                </p>
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

export default Cart;
