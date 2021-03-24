import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import useStyles from "./Styles"
import { createTask } from "../../../Actions/Tasks"

import { TextField, Button, Typography, Paper, MenuItem } from "@material-ui/core"
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const Form = () => {
    const CHARACTER_LIMIT = 250;
    const tags = [
        {
            value: 'School',
            label: 'School',
        },
        {
            value: 'Work',
            label: 'Work',
        },
        {
            value: 'Life',
            label: 'Life',
        },
        {
            value: 'Exercise',
            label: 'Exercise',
        },
    ];

    const classes = useStyles();
    const dispatch = useDispatch();

    const [taskData, setTaskData] = useState({
        title: "", description: "", tag: "", predictedTime: "" 
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createTask(taskData))
        window.location.reload()
    }
    const theme = createMuiTheme({
        palette: {
          primary: {
            main: purple[500],
          },
          secondary: {
            main: green[500],
          },
        },
    });
    
    const clear = () => {

    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6" style={{fontWeight: "bold"}}>Create Task</Typography>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={taskData.title} onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}/>
                <TextField name="description" variant="outlined" label="Description" inputProps={{ maxlength: CHARACTER_LIMIT }} helperText={`${taskData.description.length}/${CHARACTER_LIMIT}`} multiline rowsMax={4} fullWidth value={taskData.description}onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}/>
                <TextField name="tag" 
                    variant="outlined" 
                    label="Tag" 
                    select 
                    fullWidth
                    value={taskData.tag}
                    onChange={(e) => setTaskData({ ...taskData, tag: e.target.value })}
                >
                    {tags.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField name="predictedTime" type="number" variant="outlined" label="Predicted Time (mins)" fullWidth value={taskData.predictedTime}onChange={(e) => setTaskData({ ...taskData, predictedTime: e.target.value })}/>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit">Create</Button>
                <Button className={classes.buttonSubmit} variant="outlined" color="primary" size="large" onClick={clear}>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form;

