import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../screens/CartSlice";
import { removeWishlist } from "../screens/WishSlice";
import styled from "styled-components";
import {
  Button,
  TableHead,
} from "@mui/material";
import { Delete } from "@material-ui/icons";
import { Table } from "reactstrap";
import { TableBody, TableRow, makeStyles } from "@material-ui/core";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
  height: "200px",
  width: "300px",
});

const TableCell = styled("td")({
  fontSize: "17px",
  textAlign: "left",
  color: "#808080",
});

const Wish = ({ wishlist }) => {
  const { id, image, name, enterPrice, desc } = wishlist;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const classes = useStyles();

  // remove wish item
  const removeWishlishHandler = (wishlist) => {
    dispatch(removeWishlist(wishlist));
  };

  // add to cart in wish page
  const addToCartHandler = (wishlist) => {
    dispatch(addToCart(wishlist));
    dispatch(removeWishlist(wishlist)); // Remove the item from the wishlist after adding to the cart
    navigate("/cart");
  };

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Add To cart</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={id}>
              <TableCell>
                <Img src={image} />
              </TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>₹{enterPrice}</TableCell>
              <TableCell>{desc}</TableCell>
              <TableCell>
                <Button style={{ color: "grey" }}>
                  <ShoppingCartIcon
                    onClick={() => addToCartHandler(wishlist)}
                  />
                </Button>
              </TableCell>
              <TableCell>
                <Button style={{ color: "grey" }}>
                  <Delete onClick={() => removeWishlishHandler(wishlist)} />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Wish;

const useStyles = makeStyles((theme) => ({
  img: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
  },
  icon: {
    cursor: "pointer",
  },
}));

// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { addToCart } from "../screens/CartSlice";
// import { removeWishlist } from "../screens/WishSlice";
// import styled from "styled-components";
// import { Grid, Typography, Button, Container, Tooltip, TableHead } from "@mui/material";
// import { Delete } from "@material-ui/icons";
// import { Col, Row, Table } from "reactstrap";
// import { IconButton, TableBody, TableRow, makeStyles } from "@material-ui/core";
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import TableContainer from '@mui/material/TableContainer';
// import Paper from '@mui/material/Paper';

// const Img = styled("img")({
//   margin: "auto",
//   display: "block",
//   // maxWidth: "100%",
//   // maxHeight: "100%",
//   height: "200px",
//   width: "200px",
// });

// const TableCell = styled("td")({
//   fontSize: "17px",
//   textAlign:"left",
//   // color: "#9c9898",
// })

// const Wish = ({ wishlist }) => {
//   const { id, image, name, price, desc } = wishlist;

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const classes = useStyles();

//   // remove wish item
//   const removeWishlishHandler = (wishlist) => {
//     dispatch(removeWishlist(wishlist));
//   };

//   // add to cart in wish page

//   const addToCartHandler = (wishlist) => {
//     dispatch(addToCart(wishlist));
//     navigate("/cart");
//   };

//   return (
//     <>
//     <TableContainer>
//       <Table sx={{ minWidth: 650 }}>
//         <TableHead>
//           <TableRow>
//             <TableCell>Image</TableCell>
//             <TableCell>Name</TableCell>
//             <TableCell>Price</TableCell>
//             <TableCell>Description</TableCell>
//             <TableCell>Add To cart</TableCell>
//             <TableCell>Remove</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//             <TableRow>
//               <TableCell><Img src={image}/></TableCell>
//               <TableCell>{name}</TableCell>
//               <TableCell>₹{price}</TableCell>
//               <TableCell>{desc}</TableCell>
//               <TableCell><IconButton style={{ color: "grey" }}><ShoppingCartIcon  onClick={() => addToCartHandler(wishlist)}/></IconButton></TableCell>
//               <TableCell><IconButton style={{ color: "grey" }}><Delete onClick={() => removeWishlishHandler(wishlist)}/></IconButton></TableCell>
//             </TableRow>
//         </TableBody>
//       </Table>
//     </TableContainer>

