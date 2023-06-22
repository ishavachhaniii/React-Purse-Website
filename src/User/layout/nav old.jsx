import React, { useState, useEffect } from "react";
import "firebase/firestore";
import {
  Table,
  TableBody,
  TableCell,
  Container,
  TableHead,
  TableRow,
  IconButton,
  Button,
  TablePagination,
} from "@material-ui/core";
// import { Pagination, Stack, MenuItem, Select } from "@mui/material";

import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import UseGetData from "../User/helpers/UseGetData";
import fire, { db } from "../User/helpers/db";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function AllProducts() {
  const { data: products, Loading } = UseGetData("products");

  const [product, setProduct] = useState([]);

  // const [recordsPerPage, setRecordsPerPage] = useState(10);
  // const [currentPage, setCurrentPage] = useState(1);

  const [currentPage, setCurrentPage] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    if (products && products.length > 0) {
      const sortedProducts = products.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      setProduct(sortedProducts);
      setTotalProducts(sortedProducts.length);
    }
  }, [products]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRecordsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const startIndex = currentPage * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    toast.error("Product Deleted!!");
  };

  const toggleProductStatus = async (id, currentStatus) => {
    try {
      const productRef = doc(db, "products", id);
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      await updateDoc(productRef, { status: newStatus });
      toast.success(
        `Product ${
          newStatus === "active" ? "Activated" : "Deactivated"
        } Successfully!`
      );
    } catch (error) {
      console.error("Error toggling product status:", error);
      toast.error("Failed to toggle product status");
    }
  };

  // useEffect(() => {
  //   if (products && products.length > 0) {
  //     const sortedProducts = products.sort((a, b) => {
  //       return a.name.localeCompare(b.name);
  //     });
  //     setProduct(sortedProducts);
  //   }
  // }, [products]);

  // const handleRecordsPerPageChange = (event) => {
  //   setRecordsPerPage(event.target.value);
  //   setCurrentPage(1);
  // };

  // const handlePageChange = (event, pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  // const itemsPerPage = parseInt(recordsPerPage, 10);
  // const indexOfLastProduct = currentPage * itemsPerPage;
  // const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  // const currentProducts = product.slice(
  //   indexOfFirstProduct,
  //   indexOfLastProduct
  // );

  // const totalPages = Math.ceil(product.length / itemsPerPage);
  // const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Container>
      <h2 style={{ margin: "30px", textAlign: "center" }}>Product Details</h2>
      {Loading ? (
        <h4 className="py-5 text-center fw-bold">Loading...</h4>
      ) : (
        <>
          {/* <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 15,
              marginBottom: "15px"
            }}
          >
            <Stack direction="row" spacing={2}>
              <span style={{marginTop: "15px"}}>Records per page : </span>
              <Select
                value={recordsPerPage}
                onChange={handleRecordsPerPageChange}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={20}>20</MenuItem>
              </Select>
            </Stack>

            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              style={{ marginTop: "10px" }}
            />
          </div> */}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Short Description</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {product.slice(startIndex, endIndex).map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <img
                      src={item.image}
                      style={{ height: "100px", width: "100px" }}
                      alt={item.name}
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>₹{item.enterPrice}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.desc}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => toggleProductStatus(item.id, item.status)}
                      style={{
                        backgroundColor:
                          item.status === "active" ? "green" : "#C21807",
                        color: "white",
                      }}
                    >
                      {item.status}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Link to={`/dashboard/edit/${item.id}`}>
                      <EditIcon />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      style={{ color: "red" }}
                      onClick={() => {
                        deleteProduct(item.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[ 10, 15, 20]}
            component="div"
            count={totalProducts}
            rowsPerPage={recordsPerPage}
            page={currentPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{marginTop: "20px"}}
          />
          {/* <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "10px",
            }}
          >
            {currentPage !== 1 && (
              <IconButton
                onClick={(event) => handlePageChange(event, currentPage - 1)}
                style={{ marginRight: "10px" }}
              >
                <NavigateBeforeIcon />
              </IconButton>
            )}
            {pageNumbers.map((pageNumber) => (
              <Button
                key={pageNumber}
                variant={currentPage === pageNumber ? "contained" : "outlined"}
                onClick={(event) => handlePageChange(event, pageNumber)}
                style={{ margin: "10px" }}
              >
                {pageNumber}
              </Button>
            ))}
            {currentPage !== totalPages && (
              <IconButton
                onClick={(event) => handlePageChange(event, currentPage + 1)}
                style={{ marginLeft: "10px" }}
              >
                <NavigateNextIcon />
              </IconButton>
            )}
          </div> */}
        </>
      )}
    </Container>
  );
}

