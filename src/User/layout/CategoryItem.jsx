import styled from "styled-components";
import { Link } from 'react-router-dom';

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
  transition: all 0.5s ease;
  &:hover {
    // background-color: black;
    transform: scale(1.1);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
    color:white;
    margin-bottom: 20px;
`;

const Button = styled.button`
    border: none;
    border-radius: 5px;
    padding: 10px;
    background-color: white;
    color:gray;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.5s ease;
    &:hover {
     background-color: #f6f2f2;
     transform: scale(1.1);
   }
`;


const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Button><Link to ="/product" style={{textDecoration: "none", color: "ButtonText"}}>SHOP NOW</Link></Button>
      </Info>
    </Container>
  );
};

export default CategoryItem;