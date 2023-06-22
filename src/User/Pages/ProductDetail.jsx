import fire from "../helpers/db";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../helpers/DummyProduct";
import { Grid, Typography, Button, Rating, Container } from "@mui/material";
import { addToCart } from "../screens/CartSlice";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { FavoriteBorder } from "@material-ui/icons";
import { addToWishList } from "../screens/WishSlice";
import { Row, Col } from "reactstrap";
import { makeStyles } from "@material-ui/core";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
// import useGetData from "../Admin/useGetData";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
  height: "300px",
  width: "300px",
});

const ProductDetail = () => {
  const [value, setValue] = React.useState(2);

  const classes = useStyles();

  const [product, setProduct] = useState(null);

  const [tab, setTab] = useState("desc");
  const dispatch = useDispatch();
  const { id } = useParams();

  // const {data: products} = useGetData('products')
  // const docRef = doc(fire, 'products' , id )

  useEffect(() => {
    const getProduct = async () => {
      const db = fire.firestore();
      const docRef = db.collection("products").doc(id);
      const doc = await docRef.get();
      if (doc.exists) {
        setProduct(doc.data());
      } else {
        console.log("No such document!");
      }
    };
    getProduct();
  }, [id]);

  return (
    <>
      <Container
        sx={{
          p: 2,
          // margin: "auto",
          marginTop: "90px",
          marginBottom: "50px",
          maxWidth: 800,
          // color: "black",
          // '& > legend': { mt: 2 },
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "white" : "dark",
        }}
      >
        <Grid container spacing={4}>
          {/*<Grid item xs={12} sm container> */}
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              {product && (
                <>
                  <Typography key={product.id}>
                    <Img src={product.image} />
                  </Typography>
                  <Typography gutterBottom variant="h4" component="div">
                    {product.name}
                  </Typography>

                  <Typography variant="h6" component="div">
                    ₹{product.enterPrice}
                  </Typography>
                  <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                  <p>({product.avgRating} ratings)</p>
                  <Typography variant="subtitle1" component="div">
                    <span>Category: {product.category}</span>
                  </Typography>
                  <Typography variant="subtitle2">
                    {product.description}
                  </Typography>
                  <Typography
                    style={{
                      marginTop: "30px",
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => dispatch(addToCart(product))}
                    >
                      Add To Cart
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => dispatch(addToWishList(product))}
                    >
                      Add To <FavoriteBorder />
                    </Button>
                  </Typography>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
        {/* </Grid> */}
        <section>
          <Container>
            <Row>
              <Col lg="12">
                <div className={classes.tabWrapper}>
                  <h5
                    className={`${tab === "desc" ? "activeTab" : ""}`}
                    onClick={() => setTab("desc")}
                  >
                    Description
                  </h5>
                  <h5
                    className={`${tab === "rev" ? "activeTab" : ""}`}
                    onClick={() => setTab("rev")}
                  >
                    Reviews()
                    {/* ({product.avgRating}) */}
                  </h5>
                </div>
                {tab === "desc" ? (
                  <div className={classes.tabContent}>
                    {product && (
                      <>
                        <p>{product.desc}</p>
                      </>
                    )}
                    {/* <p>{product.desc}</p> */}
                  </div>
                ) : (
                  <div className={classes.review_form}>
                    <h4 className={classes.h4}>Leave Your Experience</h4>
                    <form action="">
                      <div className={classes.form_group}>
                        <input
                          type="text"
                          className={classes.form_input}
                          placeholder="Enter Name..."
                        />
                      </div>
                      <div className={classes.form_groups}>
                        <span className={classes.form_span}>
                          1 <StarOutlinedIcon />
                        </span>
                        <span className={classes.form_span}>
                          2 <StarOutlinedIcon />
                        </span>
                        <span className={classes.form_span}>
                          3 <StarOutlinedIcon />
                        </span>
                        <span className={classes.form_span}>
                          4 <StarOutlinedIcon />
                        </span>
                        <span className={classes.form_span}>
                          5 <StarOutlinedIcon />
                        </span>
                      </div>
                      <div className={classes.form_group}>
                        <textarea
                          rows={4}
                          className={classes.form_input}
                          placeholder="Review Message..."
                        />
                      </div>
                      <Button type="submit" variant="contained" color="primary">
                        Submit
                      </Button>
                    </form>
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        </section>
      </Container>
    </>
  );
};

export default ProductDetail;

const useStyles = makeStyles((theme) => ({
  tabWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 30,
    fontWeight: 800,
    cursor: "pointer",
    // color: "#161b3b",
    fontSize: "5rem",
    marginTop: "20px",
  },
  activeTab: {
    fontWeight: 600,
  },
  tabContent: {
    marginTop: 15,
    fontSize: 15,
  },
  review_form: {
    width: "70%",
    margin: "auto",
    marginTop: "40px",
  },
  h4: {
    fontSize: "1.2rem",
    fontWeight: 600,
    marginBottom: "30px",
  },
  form_group: {
    marginBottom: "30px",
  },
  form_input: {
    width: "100%",
    border: "1px solid #161b3b",
    borderRadius: "5px",
    padding: "8px 20px",
  },
  form_groups: {
    marginBottom: "30px",
    display: "flex",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
  },
  form_span: {
    display: "flex",
    alignItems: "center",
    columnGap: "5px",
    color: "orange",
    fontWeight: 600,
  },
}));

// import React, {useEffect, useRef, useState} from "react";
// import { useParams } from "react-router-dom";
// import { products } from "../helpers/DummyProduct";
// import {
//   Grid,
//   Typography,
//   Button,
//   Rating,
//   Container,
// } from "@mui/material";
// import { addToCart } from "../screens/CartSlice"
// import { useDispatch } from "react-redux";
// import styled from "styled-components";
// import { FavoriteBorder } from "@material-ui/icons";
// import { addToWishList } from "../screens/WishSlice";
// import Footer from "../layout/Footer";
// import Products from "../layout/prdcts";
// import { Row, Col } from "reactstrap";
// import { makeStyles } from "@material-ui/core";
// import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

// import { db } from "../helpers/db";
// import {doc, getDoc} from "firebase/firestore"
// import UseGetData from "../helpers/UseGetData";

// const Img = styled('img')({
//     margin: 'auto',
//     display: 'block',
//     maxWidth: '100%',
//     maxHeight: '100%',
//     height: "400px",
//     width: "400px"
// });

// const ProductDetail = () => {
//   const dispatch = useDispatch();
//   const { id } = useParams();

//   // const { data: products } = UseGetData("products");

//   const item = products.find((item) => item.id == id);
//   console.log(item);

//   const [value, setValue] = React.useState(2);

//   const classes = useStyles();

//   const [tab, setTab] = useState('desc');

//   // const [product, setProduct] = useState({});

//   // const docRef = doc(db, 'products', id)

//   // useEffect(() => {
//   //   const getProduct = async() => {
//   //     const docSnap = await getDoc(docRef)

//   //     if(docSnap.exists()) {
//   //       setProduct(docSnap.data())
//   //     }else {
//   //       console.log("No Found.")
//   //     }
//   //   }
//   //   getProduct()
//   // }, [])

//   return (
//     <>
//       <Container
//         sx={{
//           p: 2,
//           // margin: "auto",
//           marginTop: "90px",
//           marginBottom: "50px",
//           maxWidth: 800,
//           // color: "black",
//         // '& > legend': { mt: 2 },
//           flexGrow: 1,
//           backgroundColor: (theme) =>
//             theme.palette.mode === "dark" ? "white" : "dark",
//         }}
//       >
//         <Grid container spacing={4}>
//           <Grid item>
//             <Container>
//               <Img src={item.image}  />
//             </Container>
//           </Grid>
//           <Grid item xs={12} sm container>
//             <Grid item xs container direction="column" spacing={2}>
//               <Grid item xs>
//                 <Typography gutterBottom variant="h4" component="div">
//                   {item.name}
//                 </Typography>
//                 <Typography variant="h6" component="div">
//                 ₹{item.price}
//               </Typography>
//                 <Rating
//                     name="simple-controlled"
//                     value={value}
//                     onChange={(event,newValue) => {
//                     setValue(newValue);
//                     }}
//                 />
//                 <p>({item.avgRating}  ratings)</p>
//                 <Typography variant="subtitle1" component="div">
//                   <span>Category: {item.categories}</span>
//                 </Typography>
//                 <Typography variant="subtitle2">
//                   {item.description}
//                 </Typography>
//                 <Typography style={{marginTop: "30px", display: "flex", gap: "10px"}}>
//                   <Button variant="contained" onClick={() => dispatch(addToCart(item))} >Add To Cart</Button>
//                   <Button  variant="outlined" color="primary" onClick={() => dispatch(addToWishList(item))} >Add To <FavoriteBorder /></Button>
//                 </Typography>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>
//         <section>
//         <Container >
//           <Row>
//             <Col lg="12">
//                 <div className={classes.tabWrapper}>
//                   <h5 className={`${tab === 'desc' ? 'activeTab' : ''}`}
//                   onClick={() => setTab('desc')}>Description</h5>
//                   <h5 className={`${tab === 'rev' ? 'activeTab' : ''}`}
//                   onClick={() => setTab('rev')}>Reviews({item.avgRating})</h5>
//                 </div>
//                 {
//                   tab === 'desc' ? <div className={classes.tabContent} >
//                   <p>{item.desc}</p>
//                   </div> :
//                   <div className={classes.review_form}>
//                     <h4 className={classes.h4}>Leave Your Experience</h4>
//                     <form action="">
//                     <div className={classes.form_group}>
//                       <input type="text" className={classes.form_input} placeholder="Enter Name..." />
//                     </div>
//                     <div className={classes.form_groups}>
//                       <span className={classes.form_span}>1 <StarOutlinedIcon /></span>
//                       <span className={classes.form_span}>2 <StarOutlinedIcon /></span>
//                       <span className={classes.form_span}>3 <StarOutlinedIcon /></span>
//                       <span className={classes.form_span}>4 <StarOutlinedIcon /></span>
//                       <span className={classes.form_span}>5 <StarOutlinedIcon /></span>
//                     </div>
//                     <div className={classes.form_group}>
//                       <textarea rows={4} className={classes.form_input} placeholder="Review Message..." />
//                     </div>
//                     <Button type="submit" variant="contained" color="primary">Submit</Button>
//                     </form>
//                   </div>
//                 }

//             </Col>
//           </Row>
//         </Container>
//       </section>
//       </Container>

//     </>
//   );
// };

// export default ProductDetail;

// const useStyles = makeStyles((theme) => ({
//   tabWrapper : {
//     display: "flex",
//     alignItems: "center",
//     gap: 30,
//     fontWeight: 800,
//     cursor: "pointer",
//     // color: "#161b3b",
//     fontSize: "5rem",
//     marginTop: "20px"
//   },
//   activeTab :{
//       fontWeight: 600,
//   },
//   tabContent: {
//     marginTop: 15,
//     fontSize: 15,
//   },
//   review_form: {
//     width: "70%",
//     margin: "auto",
//     marginTop: "40px",
//   },
//   h4: {
//     fontSize: "1.2rem",
//     fontWeight: 600,
//     marginBottom: "30px",
//   },
//   form_group : {
//     marginBottom: "30px",
//   },
//   form_input : {
//     width: '100%',
//     border: "1px solid #161b3b",
//     borderRadius: "5px",
//     padding: "8px 20px",
//   },
//   form_groups : {
//     marginBottom: "30px",
//     display: "flex",
//     alignItems: "center",
//     gap: 8,
//     cursor: "pointer",
//   },
//   form_span : {
//     display: "flex",
//     alignItems :"center",
//     columnGap: "5px",
//     color: "orange",
//     fontWeight: 600,
//   },
// }));