export default AllProducts;

// import React, { useState, useEffect } from "react";
// import "firebase/firestore";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   Container,
//   TableHead,
//   TableRow,
//   IconButton,
//   Button,
// } from "@material-ui/core";
// import fire, { db } from "../User/helpers/db";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import UseGetData from "../User/helpers/UseGetData";
// import { doc, deleteDoc, updateDoc } from "firebase/firestore";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
// import TablePagination from "@mui/material/TablePagination";

// function AllProducts() {
//   const { data: products, Loading } = UseGetData("products");
//   const [product, setProduct] = useState([]);

//   const deleteProduct = async (id) => {
//     await deleteDoc(doc(db, "products", id));
//     toast.error("Product Deleted!!");
//   };

//   const itemsPerPage = 7;
//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = Math.ceil(products.length / itemsPerPage);
//   const pageNumbers = [];

//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const toggleProductStatus = async (id, currentStatus) => {
//     try {
//       const productRef = doc(db, "products", id);
//       const newStatus = currentStatus === "active" ? "inactive" : "active";
//       await updateDoc(productRef, { status: newStatus });
//       toast.success(
//         `Product ${
//           newStatus === "active" ? "Activated" : "Deactivated"
//         } Successfully!`
//       );
//     } catch (error) {
//       console.error("Error toggling product status:", error);
//       toast.error("Failed to toggle product status");
//     }
//   };

//   useEffect(() => {
//     if (products && products.length > 0) {
//       const sortedProducts = products.sort((a, b) => {
//         return a.name.localeCompare(b.name);
//       });
//       setProduct(sortedProducts);
//     }
//   }, [products]);

//   const handleChangeRowsPerPage = (event) => {
//     // Handle rows per page change if needed
//   };

//   return (
//     <Container>
//       <h2 style={{ margin: "30px", textAlign: "center" }}>Product Details</h2>
//       {Loading ? (
//         <h4 className="py-5 text-center fw-bold">Loading...</h4>
//       ) : (
//         <>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Image</TableCell>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Price</TableCell>
//                 <TableCell>Short Description</TableCell>
//                 <TableCell>Description</TableCell>
//                 <TableCell>Quantity</TableCell>
//                 <TableCell>Category</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Edit</TableCell>
//                 <TableCell>Delete</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {currentProducts.map((item) => (
//                 // {products.map((item) => (
//                 <TableRow key={item.id}>
//                   <TableCell>
//                     <img
//                       src={item.image}
//                       style={{ height: "100px", width: "100px" }}
//                       alt={item.name}
//                     />
//                   </TableCell>
//                   <TableCell>{item.name}</TableCell>
//                   <TableCell>₹{item.enterPrice}</TableCell>
//                   <TableCell>{item.description}</TableCell>
//                   <TableCell>{item.desc}</TableCell>
//                   <TableCell>{item.quantity}</TableCell>
//                   <TableCell>{item.category}</TableCell>
//                   <TableCell>
//                     <Button
//                       onClick={() =>
//                         toggleProductStatus(item.id, item.status)
//                       }
//                       style={{
//                         backgroundColor:
//                           item.status === "active" ? "green" : "#C21807",
//                         color: "white",
//                       }}
//                     >
//                       {item.status}
//                     </Button>
//                   </TableCell>
//                   <TableCell>
//                     <Link to={`/dashboard/edit/${item.id}`}>
//                       <EditIcon />
//                     </Link>
//                   </TableCell>
//                   <TableCell>
//                     <IconButton
//                       style={{ color: "red" }}
//                       onClick={() => {
//                         deleteProduct(item.id);
//                       }}
//                     >
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "flex-end",
//               margin: "10px",
//             }}
//           >
//             <TablePagination
//               component="div"
//               count={products.length}
//               page={currentPage - 1}
//               onPageChange={(event, newPage) => handlePageChange(newPage + 1)}
//               rowsPerPage={itemsPerPage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//           </div>
//         </>
//       )}
//     </Container>
//   );
// }

