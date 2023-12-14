import React, { useState } from 'react'
import { getAuthTokenFromCookie } from '../helpers/getToken';
import styles from "../scss/UpdateOrder.module.scss";

function UpdateOrder({statusString,orderId}) {
    const token=getAuthTokenFromCookie()
  const [isPending, setIsPending] = useState(false);

    let status=[{name:"Processing",value:"Processing"},{name:"Shipped",value:"Shipped"},{name:"Dispatched",value:"Dispatched"},{name:"Nearest to user",value:"Nearest to you"},{name:"Out for delivery",value:"Out for delivery"},{name:"Delivered"}];
    let statusIndex=0;
    status.forEach((element,index) => {
            if(statusString===element.name){
                statusIndex=index;
                return 
            }
    });
    console.log(statusIndex,statusString);
    const [statusToUpdate,setStatusToUpdate]=useState(statusString);
        
const updateStatus=async()=>{
    setIsPending(true);
    try {
      const response = await fetch(
        `https://eagle-backend-ekxb.onrender.com/order/update-order-status/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({status:statusToUpdate}),
        }
      );
      if (response.status === 200) {
        alert("Updated the status successfully!");
        window.location.reload();
      }else{
        throw new Error(await response.json())
      }
    } catch (error) {
        alert("Something went wrong ", error.message)
    } finally{
        setIsPending(false);

    }
}
  return (
    <div className={styles.update}>
      <h2>Update the order</h2>
      <select onChange={(e)=>{
        setStatusToUpdate(e.target.value)
      }}>
        {status.map((ele,index)=>{
           return  index>=statusIndex?<option value={ele.value}>{ele.name}</option>:""
        })}
      </select><br/>
      <button onClick={updateStatus} disabled={statusString===statusToUpdate || isPending}>Update</button>
    </div>
  )
}

export default UpdateOrder
