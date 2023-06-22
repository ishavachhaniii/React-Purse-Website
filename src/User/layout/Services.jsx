import React from "react";
import { Col, Container, Row } from "reactstrap";
import { makeStyles } from "@material-ui/core";
import Servicedata from "../helpers/SeviceData";

const Services = () => {
  const classes = useStyles();

  return (
    <section className={classes.services}>
      <Container>
        <Row>
          {Servicedata.map((item, index) => (
            <Col lg="3" md="4" key={index}>
              <div className={classes.service_item}>
                <span className={classes.icon}>{item.icon}</span>
                <div>
                  <h3 className={classes.heading}>{item.title}</h3>
                  <p className={classes.para}>{item.subtitle}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Services;

const useStyles = makeStyles((theme) => ({
  services: {},
  service_item: {
    padding: "20px",
    background: "#f5f0f0",
    display: "flex",
    alignItems: "center",
    columnGap: "0.8rem",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.4s ease",
    "&:hover" : {
        transform: "scale(1.1)",
    }
  },
  icon: {
    background: "#e7d0d0",
    padding: "10px",
    borderRadius: "50%",
    fontWeight: "400 !important",
  },
  heading: {
    color: "#242444",
    fontSize: "1rem",
    fontWeight: "600",
  },
  para: {
    fontSize: "0.9rem",
    marginTop: "5px",
    color: "grey",
  },
}));