// export default AllProducts;


-----------------------------------------------------------------------------------------------------------------------



import React from "react";
import { Container, Row } from "reactstrap";
import { makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { AccountCircle } from "@material-ui/icons";
import Footer from "../layout/Footer";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Logout from "@mui/icons-material/Logout";

import { useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { AppBar } from "@mui/material"; 

const drawerWidth = 220;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.45),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.35),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
      "&:focus": {
        width: "50ch",
      },
    },
  },
}));

// const admin_nav = [
//   {
//     display: "Dashboard",
//     path: "/dashboard",
//   },
//   {
//     display: "All Products",
//     path: "/dashboard/allproduct",
//   },
//   {
//     display: "Add Products",
//     path: "/dashboard/addproduct",
//   },
//   {
//     display: "Manage Users",
//     path: "/dashboard/users",
//   },
//   {
//     display: "Add Categories",
//     path: "/dashboard/category",
//   },
//   {
//     display: "View Categories",
//     path: "/dashboard/allcategory",
//   },
// ];


const AdminNav = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));
  
  const theme = useTheme();
  const [opens, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
    <AppBar position="fixed" open={opens}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(opens && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            I BOUTIQUE
          </Typography>
          <Typography>
          <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              </Typography>

              <div className={classes.nav_right}>
                <span>
                  <NotificationsIcon  style={{ width: 35, height: 35 }} />
                </span>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  // sx={{ ml: 1 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <AccountCircle style={{ width: 35, height: 35 }} />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleClose}>
                    <Avatar /> Profile
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Avatar /> My account
                  </MenuItem>
                  <Divider />

                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
                </div>
        </Toolbar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={opens}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem><NavLink to="/dashboard" style={{textDecoration: "none", color:"black", fontWeight: 500, fontSize: "20px"}}>Dashboard</NavLink></ListItem>
          <ListItem><NavLink to="/dashboard/allproduct" style={{textDecoration: "none", color:"black", fontWeight: 500, fontSize: "20px"}}>All Products</NavLink></ListItem>
          <ListItem><NavLink to="/dashboard/addproduct" style={{textDecoration: "none", color:"black", fontWeight: 500, fontSize: "20px"}}>Add Products</NavLink></ListItem>
          <ListItem><NavLink to="/dashboard/category" style={{textDecoration: "none", color:"black", fontWeight: 500, fontSize: "20px"}}>Add Category</NavLink></ListItem>
          <ListItem><NavLink to="/dashboard/allcategory" style={{textDecoration: "none", color:"black", fontWeight: 500, fontSize: "20px"}}>All Category</NavLink></ListItem>
          <ListItem><NavLink to="/dashboard/users" style={{textDecoration: "none", color:"black", fontWeight: 500, fontSize: "20px"}}>Manage Users</NavLink></ListItem>
        </List>
      </Drawer>
      </AppBar>
    
    </>
  );
};

export default AdminNav;

const useStyles = makeStyles((theme) => ({
  admin_header: {
    width: "100%",
    height: "100%",
    background: "#cca3a3",
    padding: "10px 0px",
  },
  nav_top: {
    width: "100%",
  },
  nav_wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: "3rem",
  },
  nav_right: {
    display: "flex",
    alignItems: "center",
    columnGap: "2rem",
  },
  searchbox: {
    // width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid grey",
    borderRadius: "5px",
  },
  input: {
    width: "100%",
    border: "none",
    outline: "none",
    padding: "10px",
  },
  admin_menu: {
    width: "100%",
    // height: "70px",
    background: "#fceded",
  },
  navigation: {
    textAlign: "center",
    marginTop: "15px",
  },
  menulist: {
    display: "flex",
    alignItems: "center",
    columnGap: "2.7rem",
    justifyContent: "center",
  },
  menuitem: {
    listStyle: "none",
    fontSize: "20px",
    padding: "10px 10px",
  },
}));



