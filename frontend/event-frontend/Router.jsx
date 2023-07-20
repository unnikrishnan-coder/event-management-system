import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import Login from './src/layouts/Login';
import Signup from './src/layouts/Signup';
import DashBoard from './src/layouts/DashBoard';
import DashHome from './src/layouts/DashHome';
import DashAddEvent from './src/layouts/DashAddEvent';
import DashAllEvents from './src/layouts/DashAllEvents';
import DashMyEvents from './src/layouts/DashMyEvents';
import Profile from './src/layouts/Profile';
import Payment from './src/layouts/Payment';
import CreatedOrRegistered from './src/layouts/CreatedOrRegistered';
import DashUpdateEvent from './src/layouts/DashUpdateEvent';
import ViewRegistered from './src/layouts/ViewRegistered';
import AddArtist from './src/layouts/AddArtist';
import DashAllArtists from './src/layouts/DashAllArtists';
import AddVenue from './src/layouts/AddVenue';
import DashAllVenues from './src/layouts/DashAllVenues';
import UpdateVenue from './src/layouts/DashUpdateVenue';

function Router(){
    const router = createBrowserRouter([
        {
            path:"/login",
            element:<Login />
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
                    path:"update-event/:eid",
                    element:<DashUpdateEvent />
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
                    path:"view-registered/:eid",
                    element:<ViewRegistered />
                },
                {
                    path:"profile",
                    element:<Profile />
                },
                {
                    path:"add-artist",
                    element:<AddArtist />
                },
                {
                    path:"view-artist",
                    element:<DashAllArtists />
                },
                {
                    path:"update-artist/:aid",
                    element:<AddArtist />
                },
                {
                    path:"add-venue",
                    element:<AddVenue />
                },
                {
                    path:"all-venues",
                    element:<DashAllVenues />
                },
                {
                    path:"update-venue/:id",
                    element:<UpdateVenue />
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