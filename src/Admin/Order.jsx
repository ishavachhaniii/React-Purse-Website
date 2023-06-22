import React from "react";
import { Container, Row, Col } from "reactstrap";
import UseGetData from "../User/helpers/UseGetData";
import DeleteIcon from "@mui/icons-material/Delete";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../User/helpers/db";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Divider,
} from "@material-ui/core";

const Order = () => {
  const { data: userData, loading } = UseGetData("forms");

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "forms", id));
    toast.success("Order deleted!");
  };

  return (
    <Container>
      <Row>
        <Col lg="12">
          <h2 style={{ marginTop: "30px", textAlign: "center" }}>
            Order Details
          </h2>
        </Col>
        <Col lg="12" className="pt-5">
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell>Order Id</TableCell> */}
                <TableCell>Image</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total Quantity</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Mobile No.</TableCell>
                <TableCell>Payment Method</TableCell>
                {/* <TableCell>Action</TableCell> */}
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <h5 className="pt-5 fw-bold">Loading.....</h5>
              ) : (
                userData?.map((order) => (
                  <TableRow key={order.id}>
                    {/* <TableCell>{order.oid}</TableCell> */}
                    <TableCell>
                      {order.cart &&
                        order.cart.map((item, index) => (
                          <React.Fragment key={item.id}>
                            <img src={item.image} style={{ height: "55px", width: "55px", marginBottom: "5px" }}/>
                            {index !== order.cart.length - 1 && <Divider />}
                          </React.Fragment>
                        ))}
                    </TableCell>
                    <TableCell>
                      {order.cart &&
                         order.cart.map((item, index) => (
                          <React.Fragment key={item.id}>
                            <h6 style={{ margin: "15px", textAlign:  "center" }}>{item.name}</h6>
                            {index !== order.cart.length - 1 && <Divider />}
                          </React.Fragment>
                         ))}
                    </TableCell>
                    <TableCell>
                      {order.cart &&
                         order.cart.map((item, index) => (
                          <React.Fragment key={item.id}>
                            <p style={{ margin: "15px" }}>{item.quantity}</p>
                            {index !== order.cart.length - 1 && <Divider/>}
                          </React.Fragment>
                         ))}
                    </TableCell>
                    <TableCell>{order.totalQuantity}</TableCell>
                    <TableCell>₹{order.totalPrice}</TableCell>
                    <TableCell>{order.fname}</TableCell>
                    <TableCell>{order.email}</TableCell>
                    <TableCell>{order.mobile}</TableCell>
                    <TableCell>{order.paymentMethod}</TableCell>
                    {/* <TableCell>
                      <IconButton style={{ color: "red" }} onClick={() => {
                        deleteUser(order.id);
                      }}>
                        <DeleteIcon />
                        </IconButton>
                      </TableCell> */}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Order;