const AddProduct = (e) => {
  e.preventDefault();
  setLoading(true);

  const db = fire.firestore();
  db.collection("product").add({
    id: enterId,
    name: enterTitle,
    description: enterDesc,
    desc: enterDescription,
    quantity: enterQty,
    price: enterPrice,
    categories: enterCategory,
    image: enterImage,
  })
  .then(()=> {
    toast.success("Product Added Successfully.");
    navigate("/allproducts");
})
.catch((error) => {
  toast.error(error.message)
})
  // console.log(products);
};


const AddProduct = async(e) => {
  e.preventDefault()
  setLoading(true);

  const db = fire.firestore();
  db.collection("products").add({
      id: enterId,
      title : enterTitle,
      shortDesc: enterDesc,
      description: enterDescription,
      enterqty: enterQty,
      price: enterPrice,
      category: enterCategory,
      image: enterImage
  })
  .then(()=> {
      // toast.success("Product Added Successfully.")
      console.log("Product Added Successfully.");
      // navigate('/allproduct');
  })
}


try{

  const docRef = await collection(fire, 'products')

  const storageRef = ref(storage, `productImages/${Date.now() + enterImage.name}`)

  const uploadTask = uploadBytesResumable(storageRef, enterImage)

  uploadTask.on(() => {

  },()=> {

  })

}catch(error) {

}
toast.success("Product Succesfully Added.")

console.log(product);
}


import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import { Paper, Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";

const Summary = styled.div`
  // display: flex;
  // flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  // height: 30vh;
  // width: 500px;
  margin-top: 20px;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #e7d0d0;
  font-weight: 600;
  border: 2px solid #dec3c3;
`;

const Checkout = () => {
  const [names, setNames] = useState("");
  const [username, setUsername] = useState("");
  const [add1, setAdd1] = useState("");
  const [add2, setAdd2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [coutry, setCountry] = useState("");
  const [cardName, setCardname] = useState("");
  const [cardNumber, setCardnumber] = useState("");
  const [expDate, setExpdate] = useState("");
  const [cvv, setCvv] = useState("");

  const { totalQuantity, totalPrice } = useSelector((state) => state.allCart);

  const navigate = useNavigate();

  const handle = (e) => {
    e.preventDefault();
    navigate("/thanks");

    const Form = {
      name: names,
      username: username,
      add1: add1,
      add2: add2,
      city: city,
      state: state,
      pin: pin,
      country: coutry,
      cardName: cardName,
      cardNumber: cardNumber,
      expDate :expDate,
      cvv: cvv
    };
    localStorage.setItem("Form", JSON.stringify(Form));
  };
  return (
    <React.Fragment>
      <Typography variant="h4" style={{textAlign: "center", marginBottom: "20px"}}>Checkout</Typography>
      <Container>
        <form action="" onSubmit={handle}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                required
                id="FirstName"
                name="FirstName"
                label="First name"
                value={names}
                onChange={(e) => setNames(e.target.value)}
                autoComplete="family-name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                required
                id="lastName"
                name="lastName"
                label="Last name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="family-name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                required
                id="address1"
                name="address1"
                label="Address line 1"
                value={add1}
                onChange={(e) => setAdd1(e.target.value)}
                autoComplete="shipping address-line1"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                required
                id="address2"
                name="address2"
                label="Address line 2"
                value={add2}
                onChange={(e) => setAdd2(e.target.value)}
                autoComplete="shipping address-line2"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                required
                id="city"
                name="city"
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                autoComplete="shipping address-level2"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                required
                id="state"
                name="state"
                label="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                required
                id="country"
                name="country"
                label="Country"
                value={coutry}
                onChange={(e) => setCountry(e.target.value)}
                autoComplete="shipping country"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                required
                id="zip"
                name="zip"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                label="Zip / Postal code"
                autoComplete="shipping postal-code"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                required
                id="cardname"
                name="Card Name"
                value={cardName}
                onChange={(e) => setCardname(e.target.value)}
                label="Card Name"
                autoComplete="card name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardnumber(e.target.value)}
                label="Card number"
                fullWidth
                autoComplete="cc-number"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                required
                id="expDate"
                value={expDate}
                onChange={(e) => setExpdate(e.target.value)}
                label="Expiry date"
                fullWidth
                autoComplete="cc-exp"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4 }>
              <TextField
                required
                id="cvv"
                label="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                helperText="Last three digits on signature strip"
                fullWidth
                autoComplete="cc-csc"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox color="primary" name="saveAddress" value="yes" />
                }
                label="Use this address for payment details"
              />
            </Grid>
          </Grid>
          <br />
          <button
            type="submit"
            style={{
              border: "1px solid black",
              color: "white",
              backgroundColor: "black",
              borderRadius: "5px",
              fontFamily: "bold",
              fontSize: "20px",
            }}
            onClick={handle}
          >
            Place Order
          </button>
        </form>
        <Grid item xs={12} sm={4}>
        <Summary>
          <SummaryTitle>ORDER SUMMARY</SummaryTitle>
          <SummaryItem>
            <SummaryItemText>Quantity</SummaryItemText>
            <SummaryItemPrice>{totalQuantity}</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem type="total">
            <SummaryItemText>Total</SummaryItemText>
            <SummaryItemPrice>₹{totalPrice}</SummaryItemPrice>
          </SummaryItem>
          <Button>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Back To Home
            </Link>
          </Button>
        </Summary>
        </Grid>
      </Container>
    </React.Fragment>
  );
};
export default Checkout;



