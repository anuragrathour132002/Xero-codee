import { createBrowserRouter } from "react-router-dom";
import Login from './components/Login/Login';
import SignUp from "./components/SignUp/SignUp";
import Page1 from "./components/Pages/Organisation/Page1";
import Hosting from "./components/Pages/Hosting/Hosting";
import SelfHosting from "./components/Pages/Selfhosting/SelfHosting";
import GitHub from "./components/Pages/Github/GitHub"


const router = createBrowserRouter([
    {
        path: "/",
        element: <Login></Login>,
    },
    {
        path: "/login",
        element: <Login></Login>,
    },
    {
        path: "/signup",
        element: <SignUp></SignUp>,
    },
    {
        path: "/page1",
        element: <Page1></Page1>,
    },
    {
        path: "/hosting",
        element: <Hosting></Hosting>,
    },
    {
        path: "/selfhosting",
        element: <SelfHosting></SelfHosting>,
    },
    {
        path:"/repos/:inputValue",
        element:<GitHub></GitHub>
    }
]);

export default router;