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
import Skeletons from "./Task/Skeletons"

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
    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log(format(date, 'MM/dd/yyyy'))
    };
    const [loading, setLoading] = useState(false);
    
    const getCount = () => {
        var cnt = 0;
        for(const i in tasks) {
            if(tasks[i].day === format(selectedDate, "MM/dd/yyyy")) {
                cnt += 1;
            }
        }
        return cnt;
    }

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
          setLoading(false);
        }, 1000);
        // Cancel the timer while unmounting
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        localStorage.setItem("selected-date", format(selectedDate, 'MM/dd/yyyy'))
    })

    return (
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

            {loading && <Skeletons numItems={getCount()} />}
            {!loading && <Grid container spacing={2}>
                {tasks.map((task) => (
                    {...task.day === format(selectedDate, "MM/dd/yyyy") ?
                        ( 
                            <Grow
                                in
                                style={{ transformOrigin: '0 0 0' }}
                                {...(true ? { timeout: 1000 } : {})}
                            >
                                <Grid key={task._id} item xs={12} sm={12} md={6} lg={4} xl={4}>
                                    {<Task task={task} style={{display: "inline-block"}} onClick={() => handleClick}/>}
                                </Grid>
                            </Grow>
                        )
                        :
                        <div></div>
                    }
                ))}
            </Grid>}
            <Form />
            <br></br>
        </div>
    )
}

export default Tasks;