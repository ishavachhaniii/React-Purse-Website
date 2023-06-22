import React, { useState } from "react";

import { Route, Routes } from "react-router-dom";

import Login from "../authentication/Login";
import SignUp from "../authentication/SignUp";
import Navbar from "../layout/Navbar";
import Homes from "../Pages/Homes";
import Product from "../Pages/Product";
import About from "../Pages/About";
import CartPage from "../Pages/CartPages";
import ProductDetail from "../Pages/ProductDetail";
import Wishlist from "../Pages/Wishlist";
import Checkout from "../Pages/Checkout";
import Contact from "../Pages/Contact";

import AdminNav from "../../Admin/AdminNav";
import AddProducts from "../../Admin/AddProducts";
import Edit from "../../Admin/EditProduct";
import AllProducts from "../../Admin/AllProducts";
import Dashboard from "../../Admin/Dashboard";
import Users from "../../Admin/Users";
import ProtectedRoute from "../routers/ProtectedRoute";
import { useLocation } from "react-router-dom";
import Category from "../../Admin/Category";
import AllCategory from "../../Admin/AllCategory";
import EditCategory from "../../Admin/EditCategory";
import Order from "../../Admin/Order";
import AdminLogin from "../../Admin/Authentication/AdminLogin";
import AdminSignUp from "../../Admin/Authentication/AdminSignUp";
import TotalSales from "../../Admin/TotalSales";

const Routers = () => {
  const [user, setUser] = useState("");

  const location = useLocation();

  return (
    <>
    {/* {location.pathname.startsWith("/dashboard") ? (
      <AdminNav />
    ) : (
      <Navbar setUserState={() => setUser(null)} />
    )} */}

      <Routes>
        <Route path="/" element={<Homes />}></Route>
        <Route path="/product" element={<Product />}></Route>
        <Route path="/productdetail/:id" element={<ProductDetail />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/wish" element={<Wishlist />}></Route>
        {/* <Route path="/checkout" element={<Checkout />}></Route> */}

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        ></Route>

        {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        ></Route> */}

        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
          
        <Route path="/admin-login" element={<AdminLogin />}></Route>
        <Route path="/admin-signup" element={<AdminSignUp />}></Route>

        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/dashboard/addproduct" element={<AddProducts />}></Route>
        <Route path="/dashboard/allproduct" element={<AllProducts />}></Route>
        <Route path="/dashboard/edit/:id" element={<Edit />}></Route>
        <Route path="/dashboard/users" element={<Users />}></Route>
        <Route path="/dashboard/category" element={<Category />}></Route>
        <Route path="/dashboard/allcategory" element={<AllCategory />}></Route>
        <Route
          path="/dashboard/editcategory/:id"
          element={<EditCategory />}
        ></Route>
        <Route path="/dashboard/order" element={<Order />}></Route>
        <Route path="/dashboard/totalprice" element={<TotalSales />}></Route>

      </Routes>
    </>
  );
};

export default Routers;

// import React from "react";
// import { Route, Routes, Navigate } from "react-router-dom";

// import Login from "../authentication/Login";
// import SignUp from "../authentication/SignUp";
// import Navbar from "../layout/Navbar";
// import Homes from "../Pages/Homes";
// import Product from "../Pages/Product";
// import About from "../Pages/About";
// import CartPage from "../Pages/CartPages";
// import ProductDetail from "../Pages/ProductDetail";
// import Wishlist from "../Pages/Wishlist";
// import Checkout from "../Pages/Checkout";
// import Contact from "../Pages/Contact";

// import AdminNav from "../Admin/AdminNav";
// import AddProducts from "../Admin/AddProducts";
// import Edit from "../Admin/EditProduct";
// import AllProducts from "../Admin/AllProducts";
// import Dashboard from "../Admin/Dashboard";
// import Users from "../Admin/Users";
// import { useLocation } from "react-router-dom";
// import Category from "../Admin/Category";
// import AllCategory from "../Admin/AllCategory";
// import EditCategory from "../Admin/EditCategory";
// import Order from "../Admin/Order";
// import PaymentForm from "../layout/PaymentForm";

// const ProtectedRoute = ({ element: Element, ...rest }) => {
//   // Add your authentication logic here
//   const isAuthenticated = false; // Replace with your actual authentication check

//   return isAuthenticated ? (
//     <Element {...rest} />
//   ) : (
//     <Navigate to="/login" replace />
//   );
// };

// const Routers = () => {
//   const location = useLocation();

//   return (
//     <>
//       {location.pathname.startsWith("/dashboard") ? (
//         <AdminNav />
//       ) : (
//         <Navbar />
//       )}

//       <Routes>
//         <Route path="/" element={<Homes />} />
//         <Route path="/product" element={<Product />} />
//         <Route path="/productdetail/:id" element={<ProductDetail />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/cart" element={<CartPage />} />
//         <Route path="/wish" element={<Wishlist />} />
//         {/* <Route path="/checkout" element={<Checkout />} /> */}

//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />

//         <Route
//            path="/checkout"
//            element={
//              <ProtectedRoute>
//                <Checkout />
//              </ProtectedRoute>
//            }
//          ></Route>
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute element={<Dashboard />} />
//           }
//         />
//         <Route
//           path="/dashboard/addproduct"
//           element={
//             <ProtectedRoute element={<AddProducts />} />
//           }
//         />
//         <Route
//           path="/dashboard/allproduct"
//           element={
//             <ProtectedRoute element={<AllProducts />} />
//           }
//         />
//         <Route
//           path="/dashboard/edit/:id"
//           element={
//             <ProtectedRoute element={<Edit />} />
//           }
//         />
//         <Route
//           path="/dashboard/users"
//           element={
//             <ProtectedRoute element={<Users />} />
//           }
//         />
//         <Route
//           path="/dashboard/category"
//           element={
//             <ProtectedRoute element={<Category />} />
//           }
//         />
//         <Route
//           path="/dashboard/allcategory"
//           element={
//             <ProtectedRoute element={<AllCategory />} />
//           }
//         />
//         <Route
//           path="/dashboard/editcategory/:id"
//           element={
//             <ProtectedRoute element={<EditCategory />} />
//           }
//         />
//         <Route
//           path="/dashboard/order"
//           element={
//             <ProtectedRoute element={<Order />} />
//           }
//         />
//       </Routes>
//     </>
//   );
// };

// export default Routers;
