import { Input, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Row, Col, Container, Form, FormGroup, Button } from "reactstrap";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import fire from "../helpers/db";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { TableRow } from "@material-ui/core";
import { clearCart } from "../screens/CartSlice";
import { InputLabel } from "@mui/material";

const Checkout = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [pin, setPin] = useState("");
  const [cardNo, setCardno] = useState("");
  const [cardName, setCardname] = useState("");
  const [expDate, setExpdate] = useState("");
  const [cvv, setCvv] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("cash");

  // const [cardName, setCardname] = useState("");
  // const [cardNumber, setCardnumber] = useState("");
  // const [expDate, setExpdate] = useState("");
  // const [cvv, setCvv] = useState("");

  const classes = useStyles();

  const dispatch = useDispatch();

  const { totalPrice, totalQuantity, cart } = useSelector(
    (state) => state.allCart
  );

  // const handleSubmit = (e) => {
  //    e.preventDefault();

  //    const Form = {
  //      fname: fname,
  //      lname: lname,
  //      email: email,
  //      mobile: mobile,
  //      address: address,
  //      city: city,
  //      pin: pin,
  //      country: country,
  //     //  cardName: cardName,
  //     //  cardNumber: cardNumber,
  //     //  expDate :expDate,
  //     //  cvv: cvv
  //    };
  //    localStorage.setItem("Form", JSON.stringify(Form));
  //  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFname("");
    setLname("");
    setEmail("");
    setMobile("");
    setAddress("");
    setCity("");
    setPin("");
    setCountry("");
    setCardno("");
    setCardname("");
    setExpdate("");
    setCvv("");
    setPaymentMethod("");
    localStorage.removeItem("cart");

    const formData = {
      fname: fname,
      lname: lname,
      email: email,
      mobile: mobile,
      address: address,
      city: city,
      pin: pin,
      country: country,
      cardNo: cardNo,
      cardName: cardName,
      expDate: expDate,
      cvv: cvv,
      paymentMethod: paymentMethod,
      totalQuantity: totalQuantity,
      totalPrice: totalPrice,
      cart: cart,
    };

    try {
      const db = fire.firestore();
      await db.collection("forms").add(formData);
      localStorage.setItem("Form", JSON.stringify(formData));
      console.log("Form data stored in Firestore.");
    } catch (error) {
      console.error("Error storing form data:", error);
    }

    const totalprice = {
      totalPrice: totalPrice,
    };

    try {
      const db = fire.firestore();
      await db.collection("totalprice").add(totalprice);
      localStorage.setItem("Totalprice", JSON.stringify(totalprice));
      console.log("TotalPrice stored in Firestore.");
    } catch (error) {
      console.error("Error storing form data:", error);
    }
    dispatch(clearCart());
  };

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <>
      <h1
        style={{ textAlign: "center", marginTop: "90px", marginBottom: "30px" }}
      >
        Ckeckout
      </h1>
      <section>
        <Container>
          <Form action="" onSubmit={handleSubmit}>
            <Row>
              <Col lg="8">
                <h5 className="mb-4 fw-bold">Billing Information</h5>
                <FormGroup>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    label="Enter Your Firstname"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    label="Enter Your Lastname"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label="Enter Your Email"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    label="Enter Your Mobile number"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    label="Enter Your Address"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    label="Enter Your City"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    label="Enter Your Country"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    label="Enter Your Postal Code"
                    required
                  />
                </FormGroup>
                {/* <FormGroup>
                  <Button>Submit</Button>
                </FormGroup> */}
              </Col>

              <Col lg="4">
                <h5 style={{ textAlign: "center", marginBottom: "15px" }}>
                  Cart Details{" "}
                </h5>
                {cart?.map((data) => (
                  <TableRow key={data.id}>
                    <div className="d-flex">
                      <img src={data.image} style={{ width: "90px" }} />
                      <div className="flex-details">
                        <div>
                          <InputLabel><b>Product name :</b> {data.name}</InputLabel>
                          {/* <p>{data.name}</p> */}
                        </div>
                        <div>
                          <InputLabel><b>Quantity :</b> {data.quantity}</InputLabel>
                          {/* <p>{data.quantity}</p> */}
                        </div>
                      </div>
                    </div>
                  </TableRow>
                ))}
                <div className={classes.checkout_cart}>
                  <h6 className={classes.detail_h6}>
                    Total Quantity : <span>{totalQuantity} Items</span>
                  </h6>
                  <h6 className={classes.detail_h6}>
                    Sub Total : <span>₹{totalPrice}</span>
                  </h6>
                  <h6 className={classes.detail_h6}>
                    <span>
                      Shipping : <br /> Free Shipping
                    </span>
                    <span>₹{0}</span>
                  </h6>
                  <h4 className={classes.detail_h4}>
                    Total Cost : <span>₹{totalPrice}</span>
                  </h4>

                  <Button className="w-100">
                    <Link style={{ textDecoration: "none", color: "white" }}>
                      Place an Order
                    </Link>
                  </Button>
                </div>
              </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col lg="8">
                <h5 className="mb-4 fw-bold">Payment Information</h5>
                <RadioGroup
                  row
                  name="paymentMethod"
                  value={paymentMethod}
                  onChange={handlePaymentChange}
                >
                  <FormControlLabel
                    value="online"
                    control={<Radio />}
                    label="Online Payment"
                  />
                  <FormControlLabel
                    value="cod"
                    control={<Radio />}
                    label="Cash on Delivery"
                  />
                </RadioGroup>

                {paymentMethod === "online" && (
                  <div>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          required
                          id="cardName"
                          label="Name on card"
                          fullWidth
                          autoComplete="cc-name"
                          // variant="filled"
                          value={cardName}
                          onChange={(e) => setCardname(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          required
                          id="cardNumber"
                          label="Card number"
                          fullWidth
                          autoComplete="cc-number"
                          // variant="filled"
                          value={cardNo}
                          onChange={(e) => setCardno(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Input
                          type="date"
                          required
                          label="Expiry date"
                          fullWidth
                          autoComplete="cc-exp"
                          // variant="filled"
                          value={expDate}
                          onChange={(e) => setExpdate(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Input
                          type="number"
                          required
                          id="cvv"
                          label="CVV"
                          placeholder="CVV*"
                          fullWidth
                          autoComplete="cc-csc"
                          // variant="filled"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="secondary"
                              name="saveCard"
                              value="yes"
                            />
                          }
                          label="Remember credit card details for next time"
                        />
                      </Grid>
                    </Grid>
                  </div>
                )}
                <FormGroup>
                  <Button style={{ marginTop: "20px" }}>Submit</Button>
                </FormGroup>
              </Col>
            </Row>
            {/* <Row>
              <Col lg="8">
                <h5 className="mb-4 fw-bold">Shipping Address</h5>
              <Grid item xs={12} md={6}>
              <FormGroup>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    label="Enter Your Address"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    label="Enter Your City"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    label="Enter Your Country"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    label="Enter Your Postal Code"
                    required
                  />
                </FormGroup>
                  <Button>Submit</Button>
                </Grid>
              </Col>

            </Row> */}
          </Form>
        </Container>
      </section>
    </>
  );
};

export default Checkout;

const useStyles = makeStyles((theme) => ({
  checkout_cart: {
    padding: "30px",
    marginTop: "20px",
    background: "#faf2f2",
    color: "black",
    borderRadius: "5px",
  },
  detail_h4: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "20px",
    borderTop: "1px solid black",
  },
  detail_h6: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
}));

// import React, { useState } from "react";
// import Grid from "@mui/material/Grid";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import { useSelector } from "react-redux";
// import styled from "styled-components";
// import { Link, useNavigate } from "react-router-dom";
// import { Container } from "reactstrap";
// import { Paper, Typography } from "@material-ui/core";
// import { useForm } from "react-hook-form";

// const Summary = styled.div`
//   // display: flex;
//   // flex: 1;
//   border: 0.5px solid lightgray;
//   border-radius: 10px;
//   padding: 20px;
//   // height: 30vh;
//   // width: 500px;
//   margin-top: 20px;
// `;

// const SummaryTitle = styled.h1`
//   font-weight: 200;
// `;

// const SummaryItem = styled.div`
//   margin: 30px 0px;
//   display: flex;
//   justify-content: space-between;
//   font-weight: ${(props) => props.type === "total" && "500"};
//   font-size: ${(props) => props.type === "total" && "24px"};
// `;

// const SummaryItemText = styled.span``;

// const SummaryItemPrice = styled.span``;

// const Button = styled.button`
//   width: 100%;
//   padding: 10px;
//   background-color: #e7d0d0;
//   font-weight: 600;
//   border: 2px solid #dec3c3;
// `;

// const Checkout = () => {
//   const [names, setNames] = useState("");
//   const [username, setUsername] = useState("");
//   const [add1, setAdd1] = useState("");
//   const [add2, setAdd2] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [pin, setPin] = useState("");
//   const [coutry, setCountry] = useState("");
//   const [cardName, setCardname] = useState("");
//   const [cardNumber, setCardnumber] = useState("");
//   const [expDate, setExpdate] = useState("");
//   const [cvv, setCvv] = useState("");

//   const { totalQuantity, totalPrice } = useSelector((state) => state.allCart);

//   const navigate = useNavigate();

//   const handle = (e) => {
//     e.preventDefault();
//     navigate("/thanks");

//     const Form = {
//       name: names,
//       username: username,
//       add1: add1,
//       add2: add2,
//       city: city,
//       state: state,
//       pin: pin,
//       country: coutry,
//       cardName: cardName,
//       cardNumber: cardNumber,
//       expDate :expDate,
//       cvv: cvv
//     };
//     localStorage.setItem("Form", JSON.stringify(Form));
//   };
//   return (
//     <React.Fragment>
//       <Typography variant="h4" style={{textAlign: "center", marginBottom: "20px"}}>Checkout</Typography>
//       <Container>
//         <form action="" onSubmit={handle}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 fullWidth
//                 required
//                 id="FirstName"
//                 name="FirstName"
//                 label="First name"
//                 value={names}
//                 onChange={(e) => setNames(e.target.value)}
//                 autoComplete="family-name"
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 fullWidth
//                 required
//                 id="lastName"
//                 name="lastName"
//                 label="Last name"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 autoComplete="family-name"
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 fullWidth
//                 required
//                 id="address1"
//                 name="address1"
//                 label="Address line 1"
//                 value={add1}
//                 onChange={(e) => setAdd1(e.target.value)}
//                 autoComplete="shipping address-line1"
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 fullWidth
//                 required
//                 id="address2"
//                 name="address2"
//                 label="Address line 2"
//                 value={add2}
//                 onChange={(e) => setAdd2(e.target.value)}
//                 autoComplete="shipping address-line2"
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 fullWidth
//                 required
//                 id="city"
//                 name="city"
//                 label="City"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//                 autoComplete="shipping address-level2"
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 fullWidth
//                 required
//                 id="state"
//                 name="state"
//                 label="State"
//                 value={state}
//                 onChange={(e) => setState(e.target.value)}
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 fullWidth
//                 required
//                 id="country"
//                 name="country"
//                 label="Country"
//                 value={coutry}
//                 onChange={(e) => setCountry(e.target.value)}
//                 autoComplete="shipping country"
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 fullWidth
//                 required
//                 id="zip"
//                 name="zip"
//                 value={pin}
//                 onChange={(e) => setPin(e.target.value)}
//                 label="Zip / Postal code"
//                 autoComplete="shipping postal-code"
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 fullWidth
//                 required
//                 id="cardname"
//                 name="Card Name"
//                 value={cardName}
//                 onChange={(e) => setCardname(e.target.value)}
//                 label="Card Name"
//                 autoComplete="card name"
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 required
//                 id="cardNumber"
//                 value={cardNumber}
//                 onChange={(e) => setCardnumber(e.target.value)}
//                 label="Card number"
//                 fullWidth
//                 autoComplete="cc-number"
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <TextField
//                 required
//                 id="expDate"
//                 value={expDate}
//                 onChange={(e) => setExpdate(e.target.value)}
//                 label="Expiry date"
//                 fullWidth
//                 autoComplete="cc-exp"
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12} md={4 }>
//               <TextField
//                 required
//                 id="cvv"
//                 label="CVV"
//                 value={cvv}
//                 onChange={(e) => setCvv(e.target.value)}
//                 helperText="Last three digits on signature strip"
//                 fullWidth
//                 autoComplete="cc-csc"
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <FormControlLabel
//                 control={
//                   <Checkbox color="primary" name="saveAddress" value="yes" />
//                 }
//                 label="Use this address for payment details"
//               />
//             </Grid>
//           </Grid>
//           <br />
//           <button
//             type="submit"
//             style={{
//               border: "1px solid black",
//               color: "white",
//               backgroundColor: "black",
//               borderRadius: "5px",
//               fontFamily: "bold",
//               fontSize: "20px",
//             }}
//             onClick={handle}
//           >
//             Place Order
//           </button>
//         </form>
//         <Grid item xs={12} sm={4}>
//         <Summary>
//           <SummaryTitle>ORDER SUMMARY</SummaryTitle>
//           <SummaryItem>
//             <SummaryItemText>Quantity</SummaryItemText>
//             <SummaryItemPrice>{totalQuantity}</SummaryItemPrice>
//           </SummaryItem>
//           <SummaryItem type="total">
//             <SummaryItemText>Total</SummaryItemText>
//             <SummaryItemPrice>₹{totalPrice}</SummaryItemPrice>
//           </SummaryItem>
//           <Button>
//             <Link to="/" style={{ textDecoration: "none", color: "white" }}>
//               Back To Home
//             </Link>
//           </Button>
//         </Summary>
//         </Grid>
//       </Container>
//     </React.Fragment>
//   );
// };
// export default Checkout;
