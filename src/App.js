import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Inventory from "./pages/Inventory";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import InventoryListFM from "./pages/InventoryListFM";
import EditInventoryFM from "./pages/EditInventoryFM";
import AddNewInventoryFM from "./pages/AddNewInventoryFM";
import { getRoleFromCookie } from "./helpers/getToken";
import OrderFM from "./pages/OrderFM";
const App = () => {
  const role=getRoleFromCookie();
  return (
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={role==="Manager"?<InventoryListFM/>:<Inventory />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/orders" element={role==="Manager"?<OrderFM/>:<Order />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/edit-inventory/:id" element={<EditInventoryFM/>}></Route>
            <Route path="/add-inventory/" element={<AddNewInventoryFM/>}></Route>
            
          </Routes>
        </BrowserRouter>
  );
};

export default App;
