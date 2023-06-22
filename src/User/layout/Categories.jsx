import styled from "styled-components";
import { categories } from "../helpers/DummyProduct";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
`;


const Categories = () => {
  return (
    <>
    <h1 style={{textAlign: "center", marginTop:"70px"}}>Trending Products</h1>
    <Container>
          {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
    </>
  )
}

export default Categories