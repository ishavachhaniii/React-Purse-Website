import { Box, Card, Container, Grid, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined, Title, Visibility } from "@material-ui/icons";
import { FavoriteBorder } from "@material-ui/icons";
import { IconButton, makeStyles } from "@material-ui/core";
import { addToCart } from "../screens/CartSlice";
import { addToWishList } from "../screens/WishSlice";

const ProductList = () => {
  const items = useSelector((state) => state.allCart.items);
  console.log(items);
  const dispatch = useDispatch();

  const classes = useStyles();

  const renderProducts = items.map((item) => (
    <Box sx={{ flex: "1", textAlign: "center" }}>
      <Grid item key={item.id}>
        <Card
          className={classes.hovers}
          sx={{
            border: "1px solid lightgray",
            margin: "10px",
            boxShadow: "0.5px 0.5px 0.5px 0.5px solid gray",
            width: "250px",
            height: "350px",
          }}
        >
          <Link
            to={`/productdetail/${item.id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <img src={item.image} height="170px" />
            <h4 style={{ margin: 10 }}>{item.name}</h4>
            <h6 style={{ margin: 10 }}>₹{item.price}</h6>
          </Link>
          <Tooltip title="Add to Cart">
            <IconButton style={{ color: "black" }}>
              <ShoppingCartOutlined onClick={() => dispatch(addToCart(item))} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Wishlist">
            <IconButton style={{ color: "black" }}>
              <FavoriteBorder onClick={() => dispatch(addToWishList(item))} />
            </IconButton>
          </Tooltip>
          <Tooltip title="View Product">
            <IconButton>
              <Link
                to={`/productdetail/${item.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Visibility
                // onClick={() => dispatch(ProductDetail(item))}
                />
              </Link>
            </IconButton>
          </Tooltip>
        </Card>
      </Grid>
    </Box>
  ));

  return (
    <Container>
        <Typography variant="h4" align="center" marginTop="20px">
         Related Products
        </Typography>
      <Grid container justifyContent={"center"} sx={{ margin: "30px" }}>
        {renderProducts}
      </Grid>
    </Container>
  );
};

export default ProductList;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  hovers: {
    "&:hover": {
      backgroundColor: "#fff1f5",
      opacity: 8,
    },
  },
}));