import * as React from 'react';
import { useEffect } from "react";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import { FavoriteBorder, ShoppingCartOutlined } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartTotal } from "../screens/CartSlice";
import { CssBaseline, makeStyles } from '@material-ui/core';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Navbar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const { cart, totalQuantity } = useSelector((state) => state.allCart);
  const { wishlistsItems } = useSelector((state) => state.wishlists);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);

  const classes = useStyles();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    localStorage.removeItem("user");
    props.setUserState();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleClose}>LogOut</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
        <Link to="/cart">
        <Badge
                  badgeContent={totalQuantity}
                  color="primary"
                  overlap="rectangular"
                >
                  <ShoppingCartOutlined style={{ color: "black" }} />
                </Badge>
            </Link>
        </IconButton>
        <h6>Cart Items</h6>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
           <Link to="/wish">
                <Badge
                  badgeContent={wishlistsItems?.length}
                  color="secondary"
                  overlap="rectangular"
                >
                  <FavoriteBorder style={{ color: "black" }} />
                </Badge>
              </Link>
        </IconButton>
        <h6>Wishlist</h6>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <h6>Profile</h6>
      </MenuItem>
    </Menu>
  );

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor:  " #54626F",}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            I BOUTIQUE
            </Link>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box  sx={{ display: "flex" }}>
          <Toolbar>
              <Link to="/product"  className={classes.links}>
                Product
              </Link>
            </Toolbar>
            <Toolbar>
              <Link to="/about"  className={classes.links}>
                About
                {/* <PermIdentityIcon fontSize="large" /> */}
              </Link>
            </Toolbar>
  
            <Toolbar>
              <Link to="/contact"  className={classes.links}>
                Contact
                {/* <AddIcCallIcon fontSize="large" /> */}
              </Link>
            </Toolbar>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" color="inherit" aria-label="cart">
            <Link to="/cart">
                <Badge
                  badgeContent={totalQuantity}
                  color="primary"
                  overlap="rectangular"
                >
                  <ShoppingCartOutlined style={{ color: "white" }} />
                </Badge>
              </Link>
            </IconButton>
            <IconButton
              size="large"
              color="inherit"
              aria-label="wish"
            >
              <Link to="/wish">
                <Badge
                  badgeContent={wishlistsItems?.length}
                  color="secondary"
                  overlap="rectangular"
                >
                  <FavoriteBorder style={{ color: "white" }} />
                </Badge>
              </Link>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
    </>
  );
}

