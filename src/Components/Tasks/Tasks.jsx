import React from 'react'
import { useSelector } from "react-redux"

import Task from './Task/Task'
import useStyles from "./Styles"
import Form from "./Form/Form"

import useMediaQuery from '@material-ui/core/useMediaQuery';
import {Grid, CircularProgress, Typography, Grow } from "@material-ui/core"

import { motion } from "framer-motion"

const taskVariants = {
  enter: { transition: { staggerChildren: 0.2 } },
  exit: { transition: { staggerChildren: 0.2 } }
}

const handleClick = (event) => {
    event.target.style.border = "black 2px solid"
}

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
                                    <Task task={task} style={{display: "inline-block"}} onClick={() => handleClick}/>
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