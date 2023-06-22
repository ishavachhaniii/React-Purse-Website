import React, {useEffect} from "react";
import { Container, Row } from "reactstrap";
import { makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { AccountCircle } from "@material-ui/icons";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Logout from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../User/custom-hooks/useAuth";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.45),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.35),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
      "&:focus": {
        width: "50ch",
      },
    },
  },
}));

const admin_nav = [
  {
    display: "Dashboard",
    path: "/dashboard",
  },
  {
    display: "All Products",
    path: "/dashboard/allproduct",
  },
  {
    display: "Add Products",
    path: "/dashboard/addproduct",
  },
  {
    display: "Add Categories",
    path: "/dashboard/category",
  },
  {
    display: "View Categories",
    path: "/dashboard/allcategory",
  },
  {
    display: "Order Details",
    path: "/dashboard/order",
  },
  {
    display: "Users Details",
    path: "/dashboard/users",
  },
];

const AdminNav = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { currentUser } = useAuth();

  const navigate = useNavigate();

  // const handleLogout = () => {
  //   navigate("/admin-login"); // Redirect to the login page
  // };


  useEffect(() => {
    let username = sessionStorage.getItem("username");
    if (username === "" || username === null) {
      navigate("/admin-login");
    }
  });


  return (
    <>
      <header className={classes.admin_header}>
        <div className={classes.nav_top}>
          {/* <Container> */}
            <div className={classes.nav_wrapper}>
              <div className={classes.logo}>
                <h3 style={{marginLeft: "10px", fontFamily :"bold"}}>I BOUTIQUE</h3>
              </div>

              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>

              <div className={classes.nav_right}>
                <span>
                  <NotificationsIcon  style={{ width: 35, height: 35 }} />
                </span>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  // sx={{ ml: 1 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <AccountCircle style={{ width: 35, height: 35, marginRight: "15px" }} />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  {/* <MenuItem onClick={handleClose}>
                    <Avatar /> Profile
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Avatar /> My account
                  </MenuItem> */}
                  {/* <Divider /> */}

                  <MenuItem onClick={handleClose}>
                    <ListItemIcon > 
                      {/* <Logout fontSize="small" /> */}
                      <Link to="/admin-login" style={{textDecoration: "none", color: "black"}}>
                        <Logout fontSize="small" />
                        <span>    Logout</span>
                      </Link>
                    </ListItemIcon>
                    
                  </MenuItem>
                </Menu>
              </div>
            </div>
          {/* </Container> */}
        </div>
      </header>

      <section className={classes.admin_menu}>
        <Container>
          <Row>
            <div className={classes.navigation}>
              <ul className={classes.menulist}>
                {admin_nav.map((item, index) => (
                  <li className={classes.menuitem} key={index}>
                    <NavLink
                      to={item.path}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdminNav;

const useStyles = makeStyles((theme) => ({
  admin_header: {
    width: "100%",
    height: "100%",
    background: "#cca3a3",
    padding: "10px 0px",
  },
  nav_top: {
    width: "100%",
  },
  nav_wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: "3rem",
  },
  nav_right: {
    display: "flex",
    alignItems: "center",
    columnGap: "2rem",
  },
  searchbox: {
    // width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid grey",
    borderRadius: "5px",
  },
  input: {
    width: "100%",
    border: "none",
    outline: "none",
    padding: "10px",
  },
  admin_menu: {
    width: "100%",
    // height: "70px",
    background: "#fceded",
  },
  navigation: {
    textAlign: "center",
    marginTop: "15px",
  },
  menulist: {
    display: "flex",
    alignItems: "center",
    columnGap: "2.7rem",
    justifyContent: "center",
    
  },
  menuitem: {
    listStyle: "none",
    fontSize: "20px",
    padding: "8px 10px",
    cursor: "pointer",
    transition: "all 0.6s ease",
    "&:hover" : {
        transform: "scale(1.0)",
        backgroundColor: "#e6c8c8",
        borderRadius: "6px",
    }
  },
  admin_nav: {
    
  }
}));
