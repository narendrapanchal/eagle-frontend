import React, { useState, useEffect } from "react";
import { getAuthTokenFromCookie, getRoleFromCookie } from "../helpers/getToken";
import styles from "../scss/EditInventoryListFM.module.scss";
const AddNewInventoryFM = () => {
  const [inventory, setInventory] = useState({  description :"",
    image :"",
    name :"",
    price :2000,
    quantity :5,
    weight:1});
  const token = getAuthTokenFromCookie();
  const role = getRoleFromCookie();
  if (!token||role!=="Manager") {
    window.location = "/login";
  }
  const [loading, setLoading] = useState(false);

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
  const handleAdd = (e) => {
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
        setLoading(true);
        const response = await fetch(`https://eagle-backend-ekxb.onrender.com/inventory/add-product`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(inventory),
        });
  
        if (response.status===200) {
          alert("Added New User");
          window.location="/";
        }
  
      } catch (error) {
        console.error('Error during POST request:', error.message);
        alert('Error during POST request:', error.message)
        setLoading(false);
      }
  
    })()
  };
  return (
    <div className={styles.edit_inventory}>
    <h2>Add Product</h2>
    <form onSubmit={handleAdd}>
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
        <button type="submit" onClick={handleAdd} disabled={loading}>Add & CLOSE</button>
    </form>
  </div>
  );
};

export default AddNewInventoryFM;