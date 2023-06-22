import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { FavoriteBorder, ShoppingCartOutlined } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getCartTotal } from "../screens/CartSlice";
import { Divider, Tooltip, makeStyles } from "@material-ui/core";
import useAuth from "../custom-hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../helpers/db";
import { toast } from "react-toastify";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { CssBaseline } from "@material-ui/core";

// const Theme = styled.div`
//   margin-right: 15px;
//   margin-top: 65px;
//   position: relative;
//   display: flex;
//   flex-direction: row-reverse;
// `;

const darkTheme = createTheme({
  palette: {
    type: "dark",
    background: {
      default: "hsl(230, 17%, 14%)",
    },
  },
});

const lightTheme = createTheme({
  palette: {
    type: "light",
    background: {
      default: "hsl(0, 0%, 100%)",
    },
  },
});

const Navbar = (props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const selectedTheme = isDarkMode ? darkTheme : lightTheme;

  // const [mode, setMode] = useState("light");

  // const selectedTheme = mode === "dark" ? darkTheme : lightTheme;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const { cart, totalQuantity } = useSelector((state) => state.allCart);
  const { wishlistsItems } = useSelector((state) => state.wishlists);

  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const Logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged Out");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);

  const classes = useStyles();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // const handleClose = () => {
  //   localStorage.removeItem("user");
  //   props.setUserState();
  // };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {currentUser ? (
        <MenuItem onClick={Logout}>LogOut</MenuItem>
      ) : (
        [
          <MenuItem key="profile" onClick={handleProfileMenuOpen}>
            Profile
          </MenuItem>,
          <Divider key="devider" />,
          <MenuItem key="dashboard">
            <Link
              to="/admin-login"
              style={{ textDecoration: "none", color: "black" }}
            >
              Dashboard
            </Link>
          </MenuItem>,
        ]
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new cart" color="inherit">
          <Link to="/cart">
            <Badge
              badgeContent={cart?.length}
              color="primary"
              overlap="rectangular"
            >
              <ShoppingCartOutlined style={{ color: "black" }} />
            </Badge>
          </Link>
        </IconButton>
        <h6>Cart Items</h6>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Link to="/wish">
            <Badge
              badgeContent={wishlistsItems?.length}
              color="error"
              overlap="rectangular"
            >
              <FavoriteBorder style={{ color: "black" }} />
            </Badge>
          </Link>
        </IconButton>
        <h6>Wishlist</h6>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <h6>Profile</h6>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <ThemeProvider theme={selectedTheme}>
          <CssBaseline />
          <AppBar position="fixed" style={{ backgroundColor: "#e7d0d0" }}>
            <Toolbar>
              {/* <IconButton
                size="large"
                edge="start"
                color="black"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton> */}
              <Typography
                variant="h5"
                noWrap
                component="div"
                // sx={{ display: { xs: "none", sm: "block" } }}
              >
                <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                  I BOUTIQUE
                </Link>
              </Typography>
              <Box sx={{ flexGrow: 1 }} />

              <Box sx={{ display: "flex" }}>
                <Toolbar>
                  <Link to="/" className={classes.links}>
                    Home
                  </Link>
                </Toolbar>
                <Toolbar>
                  <Link to="/product" className={classes.links}>
                    Product
                  </Link>
                </Toolbar>
                {/* <Toolbar>
                <Link to="/about" className={classes.links}>
                  About
                </Link>
              </Toolbar> */}

                <Toolbar>
                  <Link to="/contact" className={classes.links}>
                    Contact
                  </Link>
                </Toolbar>
              </Box>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton size="large" color="inherit" aria-label="cart">
                  <Link to="/cart">
                    <Badge
                      badgeContent={totalQuantity}
                      // badgeContent={cart?.length}
                      color="primary"
                      overlap="rectangular"
                    >
                      <ShoppingCartOutlined style={{ color: "black" }} />
                    </Badge>
                  </Link>
                </IconButton>
                <IconButton size="large" color="inherit" aria-label="wish">
                  <Link to="/wish">
                    <Badge
                      badgeContent={wishlistsItems?.length}
                      color="error"
                      overlap="rectangular"
                    >
                      <FavoriteBorder style={{ color: "black" }} />
                    </Badge>
                  </Link>
                </IconButton>
                <IconButton
                  size="large"
                  // edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="black"
                >
                  <AccountCircle fontSize="large" />
                </IconButton>
              </Box>
              <div>
                <IconButton onClick={toggleTheme}>
                  {isDarkMode ? (
                    <Tooltip title="Dark mode">
                      <Brightness7Icon
                        style={{ color: "black", fontSize: "30px" }}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Light mode">
                      <Brightness4Icon
                        style={{ color: "black", fontSize: "30px" }}
                      />
                    </Tooltip>
                  )}
                </IconButton>
                {/* <Brightness4Icon
                  cursor="pointer"
                  fontSize="medium"
                  onClick={() => setMode(mode === "light" ? "dark" : "light")}
                /> */}
              </div>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="black"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </>
  );
};

