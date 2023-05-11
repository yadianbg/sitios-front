import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import NavBar from "./nav-bar";
import {Outlet} from "react-router-dom";
import Footer from "./footer";
import {CustomTable} from "../components/table/custom-table"
import {tableHeaderValues, tableTestValues} from "../config/table-values"

function Layout(props) {
    return (
        <>
            <NavBar/>
            <Box style={{'minHeight': '87vh', 'margin': '0 auto', 'width': '80%'}}>
                <Outlet/>
            </Box>
            <Footer/>
        </>
    );
}

export default Layout;