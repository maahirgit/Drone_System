import React, { useState, useEffect } from "react";
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

// Styled components for the search bar
const Search = styled('div')({
  position: 'relative',
  borderRadius: '25px',
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  width: 'auto',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  transition: 'all 0.3s ease-in-out',
  display: 'flex',
  alignItems: 'center',
  marginRight: '2rem',
});

// Navbar styling
const NavbarWrapper = styled(AppBar)({
  background: 'linear-gradient(to right, rgba(20, 20 , 20, 0.95), rgba(40, 40, 40, 0.95))',
  boxShadow: 'none',
  position: 'sticky',
  transition: 'background 0.5s ease',
  width: '100%',
  left: 0,
  right: 0,
  '&:hover': {
    background: 'linear-gradient(to right, rgba(15, 15, 15, 0.98), rgba(35, 35, 35, 0.98))',
  },
});

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    // Fetch user details from local storage (or API)
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data from storage
    setUser(null);
    handleClose();
    navigate("/login"); // Redirect to login page
  };

  const navigation = [
    { label: "Home", link: "/" },
    { label: "About Us", link: "/AboutUs" },
    { label: "Contact Us", link: "/ContactUs" },
  ];

  return (
    <>
      <NavbarWrapper position="static">
        <div style={{ width: '100%' }}>
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between', padding: 0 }}>
            
            {/* Left Section: Profile Icon & Logo */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              
              {/* Profile Icon (Only visible if logged in) */}
              {user ? (
                <>
                  <IconButton color="inherit" onClick={handleProfileClick}>
                    <AccountCircle fontSize="large" />
                  </IconButton>
                  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem disabled>Hello, {user.Name} 👋</MenuItem>
                    <MenuItem onClick={() => { handleClose(); navigate("/profile"); }}>
                      Edit Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
                  </Menu>
                </>
              ) : (
                <Button color="inherit" onClick={() => navigate("/login")}>
                  Login
                </Button>
              )}

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

            {/* Navbar Links, Search Bar & Icons */}
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
                    width: '200px',
                  }}
                />
                <SearchIcon style={{ color: "white", paddingRight: "10px" }} />
              </Search>

              {/* Wishlist Icon */}
              <IconButton color="inherit" onClick={() => navigate("/Wishlist")} style={{ marginRight: '0.5rem' }}>
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