export default Navbar;

const useStyles = makeStyles((theme) => ({
  links: {
    color: "inherit",
    textDecoration: "none",
    fontSize: "20px",
  },
}));



import { useState, useEffect, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./authentication/Login";
import SignUp from "./authentication/SignUp";
import Navbar from "./layout/Navbar";
import Homes from "./Pages/Homes";
import Product from "./Pages/Product";
import About from "./Pages/About";
import CartPage from "./Pages/CartPages";
import ProductDetail from "./Pages/ProductDetail";
import Wishlist from "./Pages/Wishlist";
import Checkout from "./Pages/Checkout";
// import LinearStepper from "./layout/LinearStepper";
import Contact from "./Pages/Contact";
import Thanks from "./Pages/Thanks";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { CssBaseline, Tooltip, Typography } from "@material-ui/core";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import styled from "styled-components";
// import { CssBaseline, Container, Paper, Box } from "@material-ui/core";

const Theme = styled.div`
  margin-right: 25px;
  // margin-top: 15px;
  position: relative;
  display: flex;
  flex-direction: row-reverse;
`;

const darkTheme = createTheme({
  palette: {
    type: "dark",
    background: {
      default: "hsl(230, 17%, 14%)",
    },
  },
});

const lightTheme = createTheme({
  palette: {
    type: "light",
    background: {
      default: "hsl(0, 0%, 100%)",
    },
  },
});

function App() {
  const [mode, setMode] = useState("light");

  const selectedTheme = mode === "dark" ? darkTheme : lightTheme;

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
      {user !== null ? (
        <>
          <Navbar setUserState={() => setUser(null)} />

          {/* <CssBaseline />
            <Container component={Box} p={4}>
              <Paper component={Box} p={3}>
                <LinearStepper />
              </Paper>
            </Container> */}
           <ThemeProvider theme={selectedTheme}>
            <CssBaseline />
            <Theme>
              <Brightness4Icon
                fontSize="large"
                onClick={() => setMode(mode === "light" ? "dark" : "light")}
              />
            </Theme>
         
          <Routes>
            <Route path="/" element={<Homes />}></Route>
            <Route path="/product" element={<Product />}></Route>
            <Route
              path="/productdetail/:id"
              element={<ProductDetail />}
            ></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/cart" element={<CartPage />}></Route>
            <Route path="/wish" element={<Wishlist />}></Route>
            <Route path="/checkout" element={<Checkout />}></Route>
            <Route path="/thanks" element={<Thanks />}></Route>
          </Routes>
          </ThemeProvider>
        </>
      ) : (
        <>
          {toggleForm ? (
            <Login
              loggedIn={(user) => setUser(user)}
              toggle={() => formMode()}
            />
          ) : (
            <SignUp toggle={() => formMode()} />
          )}
        </>
      )}
    </>
  );
}
export default App;

import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../helpers/DummyProduct";
import Footer from "../layout/Footer";
import Categories from "../layout/Categories";
import { Link } from "react-router-dom";
import Products from "../layout/prdcts";
import NewsLetter from "../layout/NewsLetter";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fade from "@mui/material/Fade";
import Toolbar from "@mui/material/Toolbar";

const Container = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  position: sticky;
  overflow: hidden;
  // margin-top: 5px;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #f0f0ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  // background-color: #black;
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`;

const Image = styled.img`
  height: 80%;
  // max-width: 100%;
  //transition: all 0.4s ease;
  //&:hover {
    // background-color: black;
    //transform: scale(1.1);
 //}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  max-width: 100%;
