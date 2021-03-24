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


const NavBar = (props) => {
    
    const path = window.location.pathname === "/" ? "/tasks" : window.location.pathname
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                
                <img
                    className={classes.logo}
                    src={Logo}
                    alt="Logo"
                />
                
                <List>
                    {Object.keys(routes).map((item) => (
                        <NavLink className={classes.link} to={routes[item].path}>
                            <ListItem selected={routes[item].path === path} button key={item}>
                            <ListItemIcon>{routes[item].icon}</ListItemIcon>
                            <ListItemText primary={item} />
                            </ListItem>
                        </NavLink>
                    ))}
                </List>

            </Drawer>
            <main className={classes.content}>
                {props.children}
            </main>
        </div>
    )
}

export default NavBar
