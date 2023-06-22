import { Container } from "@mui/material";
import { Row, Col } from "reactstrap";
import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core";
import UseGetData from "../User/helpers/UseGetData";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const classes = useStyles();

  const [totalPrice, setPrice] = useState("");

  const {data: products} = UseGetData('products')
  const {data: users} = UseGetData('users')
  const {data: forms} = UseGetData('forms')
  const {data: totalprice} = UseGetData('totalprice')

  useEffect(() => {
    if (totalprice && totalprice.length > 0) {
      const totalPriceValue = totalprice.reduce(
        (acc, curr) => acc + curr.totalPrice,
        0
      );
      setPrice(totalPriceValue);
    }
  }, [totalprice]);

  return (
    <>
      <section style={{margin: "100px"}}>
        <Container>
          <Row>
            <Col className="lg-3">
              <div className={classes.sales_box}>
                <h5>Total Sales</h5>
                <span>₹{totalPrice}</span>
              </div>
            </Col>
            <Col className="lg-3">
              <div className={classes.order_box}>
                <h5>Total Orders</h5>
                <span>{forms.length}</span>
              </div>
            </Col>
            <Col className="lg-3">
              <div className={classes.product_box}>
                <h5>Total Products</h5>
                <span>{products.length}</span>
              </div>
            </Col>
            <Col className="lg-3">
              <div className={classes.user_box}>
                <h5>Total Users</h5>
                <span>{users.length}</span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Dashboard;

const useStyles = makeStyles((theme) => ({
  sales_box: {
    fontSize: "1.2rem",
    padding: "20px",
    borderRadius: "5px",
    background: "#CBE4F9",
    color: "black",
    cursor: "pointer",
    transition: "all 0.4s ease",
    "&:hover" : {
        transform: "scale(1.1)",
    }
  },
  order_box: {
    fontSize: "1.2rem",
    padding: "20px",
    borderRadius: "5px",
    background: " #CDF5F6",
    color: "black",
    cursor: "pointer",
    transition: "all 0.4s ease",
    "&:hover" : {
        transform: "scale(1.1)",
    }
  },
  product_box : {
    fontSize: "1.2rem",
    padding: "20px",
    borderRadius: "5px",
    background: "#EFF9DA",
    color: "black",
    cursor: "pointer",
    transition: "all 0.4s ease",
    "&:hover" : {
        transform: "scale(1.1)",
    }
  },
  user_box : {
    fontSize: "1.2rem",
    padding: "20px",
    borderRadius: "5px",
    background: " #D6CDEA",
    color: "black",
    cursor: "pointer",
    transition: "all 0.4s ease",
    "&:hover" : {
        transform: "scale(1.1)",
    }
  }
}));