`;

const Title = styled.h1`
  font-size: 70px;
  max-width: 100%;
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
  max-width: 100%;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const Home = (props) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  function ScrollTop(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 100,
    });

    const handleClicks = (event) => {
      const anchor = (event.target.ownerDocument || document).querySelector(
        "#back-to-top-anchor"
      );

      if (anchor) {
        anchor.scrollIntoView({
          block: "center",
        });
      }
    };

    return (
      <Fade in={trigger}>
        <Box
          onClick={handleClicks}
          role="presentation"
          sx={{ position: "fixed", bottom: 50, right: 16 }}
        >
          {children}
        </Box>
      </Fade>
    );
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Arrow direction="left" onClick={() => handleClick("left")}>
          <ArrowLeftOutlined />
        </Arrow>
        <Wrapper slideIndex={slideIndex}>
          {sliderItems.map((item) => (
            <Slide bg={item.bg} key={item.id}>
              <ImgContainer>
                <Image src={item.img} />
              </ImgContainer>
              <InfoContainer>
                <Title>{item.title}</Title>
                <Desc>{item.desc}</Desc>
                <Button>
                  <Link
                    to="/product"
                    style={{ textDecoration: "none", color: "grey" }}
                  >
                    SHOW NOW
                  </Link>
                </Button>
              </InfoContainer>
            </Slide>
          ))}
        </Wrapper>
        <Arrow direction="right" onClick={() => handleClick("right")}>
          <ArrowRightOutlined />
        </Arrow>
        <Toolbar id="back-to-top-anchor" />
        {/* <Container>
          <Box sx={{ my: 2 }}>
            {[...new Array(12)]
              .map(
                () => ``
              )
              .join("\n")}
          </Box>
        </Container> */}
      </Container>
      <Categories />
      <Products />
      <NewsLetter />
      <Footer />
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
};

export default Home;


import {
  Facebook,
  Instagram,
  YouTube,
  MailOutline,
  Room,
  Phone,
  Pinterest,
  Twitter,
} from "@material-ui/icons";
import { Tooltip } from "@mui/material";
import styled from "styled-components";

const Box = styled.div`
  padding: 70px 50px;
  background: #D8D8D8;
  position: relative;
  bottom: 0;
  width: 100%;
  @media (max-width: 1000px) {
    padding: 70px 30px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  // margin-left: 40px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
  grid-gap: 30px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

const FooterLink = styled.a`
  color: black;
  margin-bottom: 20px;
  font-size: 18px;
  text-decoration: none;

  &:hover {
    color: grey;
    transition: 200ms ease-in;
  }
`;

const Heading = styled.p`
  font-size: 24px;
  color: black;
  margin-bottom: 40px;
  font-weight: bold;
`;

const Payment = styled.img`
  width: 90%;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
`;


// const Container = styled.div`
//   display: flex;
//   background-color: #fff1f5;
// `;

// const Left = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   padding: 20px;
//   color: black;
// `;

// const Logo = styled.h1``;

// const Desc = styled.p`
//   margin: 20px 0px;
// `;

// const SocialContainer = styled.div`
//   display: flex;
// `;

// const SocialIcon = styled.div`
//   width: 40px;
//   height: 40px;
//   border-radius: 20px;
//   color: white;
//   background-color: #${(props) => props.color};
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-right: 20px;
//   cursor: pointer;
// `;

// const Center = styled.div`
//   flex: 1;
//   padding: 20px;
//   color: black;
//   @media only screen and (max-width: 500px){
//     display: none;
//   }
// `;

// const Title = styled.h3`
//     margin-bottom: 30px;
// `;

// const List = styled.ul`
//   margin: 0;
//   padding: 0;
//   list-style: none;
//   dispaly: flex;
//   flex-wrap: wrap;
// `;

// const ListItem = styled.li`
//     width: 50%;
//     margin-bottom: 10px;
// `;

// const Right = styled.div`
//   flex: 1;
//   padding: 20px;
//   color: black;
// `;

// const ContactItem = styled.div`
//   margin-bottom: 20px;
//   display: flex;
//   list-style: none;
//   flex-wrap: wrap;
//   align-items: center;
//   '@media only screen and (max-width: 400px){
//     font-size: 5px;
//   }
// `;

// const Payment = styled.img`
//     width: 50%;
// `;

