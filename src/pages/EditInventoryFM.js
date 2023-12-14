import React, { useState, useEffect } from "react";
import { getAuthTokenFromCookie, getRoleFromCookie } from "../helpers/getToken";
import styles from "../scss/EditInventoryListFM.module.scss";
import { Link, useParams } from "react-router-dom";
const EditInventoryFM = ({ items, onEdit, onDelete }) => {
  const [inventory, setInventory] = useState({});
  const token = getAuthTokenFromCookie();
  const {id}=useParams()
  const role = getRoleFromCookie();
  if (!token||role!=="Manager") {
    window.location = "/login";
  }
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async function () {
      try {
        if (!token) {
          window.location = "/login";
        }
        setLoading(true);
        const response = await fetch(
          `https://eagle-backend-ekxb.onrender.com/inventory/all-inventories-list/${id}`,
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
        console.log("res[0]",res);
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


  const handleChange = (e) => {
    const { name, value } = e.target;

    setInventory({
      ...inventory,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !inventory.description ||
      !inventory.image ||
      !inventory.name ||
      !inventory.price ||
      !inventory.quantity ||
      !inventory.weight
    ) {
      alert('Please fill in all fields.');
      return;
    }
    (async function(){
      try {
        const response = await fetch(`https://eagle-backend-ekxb.onrender.com/inventory/update-product/${id}`, {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(inventory),
        });
  
        if (response.status===200) {
          alert("Agency/User Updated Successfully");
          window.location="/";
        }
  
      } catch (error) {
        console.error('Error during POST request:', error.message);
        alert('Error during POST request:', error.message)
      }
  
    })()
  };
  return (
    <div className={styles.edit_inventory}>
    <h2>Update Product</h2>
    <form onSubmit={handleSubmit}>
    <label> Name name
        </label>
      <input type="text" name="name"  placeholder={"Name"}value={inventory.name} onChange={handleChange} />
        <label>Description
        </label>
        <input type="text" name="description" placeholder='Description' value={inventory.description} onChange={handleChange} />
  <label>Image
        </label>
        <input placeholder='Image' type="text" name="image" value={inventory.image} onChange={handleChange} />
        <label>Price
        </label>
        <input placeholder='Price' type="number" name="price" value={inventory.price} onChange={handleChange} />
        <label>Quantity
        </label>
        <input placeholder='Quantity' type="number" name="quantity" value={inventory.quantity} onChange={handleChange} />
        <label>Weight 
          </label>
          <input type="number" name="weight" value={inventory.weight}onChange={handleChange}/> 
        <button type="submit" onClick={handleSubmit}>UPDATE & CLOSE</button>
    </form>
  </div>
  );
};

export default EditInventoryFM;