export default Navbar;

const useStyles = makeStyles((theme) => ({
  links: {
    color: "black",
    textDecoration: "none",
    fontSize: "20px",
  },
}));


  // const menuId = "primary-search-account-menu";
  // const renderMenu = (
  //   <Menu
  //     anchorEl={anchorEl}
  //     anchorOrigin={{
  //       vertical: "top",
  //       horizontal: "right",
  //     }}
  //     id={menuId}
  //     keepMounted
  //     transformOrigin={{
  //       vertical: "top",
  //       horizontal: "right",
  //     }}
  //     open={isMenuOpen}
  //     onClose={handleMenuClose}
  //   >
  //     {currentUser ? (
  //       <MenuItem onClick={Logout}>LogOut</MenuItem>
  //     ) : (
  //       <>
  //         {/* <MenuItem>
  //           {" "}
  //           <Link
  //             to="/signup"
  //             style={{ textDecoration: "none", color: "black" }}
  //           >
  //             SignUp{" "}
  //           </Link>
  //         </MenuItem>
  //         <MenuItem>
  //           <Link
  //             to="/login"
  //             style={{ textDecoration: "none", color: "black" }}
  //           >
  //             LogIn
  //           </Link>
  //         </MenuItem> */}
  //          <MenuItem>
  //           {/* <Link to="#" style={{ textDecoration: "none" }}> */}
  //             Profile
  //           {/* </Link> */}
  //         </MenuItem>
  //         <MenuItem>
  //           <Link to="/dashboard" style={{ textDecoration: "none" }}>
  //             Dashboard
  //           </Link>
  //         </MenuItem>
  //       </>
  //     )}
  //   </Menu>
  // );

  // const mobileMenuId = "primary-search-account-menu-mobile";
  // const renderMobileMenu = (
  //   <Menu
  //     anchorEl={mobileMoreAnchorEl}
  //     anchorOrigin={{
  //       vertical: "top",
  //       horizontal: "right",
  //     }}
  //     id={mobileMenuId}
  //     keepMounted
  //     transformOrigin={{
  //       vertical: "top",
  //       horizontal: "right",
  //     }}
  //     open={isMobileMenuOpen}
  //     onClose={handleMobileMenuClose}
  //   >
  //     <MenuItem>
  //       <IconButton size="large" aria-label="show 4 new cart" color="inherit">
  //         <Link to="/cart">
  //           <Badge
  //             badgeContent={cart?.length}
  //             color="primary"
  //             overlap="rectangular"
  //           >
  //             <ShoppingCartOutlined style={{ color: "black" }} />
  //           </Badge>
  //         </Link>
  //       </IconButton>
  //       <h6>Cart Items</h6>
  //     </MenuItem>
  //     <MenuItem>
  //       <IconButton
  //         size="large"
  //         aria-label="show 17 new notifications"
  //         color="inherit"
  //       >
  //         <Link to="/wish">
  //           <Badge
  //             badgeContent={wishlistsItems?.length}
  //             color="error"
  //             overlap="rectangular"
  //           >
  //             <FavoriteBorder style={{ color: "black" }} />
  //           </Badge>
  //         </Link>
  //       </IconButton>
  //       <h6>Wishlist</h6>
  //     </MenuItem>
  //     <MenuItem onClick={handleProfileMenuOpen}>
  //       <IconButton
  //         size="large"
  //         aria-label="account of current user"
  //         aria-controls="primary-search-account-menu"
  //         aria-haspopup="true"
  //         color="inherit"
  //       >
  //         <AccountCircle />
  //       </IconButton>
  //       <h6>Profile</h6>
  //     </MenuItem>
  //   </Menu>
  // );



//import React, {useRef, useEffect} from "react";
// import { makeStyles } from "@material-ui/core";
// import { Container, Row } from "reactstrap";
// import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
// import { Link } from "react-router-dom";
// import { FavoriteBorder, ShoppingCartOutlined } from "@material-ui/icons";
// import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
// import userIcon from "../image/user.png";
// import Badge from "@mui/material/Badge";
// import { useSelector } from "react-redux";

