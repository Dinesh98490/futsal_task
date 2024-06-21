import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {lazy, Suspense} from "react";

// import User from "./admin/user";
const User = lazy(() => import("./admin/user"));

// import GroundForm from "./admin/ground/Form.tsx";
const GroundForm = lazy(() => import("./admin/ground/Form"));

// import Home from "./home";
const Home = lazy(() => import("./home"));


// import Ground from "./admin/ground";
const Ground = lazy(() => import("./admin/ground"));
// import Login from "./login";
const Login = lazy(() => import("./login"));

// import Register from "./register";
const Register = lazy(() => import("./register"));

// import UserForm from "./admin/user/Form.tsx";
const UserForm = lazy(() => import("./admin/user/Form"));

// import Book from "./admin/book";
const Book = lazy(() => import("./admin/book"));

// import Dashboard from "./admin/dashboard";
const Dashboard = lazy(() => import("./admin/dashboard"));

// import UnAuthorized from "./admin/UnAuthorized.tsx";
const UnAuthorized = lazy(() => import("./admin/UnAuthorized"));

// import Admin from "./admin";
const Admin = lazy(() => import("./admin"));




const queryClient = new QueryClient()


function App() {

    // const privateRoute = [
    //     {path: '/admin', element: <Admin/>
    //         ,children:[
    //             {path: "/admin/ground", element: <Ground/>},
    //             {path: "/admin/ground/form", element: <GroundForm/>},
    //             {path: "/admin/user", element: <User/>},
    //             {path: "/admin/user/form", element: <UserForm/>},
    //             {path: "/admin/book", element: <Book/>},
    //             {path: "/admin/dashboard", element: <Dashboard/>},
    //         ]}
    // ]
    // const publicRoute = [
    //     {path: '/login', element: <Login/>},
    //     {path: '/register', element: <Register/>},
    //     {path: '', element: <Home/>},
    //     {path: "*", element: <UnAuthorized/>}
    // ]

    const privateRoute = [
        {path: '/admin', element: <Admin/>
            ,children:[
                {path: "/admin/ground", element: <Suspense><Ground/></Suspense>,errorElement:<>error</>
                },
                {path: "/admin/ground/form", element: <Suspense><GroundForm/></Suspense>,errorElement:<>error</>},
                {path: "/admin/user", element:<Suspense> <User/></Suspense>,errorElement:<>error</>},
                {path: "/admin/user/form", element: <Suspense><UserForm/></Suspense>,errorElement:<>error</>},
                {path: "/admin/book", element: <Suspense><Book/></Suspense>,errorElement:<>error</>},
                {path: "/admin/dashboard", element: <Suspense><Dashboard/></Suspense>,errorElement:<>error</>},
            ]}
    ]
    const publicRoute = [
        {path: '/login', element: <Suspense><Login/></Suspense>,errorElement:<>error</>},
        {path: '/register', element:<Suspense> <Register/></Suspense>,errorElement:<>error</>},
        {path: '', element: <Suspense><Home/></Suspense>,errorElement:<>error</>},
        {path: "*", element:<Suspense> <UnAuthorized/></Suspense>,errorElement:<>error</>}
    ]

    // IS system has accesstoken or not?
    const isLoggedIn = true;

    return (
        <>
            <QueryClientProvider client={queryClient}>

                <RouterProvider router={
                    createBrowserRouter(
                        isLoggedIn ? privateRoute : publicRoute
                    )
                }/>
            </QueryClientProvider>
        </>
    )
}

export default App