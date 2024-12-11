import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AdminSidebar } from "../layouts/AdminSidebar"
import LoginPage from "../common/auth/Login"

const MainRouter = ({children}) => {
    const routesData = createBrowserRouter([
        {
            path:"/",
            element:<h1>LOGIN</h1>,
            
            errorElement:<h1>ERROR...</h1>

        },
        {
            path:"/admin",
            element:<AdminSidebar/>,
            element:<LoginPage/>,
            errorElement:<h1>ERROR...</h1>,
            children : [
                {
                    path : "adddrone",
                    element : <h1>Add Drone</h1>
                },
                {
                    path:"viewdrone",
                    element:<h1>View Drones</h1>
                }
            ]
        }
    ])
    return(
        <React.Fragment>
            <RouterProvider router={routesData}>{children}</RouterProvider>
        </React.Fragment>
    )
}
export default MainRouter