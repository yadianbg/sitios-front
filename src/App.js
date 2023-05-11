import logo from './logo.svg';
import './App.css';
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Layout from "./layout/layout";
import {route} from './config/router'


function App() {
    return (

        <RouterProvider router={route}/>
    )
        ;
}

export default App;
