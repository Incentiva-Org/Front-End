import React, {useEffect, useState} from 'react'
import { useSelector } from "react-redux"

import Task from './Task/Task'
import useStyles from "./Styles"
import Form from "./Form/Form"

import useMediaQuery from '@material-ui/core/useMediaQuery';
import {Grid, CircularProgress, Typography, Grow } from "@material-ui/core"

import { motion } from "framer-motion"

import {format} from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import moment from 'moment'

const taskVariants = {
  enter: { transition: { staggerChildren: 0.2 } },
  exit: { transition: { staggerChildren: 0.2 } }
}

const handleClick = (event) => {
    event.target.style.border = "black 2px solid"
}

localStorage.setItem("selected-date", format(new Date(), "MM/dd/yyyy"))

const Tasks = () => {
    const classes = useStyles();
    const tasks = useSelector((state) => state.tasks)
    const [selectedDate, setSelectedDate] = useState(localStorage.getItem("selected-date"));
    const handleDateChange = (date) => {
        setSelectedDate(date);
        localStorage.setItem("selected-date", format(date, "MM/dd/yyyy"))
    };
    return (
        !tasks.length ?
            <div className={classes.mainContainer}>
                <h1>Tasks</h1>
                <CircularProgress style={{marginLeft: "auto", marginRight: "auto"}}/>
                <Form />
            </div>
        : (
            <div className={classes.mainContainer}>
                <h1>Tasks</h1>
                <div style={{marginLeft: "18px"}}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Select Date:"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </div>

                <Grid container spacing={2}>
                    {tasks.map((task) => (
                        {...task.day === selectedDate ?
                            ( 
                                <Grow
                                    in
                                    style={{ transformOrigin: '0 0 0' }}
                                    {...(true ? { timeout: 1000 } : {})}
                                >
                                    <Grid key={task._id} item xs={12} sm={12} md={6} lg={4} xl={4}>
                                        <Task task={task} style={{display: "inline-block"}} onClick={() => handleClick}/>
                                    </Grid>
                                </Grow>
                            )
                            :
                            <div></div>
                        }
                    ))}
                </Grid>
                <Form />
                <br></br>
            </div>
        )
    )
}

export default Tasks;