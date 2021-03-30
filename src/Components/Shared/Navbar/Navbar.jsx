import React, { useState, useEffect } from 'react'
import {NavLink} from 'react-router-dom'

import Logo from '../../../Assets/Logo.png'
import routes from '../Routes'
import useStyles from './Styles'

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MuiLink from '@material-ui/core/Link';

import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider, Divider, MenuList } from '@material-ui/core'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Switch from "@material-ui/core/Switch";
import NightsStayIcon from '@material-ui/icons/NightsStay';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import {
  orange,
  lightBlue,
  deepPurple,
  deepOrange
} from "@material-ui/core/colors";

const NavBar = (props) => {
    
    const path = window.location.pathname === "/" ? "/tasks" : window.location.pathname
    const [currentPath, setCurrentPath] = useState(path)
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);

    const [darkState, setDarkState] = useState(false);
    const palletType = localStorage.getItem("dark-mode") === "true" ? "dark" : "light";
    const primaryText = localStorage.getItem("dark-mode") === "true" ? "#fff": "rgba(0, 0, 0, 0.87)"
    const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];

    const theme = createMuiTheme({
      palette: {
        type: palletType,
        primary: {
          // Purple and green play nicely together.
          main: "#805AD5"
        },
        secondary: {
          // This is green.A700 as hex.
          main: '#11cb5f',
        },
        text: {
          primary: primaryText
        }
      },
    });

    const handleThemeChange = () => {
      setDarkState(!darkState)
      console.log(darkState)
      localStorage.setItem('dark-mode', darkState);
    };

    const mobile = useMediaQuery('(max-width:600px)');

    const handleDrawerToggle = () => {
        if(mobile) {
            setMobileOpen(!mobileOpen);
        }
    };
    const [anchorEl, setAnchorEl] = useState(null);

    const openMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
      setAnchorEl(null);
    };


    useEffect(() => {
      window.matchMedia("(prefers-color-scheme: dark)").matches && handleThemeChange()

    }, [window.matchMedia("(prefers-color-scheme: dark)").matches])

    const drawer = (
        <div>
            {mobile? 
                (
                    <div className={classes.toolbar}>
                        <img
                            className={classes.logo}
                            src={Logo}
                            alt="Logo"
                            />
                    </div>     
                ) 
            : 
                <img
                    className={classes.logo}
                    src={Logo}
                    alt="Logo"
                />  
            }            
            <List>
                {Object.keys(routes).map((item) => (
                    <MuiLink underline="none" className={classes.link} component={NavLink} onClick={() => {setCurrentPath(routes[item].path); handleDrawerToggle()}} to={routes[item].path}>
                        <ListItem selected={routes[item].path === currentPath} button key={item}> 
                        <ListItemIcon>{routes[item].icon}</ListItemIcon>
                        <ListItemText primary={item} style={{color: primaryText}}/>
                        </ListItem>
                    </MuiLink>
                ))}
            </List>
        </div>
    );

    return (
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          {mobile? 
          ( 
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <div style={{marginLeft: "auto"}}>
                    <IconButton variant="h6" style={{display: "inline-block", padding: "6px"}} color="inherit">
                        <AccountCircleIcon />
                    </IconButton>
                    <IconButton variant="h6" style={{display: "inline-block", padding: "6px"}} color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={openMenu} >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={closeMenu}
                    >
                      <MenuItem style={{marginBottom: "5px"}}>
                          <ListItemIcon>
                            <AccountCircleIcon fontSize="small" />
                          </ListItemIcon>
                          <Typography variant="inherit">Account</Typography>
                        </MenuItem>
                        <MenuItem>
                          <ListItemIcon>
                            <ExitToAppIcon fontSize="small" />
                          </ListItemIcon>
                          <Typography variant="inherit">Logout</Typography>
                        </MenuItem>
                      <MenuItem>
                        <ListItemIcon>
                          <NightsStayIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="inherit" style={{marginRight: "5px"}}>Dark Mode<Switch checked={localStorage.getItem("dark-mode") === "true"} onChange={handleThemeChange} style={{display: "inline-block"}} color="default" /></Typography>
                      </MenuItem>
                    </Menu>
                </div>
                </Toolbar>
            </AppBar>
          )
        :
            <div></div>
        }
          <nav className={classes.drawer} aria-label="side drawer">
            <Hidden smUp implementation="css">
              <Drawer
                variant="temporary"
                anchor={'left'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, 
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
              >
                {drawer}
                {!mobile ? 
                  (
                    <>
                    <Divider />
                      <Typography variant="h6" style={{margin: "10px 0px 0px 15px", fontSize: "18px"}}>Account</Typography>
                      <MenuList style={{margin: "8px 0px"}}>
                        <MenuItem style={{height: "50px"}}>
                          <ListItemIcon>
                            <AccountCircleIcon fontSize="small" />
                          </ListItemIcon>
                          <Typography variant="inherit">Account</Typography>
                        </MenuItem>
                        <MenuItem style={{height: "50px"}}>
                          <ListItemIcon>
                            <ExitToAppIcon fontSize="small" />
                          </ListItemIcon>
                          <Typography variant="inherit">Logout</Typography>
                        </MenuItem>
                      </MenuList>
                      <Divider />
                      <Typography variant="h6" style={{margin: "10px 0px 0px 15px", fontSize: "18px"}}>Preferences</Typography>
                      <MenuList style={{margin: "8px 0px"}}>
                        <MenuItem style={{height: "50px"}}>
                          <ListItemIcon>
                            <NightsStayIcon fontSize="small" />
                          </ListItemIcon>
                          <Typography variant="inherit" style={{marginRight: "5px"}}>Dark Mode<Switch checked={localStorage.getItem("dark-mode") === 'true'} onChange={handleThemeChange} style={{display: "inline-block"}} color="default" /></Typography>
                        </MenuItem>
                      </MenuList>
                    </>
                  )
                  :
                    <div></div>
                }
              </Drawer>
            </Hidden>
          </nav>
        <main className={classes.content}>
            {mobile? (<div className={classes.toolbar} />) : <div></div>}
            {props.children}
        </main>
        </div>
        </ThemeProvider>
      );
}

export default NavBar