// import { motion } from "framer-motion";

// const nav_link = [
//   {
//     path: "/",
//     display: "Home",
//   },
//   {
//     path: "/product",
//     display: "Product",
//   },
//   {
//     path: "/about",
//     display: "About",
//   },
// ];

// const Navbar = () => {

//   // const headerRef = useRef(null)

//   // const stickyheaderFunc = () => {
//   //   window.addEventListener('scroll', ()=> {
//   //     if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
//   //       headerRef.current.classList.add('sticky_header')
//   //     }else {
//   //       headerRef.current.classList.remove('sticky_header')
//   //     }
//   //   })
//   // }

//   // useEffect(() => {
//   //   stickyheaderFunc()
//   //   return () => window.removeEventListener('scroll', stickyheaderFunc);
//   // })

//   const classes = useStyles();

//   const { cart, totalQuantity } = useSelector((state) => state.allCart);
//   const { wishlistsItems } = useSelector((state) => state.wishlists);

//   // const navigate = useNavigate();

//   return (
//     <header className={classes.header} >
//       <Container>
//         <Row>
//           <div className={classes.nav_wrapper}>
//             <div className={classes.logo}>
//               {/* <BusinessCenterRoundedIcon fontSize="large" /> */}
//               <div>
//                 <h2 className={classes.h2}>I BOUTIQUE</h2>
//               </div>
//             </div>
//             <div className={classes.navigation}>
//               <ul className={classes.menu}>
//                 {nav_link.map((item, index) => (
//                   <li className={classes.nav_item} key={index}>
//                     <Link
//                       to={item.path}
//                       className={(navClass) =>
//                         navClass.isActive ? "nav_active" : ""
//                       }
//                       style={{
//                         textDecoration: "none",
//                         color: "black",
//                         fontWeight: 400,
//                         fontSize: "20px",
//                       }}
//                     >
//                       {item.display}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className={classes.nav_icon}>
//               <span className={classes.fav_icon}>
//                 <Link to="/wish">
//                   <Badge
//                     badgeContent={wishlistsItems?.length}
//                     color="secondary"
//                     overlap="rectangular"
//                   >
//                     <FavoriteBorder style={{ color: "black" }} />
//                   </Badge>
//                 </Link>
//               </span>
//               <span className={classes.cart_icon}>
//                 <Link to="/cart">
//                   <Badge
//                     badgeContent={totalQuantity}
//                     color="primary"
//                     overlap="rectangular"
//                   >
//                     <ShoppingCartOutlined style={{ color: "black" }} />
//                   </Badge>
//                 </Link>
//               </span>
//               <span>
//                 <motion.img
//                   whileTap={{ scale: 1.4 }}
//                   src={userIcon}
//                   className={classes.img}
//                 />
//               </span>
//               <div className={classes.mobile_menu}>
//               <span>
//                 <MenuRoundedIcon />
//               </span>
//             </div>
//             </div>

//             {/* <div className={classes.mobile_menu}>
//               <span>
//                 <MenuRoundedIcon />
//               </span>
//             </div> */}
//           </div>
//         </Row>
//       </Container>
//     </header>
//   );
// };

// export default Navbar;

// const useStyles = makeStyles((theme) => ({
//   header: {
//     width: "100%",
//     height: "80px",
//     lineHeight: "80px",
//   },
//   nav_wrapper: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   logo: {
//     display: "flex",
//     alignItems: "center",
//     columnGap: "8px",
//   },
//   h2: {
//     fontSize: "2rem",
//     fontWeight: 400,
//   },
//   menu: {
//     display: "flex",
//     alignItems: "center",
//     columnGap: "1.5rem",
//     marginBottom: 0,
//   },
//   nav_icon: {
//     display: "flex",
//     alignItems: "center",
//     columnGap: "2rem",
//   },
//   nav_item: {
//     listStyle: "none",
//   },
//   cart_icon: {
//     display: "flex",
//     cursor: "pointer",
//     position: "relative",
//   },
//   fav_icon: {
//     display: "flex",
//     cursor: "pointer",
//     position: "relative",
//   },
//   img: {
//     height: "35px",
//     width: "35px",
//     cursor: "pointer",
//     position: "relative",
//   },
//   mobile_menu: {
//     fontSize: "1.5rem",
//     display: "none",
//   },
//   nav_active: {
//     fontWeight: "800 !important",
//   },
// sticky_header : {
//   width: "100%",
//   height: "70px",
//   lineHeight: "70px",
//   position: "sticky",
//   top: 0,
//   left: 0,
//   zIndex: 999
// },
// }));
