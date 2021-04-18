import React, {useEffect, useState, useRef} from 'react'

import { fetchTasks } from "../../../API/index"

import Task from './Task/Task'
import useStyles from "./Styles"
import Form from "./Form/Form"

import {Grid, Typography, Grow, Tooltip } from "@material-ui/core"
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
        return (
            <>
                {items.map((task, index) => (
                    <Grow in style={{ transformOrigin: '0 0 0' }}>
                        <Grid item style={{padding: "6px"}}>
                            <Task task={task} reloadTasks={reloadTasks} /> 
                        </Grid>
                    </Grow>
                ))}
            </>
        )
    }
    const classes = useStyles();
    //const mobile = useMediaQuery('(max-width:750px)');

    const [tasks, setTasks] = useState()



    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log(format(date, 'MM/dd/yyyy'))
    };
    const [loading, setLoading] = useState(true);
    
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
        return cnt;
    }

    getCount()

    const reloadTasks = () => {

        fetchTasks(JSON.parse(localStorage.getItem('userData')).username).then((response) => {
            const returnResponse = response.data
            console.log('reloaded')
            setTasks(returnResponse['tasksData'])
            setLoading(false)
        })

    }

    useEffect(() => {
        localStorage.setItem("selected-date", format(selectedDate, 'MM/dd/yyyy'))
        
        reloadTasks()
    }, []);
    
    

    return (
        <div className={classes.mainContainer}>
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
            <Typography variant="h6" style={{textAlign: "center", fontWeight: "bold"}}>On Deck</Typography>
            <Grid container spacing={3} style={{paddingTop: "20px", marginRight: "auto", marginLeft: "auto", width: "90%"}}>
                <ItemList items={onDeck} classes={classes}/>
            </Grid>
            <br></br>
            <Typography variant="h6" style={{textAlign: "center", fontWeight: "bold"}}>Completed</Typography>
            <Grid container spacing={3} style={{paddingTop: "20px", marginRight: "auto", marginLeft: "auto", width: "90%"}}>
                <ItemList items={completed} classes={classes}/>
            </Grid>
            <Form reloadTasks={reloadTasks} />
            <br></br>
        </div>
    )
}
  
export default Tasks;