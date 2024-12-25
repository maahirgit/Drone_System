import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import LoginPage from "../common/auth/Login";
import DroneList from "../common/drone/DroneList"; // Import the DroneList component
import DroneDetails from "../common/drone/DroneDetails";  
import AddDrone from "../common/drone/AddDrone";



const MainRouter = ({ children }) => {
  const routesData = createBrowserRouter([
    {
      path: "/",
      element: <h1>LOGIN</h1>, // Root login page
      errorElement: <h1>Error...</h1>,
    },
    {
      path: "/admin",
      element: <LoginPage />, // "/admin" directly renders LoginPage
      errorElement: <h1>Error...</h1>,
    },
    {
      path: "/admin/ViewDrone", 
      element: <DroneList />, // View drones page
      errorElement: <h1>Error...</h1>,
    },
    {
        path:"/admin/DroneDetails",
        element: <DroneDetails/>, //view drone details
        errorElement: <h1>Error...</h1>
    },
    {
        path:"/admin/AddDrone",
        element: <AddDrone/>,
        errorElement: <h1>Error..</h1>
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
