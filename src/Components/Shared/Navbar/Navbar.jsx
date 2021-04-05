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
import { ThemeProvider, Divider, MenuList, Tooltip } from '@material-ui/core'

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
    
    var path = window.location.pathname === "/" ? "/login" : window.location.pathname
    if(!localStorage.getItem("userData")) {
      path = '/register'
    }
    const [currentPath, setCurrentPath] = useState(path)
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);

    const [darkState, setDarkState] = useState(false);
    const palletType = darkState ? "dark" : "light";
    const primaryText = darkState ? "#fff": "rgba(0, 0, 0, 0.87)"
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
      setDarkState(!darkState);
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
    if(path !== "/login" && path !== "/register") {
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
                          <Typography variant="inherit" style={{marginRight: "5px"}}>Dark Mode<Switch checked={darkState} onChange={handleThemeChange} style={{display: "inline-block"}} color="default" /></Typography>
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
                        <div style={{margin: "auto auto 30px auto", justifyContent: "space-between", width: "90%"}}>
                          <Tooltip title="Account" placement="top">
                            <IconButton style={{display: "inline-block", padding: "8px"}}>
                              <AccountCircleIcon fontSize="medium" color="primary" />
                            </IconButton>
                          </Tooltip>
                          <Typography style={{display: "inline-block", padding: "8px"}}>{JSON.parse(localStorage.getItem("userData")).username}</Typography>
                          <Tooltip title="Logout" placement="top">
                            <IconButton style={{display: "inline-block"}}>
                              <ExitToAppIcon fontSize="small" style={{marginRight: "5px"}} style={{display: "inline-block"}}/>
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Dark Mode" placement="top">
                            <IconButton onClick={handleThemeChange} style={{display: "inline-block"}}>
                              <NightsStayIcon fontSize="small" style={{marginRight: "5px"}} style={{display: "inline-block"}}/>
                            </IconButton>
                          </Tooltip>
                        </div>
                      </>
                    )
                    :
                      <div></div>
                  }
                </Drawer>
              </Hidden>
            </nav>
          <main className={classes.content}>
              {mobile? (<div className={classes.toolbar} />) : <></>}
              {props.children}
          </main>
          </div>
          </ThemeProvider>
        );
    }
    else {
      return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
              <main className={classes.content}>
                      {props.children}
              </main>
            </div>
        </ThemeProvider>
      );
    }
}

export default NavBar
