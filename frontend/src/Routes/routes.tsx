import { createBrowserRouter } from "react-router-dom"
import { AppLayout } from "../Components/layout";
import Home from "../Pages/taskPage";
import NotFoundPage from "../Pages/404Page";



      const routes = createBrowserRouter([
        {


            path:"/",
            element: <AppLayout/>,
            children: [
                {
                    path:"/",
                    index:true,
                    element:<Home/>
                },
                {
                    path:"*",
                    element:<NotFoundPage/>
                },
            ]
        },
    ])


    // const AdminRoutes = createBrowserRouter([
    //     {


    //         path:"/",
    //         element: <AppLayout/>,
    //         children: [
    //             {
    //                 path:"/",
    //                 index:true,
    //                 element:<Home/>
    //             },
           
    //             {
    //                 path:"/User",
    //                 element:<UserPage/>
    //             },
             
    //         ]
    //     },
    // ])
export {routes}