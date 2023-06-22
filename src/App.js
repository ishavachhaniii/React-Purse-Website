import { useState, useEffect, useMemo } from "react";
// import { Route, Router, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
// import Login from "./authentication/Login";
// import SignUp from "./authentication/SignUp";
// import Navbar from "./layout/Navbar";
// import Homes from "./Pages/Homes";
// import Product from "./Pages/Product";
// import About from "./Pages/About";
// import CartPage from "./Pages/CartPages";
// import ProductDetail from "./Pages/ProductDetail";
// import Wishlist from "./Pages/Wishlist";
// import Checkout from "./Pages/Checkout";
// import LinearStepper from "./layout/LinearStepper";
// import { CssBaseline, Container, Paper, Box, Tooltip, Typography } from "@material-ui/core";
// import Contact from "./Pages/Contact";
// import { ThemeProvider, createTheme } from "@material-ui/core/styles";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";
// import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import AdminNav from "./Admin/AdminNav";
import { useLocation } from "react-router-dom";
import Layout from "./User/layout/Layout";
// import AddProducts from "./Admin/AddProducts";
// import Edit from "./Admin/EditProduct";
// import AllProducts from "./Admin/AllProducts";
// import Dashboard from "./Admin/Dashboard";
// import Users from "./Admin/Users";
// import ProtectedRoute from "./routers/ProtectedRoute";
// import Category from "./Admin/Category";
// import AllCategory from "./Admin/AllCategory";
// import EditCategory from "./Admin/EditCategory";
// import AdminLogin from "./Admin/Authentication/AdminLogin";
// import AdminSignUp from "./Admin/Authentication/AdminSignUp";
// import FormGroup from "@mui/material/FormGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Switch from "@mui/material/Switch";

// const Theme = styled.div`
//   margin-right: 15px;
//   margin-top: 65px;
//   position: relative;
//   display: flex;
//   flex-direction: row-reverse;
// `;

// const darkTheme = createTheme({
//   palette: {
//     type: "dark",
//     background: {
//       default: "hsl(230, 17%, 14%)",
//     },
//   },
// });

// const lightTheme = createTheme({
//   palette: {
//     type: "light",
//     background: {
//       default: "hsl(0, 0%, 100%)",
//     },
//   },
// });

function App() {
  const location = useLocation();

  // const [mode, setMode] = useState("light");

  // const selectedTheme = mode === "dark" ? darkTheme : lightTheme;

  const [user, setUser] = useState("");

  const [toggleForm, setToggleForm] = useState(true);
  const formMode = () => {
    setToggleForm(!toggleForm);
  };
  const userState = () => {
    const data = localStorage.getItem("user");
    const us = data !== null ? JSON.parse(data) : null;
    setUser(us);
  };
  useEffect(() => {
    userState();
  }, []);

  return (
    <>
      <ToastContainer />
      <Layout />
      {/* {user !== null ? (
        <> */}

      {/* <ThemeProvider theme={selectedTheme}>
        <CssBaseline />
        */}
      {/* {location.pathname.startsWith("/dashboard") ? (
          <AdminNav />
        ) : (
          <Navbar setUserState={() => setUser(null)} />
        )} */}
      {/* <Theme>
          <Brightness4Icon
            cursor="pointer"
            fontSize="large"
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
          />
        </Theme>
         */}
      {/* <CssBaseline />
            <Container component={Box} p={4}>
              <Paper component={Box} p={3}>
                <LinearStepper />
              </Paper>
            </Container> */}
      {/* <Routes>
          <Route path="/" element={<Homes />}></Route>
          <Route path="/product" element={<Product />}></Route>
          <Route path="/productdetail/:id" element={<ProductDetail />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/wish" element={<Wishlist />}></Route>
          <Route
            path="/checkout"
            element={
             
           
                <Checkout />
             
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>

         
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/dashboard/addproduct" element={<AddProducts />}></Route>
          <Route path="/dashboard/allproduct" element={<AllProducts />}></Route>
          <Route path="/dashboard/edit/:id" element={<Edit />}></Route>
          <Route path="/dashboard/users" element={<Users />}></Route>
          <Route path="/dashboard/category" element={<Category />}></Route>
          <Route path="/dashboard/allcategory" element={<AllCategory />}></Route>
          <Route path="/dashboard/editcategory/:id" element={<EditCategory />}></Route>

        </Routes> */}
      {/* </ThemeProvider> */}
    </>
    //     ) : (
    //       <>
    //         {toggleForm ? (
    //           <Login
    //             loggedIn={(user) => setUser(user)}
    //             toggle={() => formMode()}
    //           />
    //         ) : (
    //           <SignUp toggle={() => formMode()} />
    //         )}
    //       </>
    //     )}
    //   </>
  );
}
export default App;