//     {/* <Container>
//       <Row>
//         <Col lg="12">
//           <tab className="table bordered">
//             <TableHead>
//               <TableRow>
//                 <th>Image</th>
//                 <th>Product Name</th>
//                 <th>Price</th>
//                 <th>Description</th>
//                 <th>Add To Cart</th>
//                 <th>Remove</th>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               <TableRow>
//                 <td><img src={image} className={classes.img}/></td>
//                 <td>{name}</td>
//                 <td>{price}</td>
//                 <td>{description}</td>
//                 <td><IconButton style={{ color: "black" }}><ShoppingCartIcon  onClick={() => addToCartHandler(wishlist)}/></IconButton></td>
//                 <td className={classes.icon}><IconButton style={{ color: "red" }}><Delete onClick={() => removeWishlishHandler(wishlist)}/></IconButton></td>
//               </TableRow>
//             </TableBody>
//           </tab>
//         </Col>
//       </Row>
//     </Container> */}
//       {/* <Container
//         sx={{
//           p: 2,
//           backgroundColor: "white",
//           color: "black",
//           margin: "auto",
//         maxWidth: 800,
//           '& > legend': { mt: 2 },
//           flexGrow: 1,
//           // backgroundColor: (theme) =>
//           //   theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//         }}
//       >  */}
//       {/* <Grid container spacing={8} >
//         <Grid item >
//           <Container>
//             <Img src={image} />
//           </Container>
//         </Grid>
//         <Grid item xs={12} sm container>
//           <Grid item xs container direction="column" spacing={2}>
//             <Grid item xs>
//               <Typography gutterBottom variant="h4" component="div">
//                 {name}
//               </Typography>
//               <Typography variant="h5" component="div">
//                 ₹{price}
//               </Typography>
//               <Typography variant="h6" component="div">
//                 {description}
//               </Typography>
//               <Typography
//                 component="div"
//                 style={{ marginTop: "10px", gap: "5px" }}
//               >
//                 <Button
//                   variant="contained"
//                   onClick={() => addToCartHandler(wishlist)}
//                 >
//                   Add To Cart
//                 </Button>
//                 <Tooltip title="Remove from favourite">
//                   <Button onClick={() => removeWishlishHandler(wishlist)}>
//                     <Delete color="secondary"/>
//                   </Button>
//                 </Tooltip>
//               </Typography>
//             </Grid>
//           </Grid> */}
//           {/* <Grid item>
//               <Typography variant="h5" component="div">
//                 ₹{item.price}
//               </Typography>
//             </Grid> */}
//         {/* </Grid>
//       </Grid> */}
//       {/* </Container> */}
//       {/* <div className="flex flex-col items-center bg-white rounded-lg shadow md:flex-row md:max-w-xl dark:bg-gray-900 "> */}
//       {/* <Link to={`/productdetail/${id}`}> */}
//       {/* <img src={image} alt="" style={{height: "300px", width: "300px", marginTop: "10px"}}/> */}
//       {/* </Link> */}
//       {/* <div className="flex flex-col justify-between p-4 leading-normal">
//           <h3 style={{color: "black"}}>{name}</h3>
//           <h4 style={{color: "black"}}>₹{price}</h4>
//           <div className="flex flex-row  items-center py-1">
//             <button

//               className="bg-rose-600 mx-2 px-2 "
//             >
//               Add To Cart
//             </button>
//             <button >
//               <FontAwesomeIcon icon={faTrash} />
//             </button>
//           </div>
//         </div>
//       </div> */}
//     </>
//   );
// };

// export default Wish;

// const useStyles = makeStyles((theme) => ({
// img: {
//   width: "150px",
//   height: "150px",
//   objectFit: "cover",
// },
// icon: {
//   cursor: "pointer",
// }

// }));
