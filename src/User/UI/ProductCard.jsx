import React from 'react'
import PrdctImg from "../image/myp8.png";
import {motion } from "framer-motion"
import { CardTravelRounded } from '@material-ui/icons'
import { makeStyles } from "@material-ui/core";
import { Col } from 'reactstrap';
import { Padding } from '@mui/icons-material';


const ProductCard = () => {

    const classes = useStyles();

  return (
   <Col lg="3" md="4">
         <div className={classes.product_item}>
        <div className={classes.img}>
            <img src={PrdctImg} style={{height: "200px", width: "200px"}}/>
        </div>
        <div className={classes.product_info}>
        <h3 className={classes.product_name}>Modern purse</h3>
        <span>Purse</span>
        </div>
       
        <div className={classes.product_card_bottom}>
            <span>₹1200</span>
            <span><CardTravelRounded /></span>
        </div>
    </div>
   </Col>
  )
}

export default ProductCard

const useStyles = makeStyles((theme) => ({
    product_item: {
     
    },
    img : {
        
    },
    product_info : {
        padding: 2,
        fontSize: "1.1rem",
        fontWeight: 600,
        marginTop : "15px",
    },
    product_card_bottom :{
        display: "flex",
        alignItems :"center",
        justifyContent: "space-between",
        Padding: "2px",
    }
  }));