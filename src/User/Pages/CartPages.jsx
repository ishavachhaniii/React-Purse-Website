import { Add, Delete, Remove } from "@material-ui/icons";
import { Tooltip } from "@mui/material";
import styled from "styled-components";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCartTotal,
  removeItem,
  decreaseItemQuantity,
  increaseItemQuantity,
} from "../screens/CartSlice";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  margin-top: 40px;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div``;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
  font-size: 18px;
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 20px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 25px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
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
  background-color: #bd9191;
  font-weight: 600;
  margin-bottom: 20px;
`;

const CartPage = () => {
  const { cart, totalQuantity, totalPrice } = useSelector(
    (state) => state.allCart
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);

  return (
    <>
      <Container>
        <Wrapper>
          <Title>YOUR BAG</Title>
          <Top>
            {/* <TopButton>
              <Link
                to="/product"
                style={{ textDecoration: "none", color: "grey" }}
              >
                CONTINUE SHOPPING
              </Link>
            </TopButton> */}
            <TopTexts>
              <TopText>Cart Items ({cart.length})</TopText>
              <TopText>Your Wishlist (0)</TopText>
            </TopTexts>
            {/* <TopButton type="filled">
              <Link
                to="/product"
                style={{ textDecoration: "none", color: "white" }}
              >
                CONTINUE SHOPPING
              </Link>
            </TopButton> */}
          </Top>
          <Bottom>
            {cart.length === 0 && (
              <div
                style={{
                  fontFamily: "bold",
                  fontSize: "25px",
                  marginLeft: "20px",
                }}
              >
                No Items are Added.
              </div>
            )}
            <Info>
              {cart?.map((data) => (
                <Product key={data.id}>
                  <ProductDetail>
                    <Image src={data.image} />
                    <Details>
                      <ProductName>
                        <b>Product : </b> {data.name}
                      </ProductName>
                      <Tooltip title="Delete">
                        <Delete
                          onClick={() => dispatch(removeItem(data.id))}
                          style={{ marginLeft: "20px" }}
                        />
                      </Tooltip>
                    </Details>
                  </ProductDetail>

                  <PriceDetail>
                    <ProductAmountContainer>
                      <Add
                        onClick={() => dispatch(increaseItemQuantity(data.id))}
                      />
                        <ProductAmount>{data.quantity}</ProductAmount>
                      <Remove
                        onClick={() => dispatch(decreaseItemQuantity(data.id))}
                      />
                    </ProductAmountContainer>
                    <ProductPrice>₹{data.enterPrice}</ProductPrice>
                  </PriceDetail>
                </Product>
              ))}
              <Hr />
            </Info>
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
                <Link
                  to="/checkout"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  CHECKOUT NOW
                </Link>
              </Button>
              <Button>
                <Link
                  to="/product"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  CONTINUE SHOPPING
                </Link>
              </Button>
            </Summary>
          </Bottom>
        </Wrapper>
      </Container>
    </>
  );
};

export default CartPage;

// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddBoxIcon from "@mui/icons-material/AddBox";
// import { IconButton, Input, Tooltip, Button } from "@mui/material";
// import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
// import "bootstrap/dist/css/bootstrap.css";
// import { Link } from 'react-router-dom';

// import {
//   getCartTotal,
//   removeItem,
//   decreaseItemQuantity,
//   increaseItemQuantity,
// } from "../screens/CartSlice";

// const CartPage = () => {
//   const { cart, totalQuantity, totalPrice } = useSelector(
//     (state) => state.allCart
//   );

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getCartTotal());
//   }, [cart]);

//   return (
//     <>
//     <div style={{marginTop: "70px"}}>
//       <section className="h-100 gradient-custom">
//         <div className="container py-3">
//           <div className="row d-flex justify-content-center my-4">
//             <div className="col-md-6">
//               <div className="card mb-4">
//                 <div className="card-header py-3">
//                   <h5 className="mb-0">Cart - {cart.length} items</h5>
//                 </div>
//                 <div className="card-body">
//                   {cart?.map((data) => (
//                     <div className="row">
//                       <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
//                         <div
//                           className="bg-image hover-overlay hover-zoom ripple rounded"
//                           data-mdb-ripple-color="light"
//                         >
//                           <img src={data.image} className="w-100" alt="" />
//                           {/* <strong>{data.name}</strong> */}
//                         </div>
//                       </div>

//                       <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
//                         <p>
//                           <strong>{data.name}</strong>
//                         </p>
//                         <Tooltip title="Delete">
//                           <IconButton
//                             //  type="button"
//                             //  className="btn btn-primary btn-sm me-1 mb-2"
//                             //  data-mdb-toggle="tooltip"
//                             //  title="Remove item"
//                             onClick={() => dispatch(removeItem(data.id))}
//                           >
//                             <DeleteIcon />
//                           </IconButton>
//                         </Tooltip>
//                       </div>

//                       <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
//                         <div
//                           className="d-flex mb-4"
//                           //  style={{ maxWidth: "300px" }}
//                         >
//                           <IconButton
//                             // className="btn btn-primary px-2 me-2"
//                             onClick={() =>
//                               dispatch(decreaseItemQuantity(data.id))
//                             }
//                           >
//                             <IndeterminateCheckBoxIcon />
//                             </IconButton>

//                           <div className="form-outline">
//                             <Input
//                               id="form1"
//                               min="0"
//                               name="quantity"
//                               value={data.quantity}
//                               type="number"
//                               className="form-control"
//                               onChange={() => null}
//                             />
//                             <label className="form-label" for="form1">
//                               Quantity
//                             </label>
//                           </div>

//                           <IconButton
//                             //  className="btn btn-primary px-2 ms-2"
//                             onClick={() =>
//                               dispatch(increaseItemQuantity(data.id))
//                             }
//                           >
//                             <AddBoxIcon />
//                           </IconButton>
//                         </div>

//                         <p className="text-start text-md-center">
//                           <strong>₹{data.price}</strong>
//                         </p>
//                       </div>
//                       <hr className="my-4" />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div className="card mb-4">
//                 <div className="card-header py-3">
//                   <h5 className="mb-0">Summary</h5>
//                 </div>
//                 <div className="card-body">
//                   <ul className="list-group list-group-flush">
//                     <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
//                       Total Quantity
//                       <span>{totalQuantity}</span>
//                     </li>

//                     <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
//                       <div>
//                         <strong>Total amount</strong>
//                       </div>
//                       <span>
//                         <strong>₹{totalPrice}</strong>
//                       </span>
//                     </li>
//                   </ul>
//                   <button
//                     type="button"
//                     className="btn btn-primary btn-lg btn-block"
//                   >
//                     <Link to="/checkout" style={{textDecoration: "none", color: "white"}}>
//                     Go to checkout
//                     </Link>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//     </>
//   );
// };

// export default CartPage;