const Footer = () => {
  return (
    <Box>
      {/* <h2 style={{ color: "pink", textAlign: "center", marginTop: "-50px" }}>
        I BOUTIQUE
      </h2> */}
      <Container>
        <Row>
          <Column>
            <Heading>About Us</Heading>
            <FooterLink href="#">Aim</FooterLink>
            <FooterLink href="#">Vision</FooterLink>
            <FooterLink href="#">Testimonials</FooterLink>
          </Column>
          <Column>
            <Heading>Services</Heading>
            <FooterLink href="#">Home</FooterLink>
            <FooterLink href="#">Cart</FooterLink>
            <FooterLink href="#">Accessories</FooterLink>
            <FooterLink href="#">Woman Fashion</FooterLink>
            <FooterLink href="#">Man Fashion</FooterLink>
            <FooterLink href="#">Order Tracking</FooterLink>
            <FooterLink href="#">Wishlist</FooterLink>
          </Column>
          <Column>
            <Heading>Contact Us</Heading>
            <FooterLink><Room style={{marginRight:"5px"}}/>502 Dixie Path, India 395008</FooterLink>
            <FooterLink><Phone style={{marginRight:"5px"}}/>+91 99558 87744</FooterLink>
            <FooterLink><MailOutline style={{marginRight:"5px"}}/>IBoutique@gmail.com</FooterLink>
            <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
          </Column>
          <Column>
            <Heading>Social Media</Heading>
            <FooterLink href="#">
              <Tooltip title="Facebook" placement="right">
                <SocialIcon color="3B5999">
                  <Facebook />
                </SocialIcon>
              </Tooltip>
            </FooterLink>
            <FooterLink href="#">
              <Tooltip title="Instagram" placement="right">
                <SocialIcon color="E4405F">
                  <Instagram />
                </SocialIcon>
              </Tooltip>
            </FooterLink>
            <FooterLink href="#">
              <Tooltip title="Twitter" placement="right">
                <SocialIcon color="55ACEE">
                  <Twitter />
                </SocialIcon>
              </Tooltip>
            </FooterLink>
            <FooterLink href="#">
              <Tooltip title="Pinterest" placement="right">
                <SocialIcon color="E60023">
                  <Pinterest />
                </SocialIcon>
              </Tooltip>
            </FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
// <Container>
//   <Left>
//     <Logo>I BOUTIQUE</Logo>
//     <Desc>
//       Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, a
//       laboriosam facilis possimus ab nulla aspernatur aliquid voluptates
//       provident fuga ex placeat! A eveniet ut aut ex accusantium ullam.
//       Optio!
//     </Desc>
//     <SocialContainer>
//     <Tooltip title="Facebook">
//       <SocialIcon color="3B5999">
//         <Facebook />
//       </SocialIcon>
//     </Tooltip>
//     <Tooltip title="Instagram">
//       <SocialIcon color="E4405F">
//         <Instagram />
//       </SocialIcon>
//     </Tooltip>
//     <Tooltip title="Twitter">
//       <SocialIcon color="55ACEE">
//         <Twitter />
//       </SocialIcon>
//     </Tooltip>
//     <Tooltip title="Pinterest">
//       <SocialIcon color="E60023">
//         <Pinterest />
//       </SocialIcon>
//     </Tooltip>
//     </SocialContainer>
//   </Left>
//   <Center>
//     <Title>Useful Links</Title>
//     <List>
//         <ListItem>Home</ListItem>
//         <ListItem>Cart</ListItem>
//         <ListItem>Woman Fashion</ListItem>
//         <ListItem>Man Fashion</ListItem>
//         <ListItem>Accessories</ListItem>
//         <ListItem>My Account</ListItem>
//         <ListItem>Order Tracking</ListItem>
//         <ListItem>Wishlist</ListItem>
//         <ListItem>Terms</ListItem>
//     </List>
//   </Center>
//   <Right>
//     <Title>Contact</Title>
//     <ContactItem><Room /> 502 Dixie Path, India 395008</ContactItem>
//     <ContactItem><Phone /> +91 99558 87744</ContactItem>
//     <ContactItem><MailOutline /> IBoutique@gmail.com</ContactItem>
//     <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
//   </Right>
// </Container>
//   );
// };

export default Footer;

