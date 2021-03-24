import React, { useState } from 'react'
import Task from './Task/Task'
import useStyles from "./Styles"
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {Grid, CircularProgress, Typography } from "@material-ui/core"
import { useSelector } from "react-redux"
import Form from "../Form/Form"

const Tasks = () => {
    const classes = useStyles();
    const mobile = useMediaQuery('(max-width:750px)');
    const tasks = useSelector((state) => state.tasks)

    return (
        !tasks.length ?
            <div className={classes.mainContainer}>
                <h1>Tasks</h1>
                <Typography variant="h5">Add your first task!</Typography>
                <Form />
            </div>
        : (
            <div className={classes.mainContainer}>
                <h1>Tasks</h1>
                <Grid container spacing={2}>
                    {tasks.map((task) => (
                        <Grid key={task._id} item xs={12} sm={6}>
                            <Task task={task} style={{display: "inline-block"}}/>
                        </Grid>
                    ))}
                </Grid>
                <Form />
                <br></br>
            </div>
        )
    )
}

export default Tasks;
