import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Home from './src/layouts/Home';
import Login from './src/layouts/Login';
import Signup from './src/layouts/Signup';
import DashBoard from './src/layouts/DashBoard';
import DashHome from './src/layouts/DashHome';
import DashAddEvent from './src/layouts/DashAddEvent';
import DashAllEvents from './src/layouts/DashAllEvents';
import DashMyEvents from './src/layouts/DashMyEvents';
import Profile from './src/layouts/Profile';
import { useEffect } from 'react';
import Payment from './src/layouts/Payment';
import CreatedOrRegistered from './src/layouts/CreatedOrRegistered';

function Router({setAlert}){
    const router = createBrowserRouter([
        {
            path:"/",
            element:<Home/>
        },
        {
            path:"/login",
            element:<Login setAlert={setAlert}/>
        },
        {
            path:"/signup",
            element:<Signup />
        },
        {
            path:"/dash/",
            element:<DashBoard />,
            children:[
                {
                    path:"home",
                    element:<DashHome />
                },
                {
                    path:"add-event",
                    element:<DashAddEvent />
                },
                {
                    path:"all-events",
                    element:<DashAllEvents />
                },
                {
                    path:"my-events",
                    element:<CreatedOrRegistered/>
                },
                {
                    path:"profile",
                    element:<Profile />
                }
            ]
        },
        {
            path:"/payment/:name/:event/:cost/:email/:uid/:eid",
            element:<Payment />
        }
    ])
    return (
        <RouterProvider router={router} />
    )
}
export default Router;