import React from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {pages} from "../config/menu-item";
import {useNavigate} from "react-router-dom";

function NavBar(props) {
    const navigate = useNavigate()
    const nav = (value) => navigate(value)

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{
                            mr: 2,
                            display: {
                                md: 'none',
                            }
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h5" component="div" style={{'paddingRight': '12px',}}>
                        Sitios de Interés Turístico
                    </Typography>
                    <Box style={{'display': 'flex', 'flexDirection': 'row', 'flexGrow': '1'}}>
                        {
                            pages.map(page => (
                                <MenuItem key={page} style={{'borderRadius': '10px'}} onClick={() => nav(page.link)}>
                                    <Typography>
                                        {page['title']}
                                    </Typography>
                                </MenuItem>
                            ))
                        }
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavBar;