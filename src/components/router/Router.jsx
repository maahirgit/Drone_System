import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import LoginPage from "../common/auth/Login";
import DroneList from "../common/drone/DroneList"; // Import the DroneList component
import DroneDetails from "../common/drone/DroneDetails";  
import AddDrone from "../common/drone/AddDrone";
import DroneRentalHistory from "../common/drone-provider/DroneRent";
import PaymentHistory from "../common/drone-provider/PaymentHistory";
import AddToCart from "../common/customer/AddToCart";
import ViewCart from "../common/customer/ViewCart";
import Navbar from "../common/drone/Navbar";
import AboutUs from "../common/customer/AboutUs";
import ContactUs from "../common/customer/ContactUs";
import Wishlist from "../common/customer/Wishlist";
import Home from "../common/drone-provider/Home";
import Login  from "../common/auth/Login";
import VendorDashboard from "../common/drone-provider/VendorDashboard"
import Profile from "../common/customer/Profile";

const MainRouter = ({ children }) => {
  const routesData = createBrowserRouter([
    
    {
      path: "/Login",
      element:<LoginPage/>,
      errorElement: <h1>Error...</h1>,
    },
    {
      path:"/",
      element:<Navbar/>,
      children:[
        {
          path: "", 
          element: <Home />, // View drones page   --DroneList--
          errorElement: <h1>Error...</h1>,
        },
        {
          path:"DroneList",
          element: <DroneList/>, //view drone details
          errorElement: <h1>Error...</h1>
        },
        
        {
            path:"DroneDetails",
            element: <DroneDetails/>, //view drone details
            errorElement: <h1>Error...</h1>
        },
        {
            path:"AddDrone",
            element: <AddDrone/>,
            errorElement: <h1>Error..</h1>
        },
        {
          path:"DroneRent",
          element:<DroneRentalHistory/>,
          errorElement : <h1>Error...</h1>
        },
        {
          path:"paymenthistory",
          element : <PaymentHistory/>,
          errorElement : <h1>Error...</h1>
        },
        {
          path : "AddToCart",
          element : <AddToCart/>,
          errorElement : <h1>Error...</h1>
        },
        {
          path : "ViewCart",
          element : <ViewCart/>,
          errorElement : <h1>Error...</h1>
        },
        {
          path : "AboutUs",
          element : <AboutUs/>,
          errorElement : <h1>Error....</h1>
        },
        {
          path : "ContactUs",
          element : <ContactUs/>,
          errorElement : <h1>Error....</h1>
        },
        {
          path : "Wishlist",
          element : <Wishlist/>,
          errorElement : <h1>Error....</h1>
        },
        {
          path : "Home",
          element : <Home/>,
          errorElement : <h1>Error....</h1>
        },
        {
          path : "Login",
          element : <LoginPage/>,
          errorElement : <h1>Error....</h1>
        },
        {
          path : "VendorDashboard",
          element : <VendorDashboard/>,
          errorElement : <h1>Error....</h1>
        },
        {
          path : "Profile",
          element: <Profile/>,
          errorElement : <h1>Error....</h1>
        }
      ]
    },
    {
      path:"/user",
      element:<h1>customer</h1>,
      children:[]
    },

       {
      // Fallback route: Redirect to login if no match is found
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);

  return (
    <React.Fragment>
      <RouterProvider router={routesData}>{children}</RouterProvider>
    </React.Fragment>
  );
};

export default MainRouter;
