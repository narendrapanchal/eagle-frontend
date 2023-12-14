import React, { useState, useEffect } from "react";
import { getAuthTokenFromCookie, getRoleFromCookie } from "../helpers/getToken";
import styles from "../scss/InventoryListFM.module.scss";
import { Link } from "react-router-dom";
const InventoryListFM = () => {
  const [inventory, setInventory] = useState([]);
  const [deletedInventory,setDeletedInventory ]=useState(false);
  const token = getAuthTokenFromCookie();
  if (!token) {
    window.location = "/login";
  }
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
          "https://eagle-backend-ekxb.onrender.com/inventory/all-inventories-list",
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
  const onDelete=async(id)=>{
      try {
        const response = await fetch(`https://eagle-backend-ekxb.onrender.com/inventory/update-product/${id}`, {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({quantity:0}),
        });
        if(response.status===200){
          alert("Deleted Successfully")
          window.location.reload();
        }
  
      } catch (error) {
        console.error('Error during POST request:', error.message);
        alert('Error during POST request:', error.message)
      }
  
  }
  return (
    <div className={styles.inventory}>
    <h2 className={styles}><span>Inventory</span> <button onClick={()=>{
      setDeletedInventory(prev=>!prev)
    }}>{deletedInventory?"Hide Deleted inventory":"Show Deleted inventory"}</button></h2>
    <div className={styles.product_list}>
      {inventory.map((item) => {

        if(!deletedInventory && item.quantity==0){
          return ""
        }
        return <div key={item._id}>
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
          <p>Quantity: {item.quantity}</p>
          <p>Weight: {item.weight} kg</p>
          <p>Price: {item.price}₹</p>
         <button><Link to={`/edit-inventory/${item._id}`}> Edit</Link></button>
      <button onClick={() => onDelete(item._id)} disabled={item.quantity===0}>Delete</button>
        </div>
      </div>
      })}
    </div>
  </div>
  );
};

export default InventoryListFM;