import styled from "styled-components";
import { products } from "../helpers/DummyProduct"
import Product from "../Pages/Product";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const ProductList = () => {
  return (
    <>
    <Container>
      {products.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
    </>
  );
};

export default ProductList;