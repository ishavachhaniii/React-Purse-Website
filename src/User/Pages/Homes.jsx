import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../helpers/DummyProduct";
import Footer from "../layout/Footer";
import Categories from "../layout/Categories";
import { Link } from "react-router-dom";
import Products from "../layout/prdcts";
import NewsLetter from "../layout/NewsLetter";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fade from "@mui/material/Fade";
import Toolbar from "@mui/material/Toolbar";
import Services from "../layout/Services";
import ProductList from "./ProductList";
// import ProductList from "../UI/ProductList";
import { Col, Row } from "reactstrap";
import Product from "./Product";

const Container = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  position: sticky;
  overflow: hidden;
  margin-top: 10px;
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
  max-width: 100%;
  //transition: all 0.4s ease;
  //&:hover {
  // background-color: black;
  //transform: scale(1.1);
  //}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 40px;
  // max-width: 100%;
`;

const Title = styled.h1`
  font-size: 50px;
  // max-width: 100%;
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 3px;
  // max-width: 100%;
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
          sx={{ position: "fixed", bottom: 40, right: 16 }}
        >
          {children}
        </Box>
      </Fade>
    );
  }

  return (
    <React.Fragment>
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
      </Container>
      <Services />
      <Categories />
      <Products />
      <Product />
      {/* <ProductList /> */}
      <NewsLetter />
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
};

export default Home;
