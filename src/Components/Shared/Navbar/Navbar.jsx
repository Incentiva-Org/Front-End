import React, { useState } from 'react'
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

const NavBar = (props) => {
    
    const path = window.location.pathname === "/" ? "/tasks" : window.location.pathname
    const [currentPath, setCurrentPath] = useState(path)
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);

    const mobile = useMediaQuery('(max-width:600px)');

    const handleDrawerToggle = () => {
        if(mobile) {
            setMobileOpen(!mobileOpen);
        }
    };
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
                    <MuiLink classes={{root: classes.link, onClick: classes.selected}} component={NavLink} onClick={() => {setCurrentPath(routes[item].path); handleDrawerToggle()}} to={routes[item].path}>
                        <ListItem selected={routes[item].path === currentPath} button key={item}> 
                        <ListItemIcon>{routes[item].icon}</ListItemIcon>
                        <ListItemText primary={item} />
                        </ListItem>
                    </MuiLink>
                ))}
            </List>
        </div>
    );

    return (
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
                    <IconButton variant="h6" style={{display: "inline-block", padding: "6px"}} color="inherit">
                        <MoreVertIcon />
                    </IconButton>
                </div>
                </Toolbar>
            </AppBar>
          )
        :
            <div></div>
        }
          <nav className={classes.drawer} aria-label="side drawer">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
                  keepMounted: true, // Better open performance on mobile.
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
              </Drawer>
            </Hidden>
          </nav>
        <main className={classes.content}>
            {mobile? (<div className={classes.toolbar} />) : <div></div>}
            {props.children}
        </main>
        </div>
      );
}

export default NavBar
