import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  InputBase,
  Menu,
  MenuItem,
} from "@mui/material";
import { AccountCircle, Search as SearchIcon, ShoppingCart, Favorite } from "@mui/icons-material";
import { styled } from "@mui/system";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// Styled components for custom search bar
const Search = styled("div")({
  position: "relative",
  borderRadius: "25px",
  backgroundColor: "rgba(255, 255, 255, 0.15)",
  width: "auto",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
  transition: "all 0.3s ease-in-out",
  display: "flex",
  alignItems: "center",
  marginRight: "2rem",
});

// Navbar styles
const NavbarWrapper = styled(AppBar)({
  background: "linear-gradient(to right, rgba(20, 20 , 20, 0.95), rgba(40, 40, 40, 0.95))",
  boxShadow: "none",
  position: "sticky",
  transition: "background 0.5s ease",
  width: "100%",
  left: 0,
  right: 0,
  "&:hover": {
    background: "linear-gradient(to right, rgba(15, 15, 15, 0.98), rgba(35, 35, 35, 0.98))",
  },
});

const Navbar = () => {
  const navigate = useNavigate();
  
  // State to manage the dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token"); // Clear token from session storage
    navigate("/login"); // Redirect to login page
    handleProfileMenuClose(); // Close dropdown menu
  };

  const navigation = [
    { label: "Home", link: "/" },
    { label: "About Us", link: "/AboutUs" },
    { label: "Contact Us", link: "/ContactUs" },
  ];

  return (
    <>
      <NavbarWrapper position="static">
        <div style={{ width: "100%" }}>
          <Toolbar style={{ display: "flex", justifyContent: "space-between", padding: 0 }}>
            {/* Logo and Profile Icon aligned to left */}
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* Profile Icon with Dropdown */}
              <IconButton color="inherit" onClick={handleProfileMenuOpen}>
                <AccountCircle fontSize="large" />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleProfileMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem onClick={() => { navigate("/profile"); handleProfileMenuClose(); }}>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  Logout
                </MenuItem>
              </Menu>

              {/* Logo */}
              <Typography
                variant="h5"
                style={{
                  fontWeight: "bold",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  fontFamily: "Arial, sans-serif",
                  color: "white",
                  marginLeft: "1rem",
                }}
              >
                FLY SYNC
              </Typography>
            </div>

            {/* Navbar Links and Search Bar on the right */}
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              {navigation.map((item) => (
                <Link key={item.label} to={item.link.toLowerCase()} style={{ textDecoration: "none" }}>
                  <Button
                    color="inherit"
                    style={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: "rgba(255, 255, 255, 0.9)",
                      transition: "color 0.3s ease-in-out, transform 0.3s ease-in-out",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#ffffff";
                      e.target.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "rgba(255, 255, 255, 0.9)";
                      e.target.style.transform = "scale(1)";
                    }}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}

              {/* Search Bar */}
              <Search>
                <InputBase
                  placeholder="Search…"
                  style={{
                    color: "white",
                    padding: "5px",
                    width: "200px",
                  }}
                />
                <SearchIcon style={{ color: "white", paddingRight: "10px" }} />
              </Search>

              {/* Wishlist Icon */}
              <IconButton color="inherit" onClick={() => navigate("/Wishlist")} style={{ marginRight: "0.5rem" }}>
                <Favorite fontSize="large" style={{ color: "white" }} />
              </IconButton>

              {/* Cart Icon */}
              <IconButton color="inherit" onClick={() => navigate("/AddToCart")}>
                <ShoppingCart fontSize="large" style={{ color: "white" }} />
              </IconButton>
            </div>
          </Toolbar>
        </div>
      </NavbarWrapper>
      <Outlet />
    </>
  );
};

export default Navbar;
