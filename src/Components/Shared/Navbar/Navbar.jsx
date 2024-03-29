import React, { useState, useEffect } from 'react'
import {NavLink} from 'react-router-dom'

import Logo from '../../../Assets/Incentiva.png'
import MiniLogo from "../../../Assets/Incentiva-Mini.png"
import routes from './Routes'
import useStyles from './Styles'
import { logoutUser } from "../../../API/Auth/AuthProvider"

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MuiLink from '@material-ui/core/Link';

import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider, Tooltip } from '@material-ui/core'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Switch from "@material-ui/core/Switch";
import NightsStayIcon from '@material-ui/icons/NightsStay';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button";

import {motion} from "framer-motion"

const NavBar = (props) => {
  //if(JSON.parse(localStorage.getItem('userData')) == null){localStorage.removeItem('userData')}

    var path = window.location.pathname
    if(!localStorage.getItem("userData")) {
      path = '/'
    }
    
    const [currentPath, setCurrentPath] = useState(path)
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);

    const [darkState, setDarkState] = useState(false);
    const palletType = darkState ? "dark" : "light";
    const primaryText = darkState ? "#fff": "rgba(0, 0, 0, 0.87)"

    const background = darkState ? "#1f1f1f" : "#fafafa"
    const paperBackground = darkState ? "#333333" : "#fff"

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
        },
        background: {
          default: background,
          paper: paperBackground
        }
      },
      props: {
        /* Name of the component ⚛️
        MuiButtonBase: {
          // The default props to change
          disableRipple: false, // No more ripple, on the whole application 💣!
        },
        */
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
    const [acctAnchor, setAcctAnchor] = useState(null);

    const openAcctMenu = (event) => {
      setAcctAnchor(event.currentTarget);
    };

    const closeAcctMenu = () => {
      setAcctAnchor(null);
    };
    useEffect(() => {
      window.matchMedia("(prefers-color-scheme: dark)").matches && handleThemeChange()

    }, [window.matchMedia("(prefers-color-scheme: dark)").matches])

    const drawer = (
        <div>
            {mobile? 
                (
                    <div className={classes.toolbar}>
                      <MuiLink component={NavLink} onClick={() => {setCurrentPath("/"); handleDrawerToggle()}} to="/">
                        <img
                          className={classes.logo}
                          src={Logo}
                          alt="Logo"
                        />
                      </MuiLink>
                    </div>     
                ) 
            : 
              <MuiLink component={NavLink} onClick={() => {setCurrentPath("/"); handleDrawerToggle()}} to="/">
                <img
                  className={classes.logo}
                  src={Logo}
                  alt="Logo"
                />
              </MuiLink>
            }            
            <List>
                {Object.keys(routes).map((item) => (
                    <MuiLink underline="none" className={classes.link} component={NavLink} onClick={() => {setCurrentPath(routes[item].path); handleDrawerToggle()}} to={routes[item].path}>
                        <ListItem selected={routes[item].path === currentPath} button key={item}>
                        {routes[item].path === currentPath ? (
                          <ListItemIcon style={{color: "inherit"}}>{routes[item].icon}</ListItemIcon>
                        )
                        :
                          <ListItemIcon style={{color: primaryText}}>{routes[item].icon}</ListItemIcon>
                        }
                        
                        <ListItemText primary={item} style={{color: primaryText}}/>
                        </ListItem>
                    </MuiLink>
                ))}
            </List>
        </div>
    );

    if(path === "/tasks" || path === "/study" || path === "/notes" || path === "/insights" || path === "/friends") {
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
                      <IconButton variant="h6" style={{display: "inline-block", padding: "6px"}} color="inherit" aria-controls="acct-menu" aria-haspopup="true" onClick={openAcctMenu}>
                          <AccountCircleIcon />
                      </IconButton>
                      <Menu
                        id="acct-menu"
                        anchorEl={acctAnchor}
                        keepMounted
                        open={Boolean(acctAnchor)}
                        onClose={closeAcctMenu}
                      >
                        <MenuItem>
                          <AccountCircleIcon fontSize="small" />
                          <Typography variant="inherit" style={{margin: "0px 5px"}}>{JSON.parse(localStorage.getItem("userData")).displayName}</Typography>
                        </MenuItem>
                      </Menu>
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
                          <MenuItem onClick={() => {
                              localStorage.removeItem("recordedUser")
                              localStorage.removeItem("userData")
                              logoutUser()
                              window.location.pathname = "/login"
                              }}>
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
                  elevation={4}
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
                  elevation={4}
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
                          <Typography style={{display: "inline-block", padding: "8px"}}>{JSON.parse(localStorage.getItem("userData")).displayName}</Typography>
                          <Tooltip title="Logout" placement="top">
                            <IconButton onClick={() => {
                              localStorage.removeItem("userData")
                              logoutUser()
                              window.location.pathname = "/tasks"}} style={{display: "inline-block"}}>
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

    else if(path === "/login" || path === "/register") {
      return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
              <CssBaseline />
              <main className={classes.content}>
                      {props.children}
              </main>
            </div>
        </ThemeProvider>
      );
    }

    else {
      return (
        <ThemeProvider theme={theme}>
            <div className={classes.root} style={{overflowX: "hidden"}}>
              <CssBaseline />
              <Hidden smDown implementation="css">
                <AppBar position="fixed" className={classes.appBar} color="inherit">
                  <Toolbar style={{paddingLeft: "0px"}}>
                      <MuiLink onClick={() => setCurrentPath("/")} component={NavLink} to="/">
                          <img
                              className={classes.miniLogo}
                              src={MiniLogo}
                              alt="Logo"
                          />
                      </MuiLink>
                      <div style={{textAlign: "right", marginLeft: "auto"}}>
                          <Grid
                              container
                              direction="row"
                              spacing={5}
                              style={{lineHeight: "40px"}}
                          >
                            <Grid item style={{paddingTop: "23px"}}>
                              <motion.div
                                initial={{width: "0%", borderBottom: "none"}}
                                style={{height: "38px"}}
                                whileHover={{
                                    width: "100%",
                                    borderBottom:"2px solid"
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                <motion.a
                                  initial={{ opacity: 0.6 }}
                                  whileHover={{
                                    opacity: 1,
                                  }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <MuiLink
                                    className={classes.landingLink}  
                                    component={NavLink}
                                    to="/about"
                                    onClick={() => setCurrentPath("/about")}
                                    style={{
                                      textDecoration: "none",
                                      color: primaryText,
                                    }}
                                  >
                                    About
                                  </MuiLink>
                                </motion.a>
                              </motion.div>
                            </Grid>
                            <Grid item style={{paddingTop: "23px"}}>
                              <motion.div
                                initial={{width: "0%", borderBottom: "none"}}
                                style={{height: "38px"}}
                                whileHover={{
                                    width: "100%",
                                    borderBottom:"2px solid"
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                <motion.a
                                  initial={{ opacity: 0.6 }}
                                  whileHover={{
                                    opacity: 1,
                                  }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <MuiLink
                                    className={classes.landingLink}  
                                    component={NavLink}
                                    to="/contact"
                                    onClick={() => setCurrentPath("/contact")}
                                    style={{
                                      textDecoration: "none",
                                      color: primaryText,
                                    }}
                                  >
                                    Contact
                                  </MuiLink>
                                </motion.a>
                              </motion.div>
                            </Grid>
                            <Grid item style={{paddingTop: "23px"}}>
                              <motion.div
                                initial={{width: "0%", borderBottom: "none"}}
                                style={{height: "38px"}}
                                whileHover={{
                                    width: "100%",
                                    borderBottom:"2px solid"
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                <motion.a
                                  initial={{ opacity: 0.6 }}
                                  whileHover={{
                                    opacity: 1,
                                  }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <MuiLink
                                    className={classes.landingLink}  
                                    component={NavLink}
                                    to="/team"
                                    onClick={() => setCurrentPath("/team")}
                                    style={{
                                      textDecoration: "none",
                                      color: primaryText,
                                    }}
                                  >
                                    Team
                                  </MuiLink>
                                </motion.a>
                              </motion.div>
                            </Grid>
                            <Grid item>
                              <MuiLink underline="none" component={NavLink} onClick={() => setCurrentPath("/login")} to="/login">
                                <Button className={classes.navButton} color="primary" style={{fontSize: "16px", textTransform: "none",  lineHeight: "40px", padding: "0px", marginRight: "5px"}}>Login</Button>
                              </MuiLink>
                              <MuiLink underline="none" component={NavLink} onClick={() => setCurrentPath("/register")} to="/register">
                                <Button className={classes.navButton} color="primary" variant="contained" disableElevation style={{fontSize: '16px', textTransform: "none", padding: "0px 10px", lineHeight: "40px"}}>Register</Button>
                              </MuiLink> 
                              <Tooltip title="Dark Mode" placement="bottom">
                                  <IconButton onClick={handleThemeChange}>
                                      <NightsStayIcon fontSize="small" style={{marginLeft: "5px"}}/>
                                  </IconButton>
                              </Tooltip>
                            </Grid>
                          </Grid>
                      </div>
                  </Toolbar>
              </AppBar>
            </Hidden>
            <Hidden smUp implementation="css">
              <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar style={{paddingLeft: "0px"}}>
                  <MuiLink onClick={() => setCurrentPath("/")} href="/">
                      <img
                          className={classes.miniLogo}
                          src={MiniLogo}
                          alt="Logo"
                      />
                  </MuiLink>
                  <div style={{textAlign: "right", marginLeft: "auto"}}>
                    <IconButton onClick={() => handleDrawerToggle}>
                      <MenuIcon />
                    </IconButton>
                  </div>
                </Toolbar>
              </AppBar>
            </Hidden>
            <main className={classes.content} style={{padding: "0px"}}>
                <Toolbar />
                {props.children}
            </main>
          </div>
        </ThemeProvider>
      )
    }
}

export default NavBar
