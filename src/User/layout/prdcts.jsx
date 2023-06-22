import styled from "styled-components";
import { popularProducts } from "../helpers/DummyProduct";
import Product from "./Prdct";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = () => {
  return (
    <>
    <h1 style={{textAlign: "center", marginTop: "30px"}}>Best Sales</h1>
    <Container>
      {popularProducts.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
    </>
  );
};

export default Products;