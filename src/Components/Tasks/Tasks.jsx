import React, {useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"

import Task from './Task/Task'
import useStyles from "./Styles"
import Form from "./Form/Form"

import { getTasks } from "../../Actions/Tasks"

import {Grid, Typography, Grow } from "@material-ui/core"

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
        ? { y: curIndex * 170 + y, scale: 1.1, zIndex: '1', shadow: 15, immediate: (n) => n === 'y' || n === 'zIndex' }
        : { y: order.indexOf(index) * 170, scale: 1, zIndex: '0', shadow: 1, immediate: false }

    const DraggableList = ({ items, classes }) => {
        const order = useRef(items.map((_, index) => index)) // Store indicies as a local ref, this represents the item order
        const [springs, setSprings] = useSprings(items.length, fn(order.current)) // Create springs, each corresponds to an item, controlling its transform, scale, etc.
        const bind = useDrag(({ args: [originalIndex], active, movement: [, y] }) => {
            const curIndex = order.current.indexOf(originalIndex)
            const curRow = clamp(Math.round((curIndex * 170 + y) / 170), 0, items.length - 1)
            const newOrder = swap(order.current, curIndex, curRow)
            setSprings(fn(newOrder, active, originalIndex, curIndex, y)) // Feed springs new style data, they'll animate the view without causing a single render
            if (!active) order.current = newOrder
        })
        return (
            <>
                <div className={classes.dragListContent} style={{ height: items.length * 180 }}>
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
                            <Task task={items[i]}/>
                        }
                    />
                ))}
                </div>
            </>
        )
    }
    const classes = useStyles();
    const tasks = useSelector((state) => state.tasks)

    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log(format(date, 'MM/dd/yyyy'))
    };
    const [loading, setLoading] = useState(true);
    
    var filteredTasks = []
    const getCount = () => {
        var cnt = 0;
        for(const i in tasks) {
            if(tasks[i].day === format(selectedDate, "MM/dd/yyyy")) {
                cnt += 1;
                filteredTasks.push(tasks[i])
            }
        }
        return cnt;
    }
    getCount();

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
          setLoading(false);
        }, 800);
        // Cancel the timer while unmounting
        return () => clearTimeout(timer);
    }, []);
    
    useEffect(() => {
        localStorage.setItem("selected-date", format(selectedDate, 'MM/dd/yyyy'))
    })
    return (
        <div className={classes.mainContainer}>
            <h1>Tasks</h1>
            <div style={{marginLeft: "18px", marginBottom: "18px"}}>
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
            <div style={{width: "380px", textAlign: "center"}}>
                <Typography variant="h6" style={{fontWeight:"bold"}}>On Deck:</Typography>
            </div>
            <div style={{
                margin: '0',
                padding: '0',
                height: '100%',
                width: '380px',
                overflow: 'hidden',
                userSelect: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <DraggableList items={filteredTasks} classes={classes} />
            </div>
            <Form />
            <br></br>
        </div>
    )
}
  
export default Tasks;