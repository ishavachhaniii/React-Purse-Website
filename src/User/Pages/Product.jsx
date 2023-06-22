import { Box, Card, Container, Grid, Tooltip, Typography, Skeleton } from "@mui/material";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined, Visibility } from "@material-ui/icons";
import { FavoriteBorder } from "@material-ui/icons";
import {
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
} from "@material-ui/core";
import { addToCart } from "../screens/CartSlice";
import { addToWishList } from "../screens/WishSlice";
import { Row, Col } from "reactstrap";
import { products } from "../helpers/DummyProduct";
import ProductList from "./ProductList";
import fire from "../helpers/db";
import UseGetData from "../helpers/UseGetData";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";

function Product() {
  const { data: products, Loading } = UseGetData("products");

  const [selectedCategory, setSelectedCategory] = useState("");

  const [search, setSearch] = useState("");

  const searchProducts = products.filter((item) => {
    if (item.name.toLowerCase().includes(search)) {
      return item;
    }
  });

  const items = useSelector((state) => state.allCart.items);
  console.log(items);

  const dispatch = useDispatch();

  const classes = useStyles();

  // const activeProducts = products.filter((item) => item.status === "active");

  const renderSkeletons = Loading || (searchProducts.length === 0 && selectedCategory === "") ? (
  <Container>
    <Grid container justifyContent="center">
      {Array.from({ length: 8 }).map((_, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3} mt={6}>
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
            <Skeleton variant="rectangular" width={300} height={300} />
            <Skeleton variant="text" width={200} height={20} sx={{ margin: 10 }} />
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
) : null;

  const renderProducts =  products.length > 0 && searchProducts
    .filter(
      (item) =>
        item.status === "active" &&
        (selectedCategory === "" || item.category === selectedCategory)
    )
    .map((item) => (
      <Box sx={{ flex: "1", textAlign: "center" }} key={item.id}>
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
              <h6 style={{ margin: 10 }}>₹{item.enterPrice}</h6>
            </Link>
            <Tooltip title="Add to Cart">
              <IconButton
                onClick={() => dispatch(addToCart(item))}
                style={{ color: "black" }}
              >
                <ShoppingCartOutlined />
              </IconButton>
            </Tooltip>
            <Tooltip title="Wishlist">
              <IconButton
                onClick={() => dispatch(addToWishList(item))}
                style={{ color: "black" }}
              >
                <FavoriteBorder />
              </IconButton>
            </Tooltip>
            <Tooltip title="View Product">
              <IconButton>
                <Link
                  to={`/productdetail/${item.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Visibility />
                </Link>
              </IconButton>
            </Tooltip>
          </Card>
        </Grid>
      </Box>
    ));

  // if (renderProducts.length === 0) {
  //   return <h3 style={{marginTop: "200px", marginBottom: "200px", textAlign: "center"}}>No products found.</h3>;
  // }

  return (
    <>
      <Container style={{ maxWidth: "100%" }}>
        <Typography
          variant="h3"
          align="center"
          marginBottom="20px"
          marginTop="100px"
        >
          Products List
        </Typography>
        <section>
          <Container>
            <Row>
              <Col lg="5" md="4">
                <FormControl sx={{ ml: 8, mt: 4, minWidth: 300 }} size="medium">
                  <InputLabel id="demo-select-small-label">
                    Filter by Type
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    label="Filter by Type"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Clutch">Clutch</MenuItem>
                    <MenuItem value="Bucket">Bucket</MenuItem>
                    <MenuItem value="Backpack">Backpack</MenuItem>
                    <MenuItem value="Handbag">Handbag</MenuItem>
                    <MenuItem value="Crossbody">Crossbody</MenuItem>
                    <MenuItem value="MakeupBag"> MakeUpBag</MenuItem>
                  </Select>
                </FormControl>
              </Col>

              {/* <Container maxWidth="md" sx={{ mt: 2}} > */}
              <Col lg="4" md="4">
                <TextField
                  id="search"
                  type="search"
                  label="Search Name"
                  // value={searchTerm}
                  onChange={(e) => {
                    setSearch(e.target.value.toLocaleLowerCase());
                  }}
                  sx={{ width: 350, mt: 3 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Col>
              {/* </Container> */}

              {/* <Col lg="4" md="4">
                <div className={classes.searchbox}>
                  <input
                    type="text"
                    onChange={(e) => {
                      setSearch(e.target.value.toLocaleLowerCase());
                    }}
                    className={classes.input}
                    placeholder="Search...."
                  />
                  <span>
                    <SearchOutlinedIcon />
                  </span>
                </div>
              </Col> */}
            </Row>
            {renderSkeletons}
          </Container>
          {/* </section>
          <ProductList />
        <section> */}
        </section>
        <Container>
          <Grid container justifyContent={"center"} sx={{ margin: "50px" }}>
            {renderProducts}
          </Grid>
        </Container>
      </Container>
    </>
  );
}

export default Product;

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
  filter_widget: {},
  select: {
    padding: "8px 20px",
    border: "1px solid grey",
    cursor: "pointer",
    borderRadius: "5px",
  },
  searchbox: {
    width: "100%",
    marginLeft: "65px",
    display: "flex",
    alignItems: "center",
    // justifyContent: "space-between",
    border: "1px solid grey",
    borderRadius: "5px",
    paddingRight: "10px",
  },
  input: {
    width: "100%",
    border: "none",
    outline: "none",
    padding: "10px",
  },
}));

// const renderProducts = searchProducts.map((item) => (
//   <Box sx={{ flex: "1", textAlign: "center" }}>
//     <Grid item key={item.id}>
//       <Card
//         className={classes.hovers}
//         sx={{
//           border: "1px solid lightgray",
//           margin: "10px",
//           boxShadow: "0.5px 0.5px 0.5px 0.5px solid gray",
//           width: "250px",
//           height: "350px",
//         }}
//       >
//         <Link
//           to={`/productdetail/${item.id}`}
//           style={{ textDecoration: "none", color: "black" }}
//         >
//           <img src={item.image} height="170px" />
//           <h4 style={{ margin: 10 }}>{item.name}</h4>
//           <h6 style={{ margin: 10 }}>₹{item.pricesArray}</h6>
//         </Link>
//         <Tooltip title="Add to Cart">
//           <IconButton style={{ color: "black" }}>
//             <ShoppingCartOutlined onClick={() => dispatch(addToCart(item))} />
//           </IconButton>
//         </Tooltip>
//         <Tooltip title="Wishlist">
//           <IconButton style={{ color: "black" }}>
//             <FavoriteBorder onClick={() => dispatch(addToWishList(item))} />
//           </IconButton>
//         </Tooltip>
//         <Tooltip title="View Product">
//           <IconButton>
//             <Link
//               to={`/productdetail/${item.id}`}
//               style={{ textDecoration: "none", color: "black" }}
//             >
//               <Visibility
//               // onClick={() => dispatch(ProductDetail(item))}
//               />
//             </Link>
//           </IconButton>
//         </Tooltip>
//       </Card>
//     </Grid>
//   </Box>
// ));

// const handleSearch = (e) => {
//   const searchItem = e.target.value;

//   const searchProducts = products.filter((item) =>
//     item.name.toLowerCase().includes(searchItem.toLowerCase())
//   );

//   setProductsdata(searchProducts);
// };

// const [productsdata, setProductsdata] = useState(products);

// const handleFilter = (e) => {
//   const filterValue = e.target.value;
//   if(filterValue === "Backpack") {
//     const filteredProducts = products.filter(
//       (item) => item.categories === "Backpack"
//     )
//     setProductsdata(filteredProducts);
//   }
//   if(filterValue === "Clutch") {
//     const filteredProducts = products.filter(
//       (item) => item.categories === "Clutch"
//     )
//     setProductsdata(filteredProducts);
//   }
//   if(filterValue === "Bucket") {
//     const filteredProducts = products.filter(
//       (item) => item.categories === "Bucket"
//     )
//     setProductsdata(filteredProducts);
//   }
//   if(filterValue === "Crossbody") {
//     const filteredProducts = products.filter(
//       (item) => item.categories === "Crossbody"
//     )
//     setProductsdata(filteredProducts);
//   }
//   if(filterValue === "MakeUpBag") {
//     const filteredProducts = products.filter(
//       (item) => item.categories === "MakeUpBag"
//     )
//     setProductsdata(filteredProducts);
//   }
// }
