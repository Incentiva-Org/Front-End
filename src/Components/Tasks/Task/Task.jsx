import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { Typography } from '@material-ui/core'
import {Card, CardActions, CardContent, Chip, IconButton } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import useStyles from "./Styles"
import EditIcon from '@material-ui/icons/Edit';
  
const Task = ({ task }) => {
    const tasks = useSelector((state) => state.tasks)
    const classes = useStyles();

    const [raised, setRaised] = useState(false);
    const toggleRaised = () => {
        setRaised(!raised);
    }

    const [selected, setSelected] = useState(false);
    const outline = (event) => {
        setSelected(!selected)
    }
    return (
        <Card className={classes.card} onMouseOver={toggleRaised} onMouseOut={toggleRaised} raised={raised} style={{border: {...raised ? ("2px black solid") : ""}}}>
            <CardContent>
                <div className={classes.header}>
                    <Typography variant="h5" gutterBottom style={{display: "inline-block", fontWeight: "bold", width: "75%"}}>{task.title}</Typography>
                    <Typography variant="caption" gutterBottom style={{display: "inline-block", float: "right", width: "68px"}}>{task.day}</Typography>
                </div>
                <Typography>{task.predictedTime} mins</Typography>
                <Chip label={task.tag} classname={classes.chip}/>
                <Typography variant="body2" component="p" style={{margin: "0px 5px", height: "80px", width: "100%"}}>{task.description}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <IconButton size="small" aria-label="delete" color="primary" onClick={() => {}}>
                    <DeleteIcon fontSize="medium" />
                </IconButton>
                <IconButton size="small" aria-label="edit" color="primary" onClick={() => {}}>
                    <EditIcon fontSize="medium" />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Task;