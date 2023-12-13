import React, { useState } from "react";

const AddToCart = ({ product, user }) => {
  const [isPending, setIsPending] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const handleAddToCart = async () => {
    setIsPending(true);
    try {
      const response = await fetch(
        `https://eagle-backend-ekxb.onrender.com/cart/add-to-cart/${product._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({}),
        }
      );
      if (response.status === 200) {
        setAddedToCart(true);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button onClick={handleAddToCart} disabled={isPending || addedToCart}>
      {addedToCart
        ? "Added To Cart"
        : isPending
        ? "Adding to Cart..."
        : "Add to Cart"}
    </button>
  );
};

export default AddToCart;
