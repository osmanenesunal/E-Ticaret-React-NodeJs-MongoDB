import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import BasketComponent from "./pages/basket";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutComponent from "./pages/layout";
import HomeComponent from "./pages/home";
import OrderComponent from "./pages/order";
import ProductComponent from "./pages/product";
import LoginComponent from "./pages/login";
import RegisterComponent from "./pages/register";

function AppComponents() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutComponent></LayoutComponent>}>
            <Route index element={<HomeComponent></HomeComponent>} />  
              <Route path="basket" element={<BasketComponent></BasketComponent>}  />
              <Route path="order" element={<OrderComponent></OrderComponent>}></Route>
              <Route path="product" element={<ProductComponent></ProductComponent>}></Route>
          </Route>

          <Route path="login" element={<LoginComponent></LoginComponent>}></Route>
          <Route path="register" element={<RegisterComponent></RegisterComponent>}></Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppComponents />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
