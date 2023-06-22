import {
  Facebook,
  Instagram,
  YouTube,
  MailOutline,
  Room,
  Phone,
  Pinterest,
  Twitter,
} from "@material-ui/icons";
import { Tooltip } from "@mui/material";
import styled from "styled-components";

const Box = styled.div`
  padding: 70px 50px;
  background: #f6eeee;
  position: relative;
  margin-top: 60px;
  bottom: 0;
  width: 100%;
  @media (max-width: 1000px) {
    padding: 70px 30px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  // margin-left: 40px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
  grid-gap: 30px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

const FooterLink = styled.a`
  color: black;
  margin-bottom: 20px;
  font-size: 18px;
  text-decoration: none;

  &:hover {
    color: grey;
    transition: 200ms ease-in;
  }
`;

const Heading = styled.p`
  font-size: 24px;
  color: black;
  margin-bottom: 40px;
  font-weight: bold;
`;

const Payment = styled.img`
  // width: 80%;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
`;


// const Container = styled.div`
//   display: flex;
//   background-color: #fff1f5;
// `;

// const Left = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   padding: 20px;
//   color: black;
// `;

// const Logo = styled.h1``;

// const Desc = styled.p`
//   margin: 20px 0px;
// `;

// const SocialContainer = styled.div`
//   display: flex;
// `;

// const SocialIcon = styled.div`
//   width: 40px;
//   height: 40px;
//   border-radius: 20px;
//   color: white;
//   background-color: #${(props) => props.color};
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-right: 20px;
//   cursor: pointer;
// `;

// const Center = styled.div`
//   flex: 1;
//   padding: 20px;
//   color: black;
//   @media only screen and (max-width: 500px){
//     display: none;
//   }
// `;

// const Title = styled.h3`
//     margin-bottom: 30px;
// `;

// const List = styled.ul`
//   margin: 0;
//   padding: 0;
//   list-style: none;
//   dispaly: flex;
//   flex-wrap: wrap;
// `;

// const ListItem = styled.li`
//     width: 50%;
//     margin-bottom: 10px;
// `;

// const Right = styled.div`
//   flex: 1;
//   padding: 20px;
//   color: black;
// `;

// const ContactItem = styled.div`
//   margin-bottom: 20px;
//   display: flex;
//   list-style: none;
//   flex-wrap: wrap;
//   align-items: center;
//   '@media only screen and (max-width: 400px){
//     font-size: 5px;
//   }
// `;

// const Payment = styled.img`
//     width: 50%;
// `;

const Footer = () => {
  return (
    <Box>
      {/* <h2 style={{ color: "pink", textAlign: "center", marginTop: "-50px" }}>
        I BOUTIQUE
      </h2> */}
      <Container>
        <Row>
          <Column>
            <Heading>About Us</Heading>
            <FooterLink href="#">Aim</FooterLink>
            <FooterLink href="#">Vision</FooterLink>
            <FooterLink href="#">Testimonials</FooterLink>
          </Column>
          <Column>
            <Heading>Services</Heading>
            <FooterLink href="#">Home</FooterLink>
            <FooterLink href="#">Cart</FooterLink>
            <FooterLink href="#">Accessories</FooterLink>
            <FooterLink href="#">Woman Fashion</FooterLink>
            <FooterLink href="#">Man Fashion</FooterLink>
            <FooterLink href="#">Order Tracking</FooterLink>
            <FooterLink href="#">Wishlist</FooterLink>
          </Column>
          <Column>
            <Heading>Contact Us</Heading>
            <FooterLink><Room style={{marginRight:"5px"}}/>502 Dixie Path, India 395008</FooterLink>
            <FooterLink><Phone style={{marginRight:"5px"}}/>+91 99558 87744</FooterLink>
            <FooterLink><MailOutline style={{marginRight:"5px"}}/>IBoutique@gmail.com</FooterLink>
            <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
          </Column>
          <Column>
            <Heading>Social Media</Heading>
            <FooterLink href="#">
              <Tooltip title="Facebook" placement="right">
                <SocialIcon color="3B5999" >
                  <Facebook />
                </SocialIcon>
              </Tooltip>
            </FooterLink>
            <FooterLink href="#">
              <Tooltip title="Instagram" placement="right">
                <SocialIcon color="E4405F">
                  <Instagram />
                </SocialIcon>
              </Tooltip>
            </FooterLink>
            <FooterLink href="#">
              <Tooltip title="Twitter" placement="right">
                <SocialIcon color="55ACEE">
                  <Twitter />
                </SocialIcon>
              </Tooltip>
            </FooterLink>
            <FooterLink href="#">
              <Tooltip title="Pinterest" placement="right">
                <SocialIcon color="E60023">
                  <Pinterest />
                </SocialIcon>
              </Tooltip>
            </FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
// <Container>
//   <Left>
//     <Logo>I BOUTIQUE</Logo>
//     <Desc>
//       Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, a
//       laboriosam facilis possimus ab nulla aspernatur aliquid voluptates
//       provident fuga ex placeat! A eveniet ut aut ex accusantium ullam.
//       Optio!
//     </Desc>
//     <SocialContainer>
//     <Tooltip title="Facebook">
//       <SocialIcon color="3B5999">
//         <Facebook />
//       </SocialIcon>
//     </Tooltip>
//     <Tooltip title="Instagram">
//       <SocialIcon color="E4405F">
//         <Instagram />
//       </SocialIcon>
//     </Tooltip>
//     <Tooltip title="Twitter">
//       <SocialIcon color="55ACEE">
//         <Twitter />
//       </SocialIcon>
//     </Tooltip>
//     <Tooltip title="Pinterest">
//       <SocialIcon color="E60023">
//         <Pinterest />
//       </SocialIcon>
//     </Tooltip>
//     </SocialContainer>
//   </Left>
//   <Center>
//     <Title>Useful Links</Title>
//     <List>
//         <ListItem>Home</ListItem>
//         <ListItem>Cart</ListItem>
//         <ListItem>Woman Fashion</ListItem>
//         <ListItem>Man Fashion</ListItem>
//         <ListItem>Accessories</ListItem>
//         <ListItem>My Account</ListItem>
//         <ListItem>Order Tracking</ListItem>
//         <ListItem>Wishlist</ListItem>
//         <ListItem>Terms</ListItem>
//     </List>
//   </Center>
//   <Right>
//     <Title>Contact</Title>
//     <ContactItem><Room /> 502 Dixie Path, India 395008</ContactItem>
//     <ContactItem><Phone /> +91 99558 87744</ContactItem>
//     <ContactItem><MailOutline /> IBoutique@gmail.com</ContactItem>
//     <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
//   </Right>
// </Container>
//   );
// };

export default Footer;
