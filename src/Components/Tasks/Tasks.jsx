import React from 'react'
import { useSelector } from "react-redux"

import Task from './Task/Task'
import useStyles from "./Styles"
import Form from "./Form/Form"

import useMediaQuery from '@material-ui/core/useMediaQuery';
<<<<<<< HEAD
import {Grid, CircularProgress, Typography, Grow } from "@material-ui/core"
import { useSelector } from "react-redux"
import Form from "../Form/Form"

=======
import {Grid, Grow } from "@material-ui/core"

/* const periodV = {
    hidden:{
       opacity: 0,
       x: '200%'
    },
    visible:{
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 50
        }
    }
}

const bigContainerVariants = {
    hidden:{
        opacity: 0
    },
    visible:{
        opacity: 1,
        transition: {
            staggerChildren: "0.10"
        }
    }
}
 */
>>>>>>> d6c2bb195560b60d8c8e5554619364f9d8120d2c
const Tasks = () => {
    const classes = useStyles();
    const mobile = useMediaQuery('(max-width:750px)');
    const tasks = useSelector((state) => state.tasks)

    return (
        !tasks.length ?
            <div className={classes.mainContainer}>
                <h1>Tasks</h1>
                <Form />
            </div>
        : (
            <div className={classes.mainContainer}>
                <h1>Tasks</h1>
                <Grid container spacing={2}>
                    {tasks.map((task) => (
                        <Grow
                            in
                            style={{ transformOrigin: '0 0 0' }}
                            {...(true ? { timeout: 1000 } : {})}
                        >
                            <Grid key={task._id} item xs={12} sm={12} md={6} lg={4} xl={4}>
                                <Task task={task} style={{display: "inline-block"}}/>
                            </Grid>
                        </Grow>
                    ))}
                </Grid>
                <Form />
                <br></br>
            </div>
        )
    )
}

export default Tasks;
