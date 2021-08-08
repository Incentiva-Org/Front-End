import React, {useEffect, useState, useRef} from 'react'

import { fetchTasks, createUserUid } from "../../../API/index"
import { resendVerification } from "../../../API/Auth/AuthProvider"

import Task from './Task/Task'
import useStyles from "./Styles"
import Form from "./Form/Form"

import {Grid, Typography, Grow, Tooltip, Button, Snackbar } from "@material-ui/core"
import { Alert } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import {format} from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import Skeletons from "./Task/Skeletons"

import clamp from 'lodash-es/clamp'
import swap from 'lodash-move'
import { useDrag } from 'react-use-gesture'
import { useSprings, animated, useTransition } from 'react-spring'


const Tasks = () => {

    useEffect(() => {
        if(!localStorage.getItem('recordedUser')){
            const uid = JSON.parse(localStorage.getItem('userData')).uid
            const username = JSON.parse(localStorage.getItem('userData')).displayName

            if(username){

                createUserUid(uid, username).then((res) => {
                    if(res.data.success){
                        localStorage.setItem("recordedUser", true)
                        console.log(res.data.success)
                    }
                })
            }else{
                const username = localStorage.getItem('tempUsername')
                
                createUserUid(uid, username).then((res) => {
                    if(res.data.success){
                        localStorage.setItem("recordedUser", true)
                        console.log(res.data.success)
                        localStorage.removeItem('tempUsername')
                    }
                })

            }
        }

    }, [])

    const fn = (order, active, originalIndex, curIndex, y) => (index) =>
    active && index === originalIndex
        ? { y: curIndex * 220 + y, scale: 1.1, zIndex: '1', shadow: 15, immediate: (n) => n === 'y' || n === 'zIndex' }
        : { y: order.indexOf(index) * 220, scale: 1, zIndex: '0', shadow: 1, immediate: false }

    const DraggableList = ({ items, classes }) => {
        const order = useRef(items.map((_, index) => index)) // Store indicies as a local ref, this represents the item order
        const [springs, setSprings] = useSprings(items.length, fn(order.current)) 
        const bind = useDrag(({ args: [originalIndex], active, movement: [, y] }) => {
            const curIndex = order.current.indexOf(originalIndex)
            const curRow = clamp(Math.round((curIndex * 220 + y) / 220), 0, items.length - 1)
            const newOrder = swap(order.current, curIndex, curRow)
            setSprings(fn(newOrder, active, originalIndex, curIndex, y)) // Feed springs new style data, they'll animate the view without causing a single render
            if (!active) order.current = newOrder
        })


        return (
            <>
                <div className={classes.dragListContent} style={{ height: items.length * 220 }}>
                {springs.map(({ zIndex, shadow, y, scale }, i) => (
                    <animated.div
                        {...bind(i)}
                        key={i}
                        style={{
                            zIndex,
                            boxShadow: shadow.to((s) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
                            y,
                            scale
                        }}
                        children={
                            <Task task={items[i]} reloadTasks={reloadTasks} />
                        }
                    />
                ))}
                </div>
            </>
        )
    }
    const ItemList = ({items, classes}) => {
        if(items) {
            return (
                <>
                    {items.map((task, index) => (
                        <Grid item>
                            <Task task={task} reloadTasks={reloadTasks} /> 
                        </Grid>
                    ))}
                </>
            )
        }
        else {
            return <Skeletons numItems={items.length} />
        }
    }
    const classes = useStyles();

    const [tasks, setTasks] = useState()

    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log(format(date, 'MM/dd/yyyy'))
    };
    const [loading, setLoading] = useState(false);
    var onDeck = []
    var completed = []
    const getCount = () => {
        var cnt = 0;
        for(const i in tasks) {
            if(tasks[i].day === format(selectedDate, "MM/dd/yyyy")) {
                cnt++;
                
                if(tasks[i].completed === true) {
                    console.log(tasks[i])
                    completed.push(tasks[i])
                }
                else {
                    onDeck.push(tasks[i])
                }
            }
        }
        return [onDeck.length, completed.length];
    }

    getCount()
    
    const reloadTasks = () => {
        
        fetchTasks(JSON.parse(localStorage.getItem('userData')).uid).then((response) => {
            
            const returnResponse = response.data
            console.log('reloaded')
            setTasks(returnResponse['tasksData'])
            setLoading(false)
        })

    }

    useEffect(() => {
        localStorage.setItem("selected-date", format(selectedDate, 'MM/dd/yyyy'))
    }, []);

    const emailVerified = JSON.parse(localStorage.getItem('userData')).emailVerified

    useEffect(() => {
        setLoading(true);
        reloadTasks();
        const timer = setTimeout(() => {
          setLoading(false);
          
        }, 1000);
        // Cancel the timer while unmounting
        return () => clearTimeout(timer);
    }, []);
    

    
    const [emailSuccess, setEmailSuccess] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setEmailSuccess(false);
    };

    return (
        <div className={classes.mainContainer}>
            {!emailVerified &&
                <Alert variant="outlined" severity="warning">
                    <div >
                        <Typography>Your email is unverified! Please check your email to verify it as soon as possible.</Typography>
                        <Button onClick={() => {
                            resendVerification()
                            setEmailSuccess(true)
                        }} style={{marginTop:"5px"}} variant="outlined">Resend Verification Email</Button>

                    </div>
                    
                </Alert>
            }
            <h1>Tasks</h1>
            <div style={{marginLeft: "18px", marginBottom: "18px", marginRight: "10px"}}>
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
                    <div style={{marginTop: "20px", display: "inline-block"}}>
                        <Tooltip title="Yesterday" placement="bottom" onClick={() => {
                            const date = new Date(selectedDate)
                            date.setDate(date.getDate() - 1)
                            setSelectedDate(date)

                        }}>
                            <IconButton>
                                <ArrowBackIosIcon fontSize="small" style={{marginLeft: "5px"}}/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Tomorrow" placement="bottom" onClick={() => {
                            const date = new Date(selectedDate)
                            date.setDate(date.getDate() + 1)
                            setSelectedDate(date)

                        }}>
                            <IconButton>
                                <ArrowForwardIosIcon fontSize="small" style={{marginLeft: "5px"}}/>
                            </IconButton>
                        </Tooltip>
                    </div>
                </MuiPickersUtilsProvider>
            </div>
            {!onDeck.length == 0 && <Typography variant="h6" style={{textAlign: "center", fontWeight: "bold"}}>On Deck</Typography>}
            {loading && <Skeletons numItems={onDeck.length} />}
            {!loading && 
                <Grid container spacing={3} style={{justifyContent: 'center'}}>
                    <ItemList items={onDeck} classes={classes} />
                </Grid>
            }
            
            <br></br>
            {!completed.length == 0 &&  <Typography variant="h6" style={{textAlign: "center", fontWeight: "bold", marginTop: "10px"}}>Completed</Typography>}
            {loading && <Skeletons numItems={completed.length} />}
            {!loading && 
                <Grid container spacing={3} style={{justifyContent: 'center'}}>
                    <ItemList items={completed} classes={classes} />
                </Grid>
            }

            <Form reloadTasks={reloadTasks} />
            <br></br>
            <div style={{height: "150px"}}></div>
            <Snackbar open={emailSuccess} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Email Sent!
                </Alert>
            </Snackbar>
        </div>
    )
}
  
export default Tasks;