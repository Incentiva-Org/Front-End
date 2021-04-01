import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { Typography } from '@material-ui/core'
import {Card, CardActions, CardContent, Chip, IconButton, Grid } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import useStyles from "./Styles"
import EditIcon from '@material-ui/icons/Edit';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import Tooltip from '@material-ui/core/Tooltip';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

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
    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        event.target.style.textDecoration = "line-through"
        
    };

    return (
        <Card className={classes.card} onMouseOver={toggleRaised} onMouseOut={toggleRaised} raised={raised} style={{border: {...raised ? ("2px black solid") : ""}}}>
            <CardContent>
                <Typography variant="caption" gutterBottom style={{float: "right", width: "68px"}}>{task.day}</Typography>
                <div className={classes.header}>
                    <FormControlLabel
                        
                        control={
                        <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            className={classes.checkBox}
                            icon={<CheckBoxOutlineBlankIcon fontSize="medium" />}
                            checkedIcon={<CheckBoxIcon fontSize="medium" />}
                            color="primary"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                            style={{display: "inline-block", left: 0, top: 0}}
                        />
                        }
                        label={
                            <Typography variant="h6" className={classes.title} style={{fontWeight: "bold", textDecoration: {...checked ? ("line-through") : "none"}}}>{task.title}</Typography>
                        }
                    />
                    
                </div>
                <Grid container alignItems="center">
                    <Chip label={task.tag} classname={classes.chip} style={{margin: "4px", padding: "6px 0px", height: "30px", top: 0, display: "inline-block"}}/>
                    <Typography variant="body2" style={{display: "inline-block", margin: "4px"}}>{task.predictedTime} mins</Typography>
                </Grid>
                <Typography variant="body2" component="p" style={{margin: "0px 5px", height: "40px", width: "100%"}}>{task.description}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Tooltip title="Edit" placement="top">
                    <IconButton size="small" aria-label="edit" color="primary" onClick={() => {}}>
                        <EditIcon fontSize="medium" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete" placement="top">
                    <IconButton size="small" aria-label="delete" color="primary" onClick={() => {}}>
                        <DeleteIcon fontSize="medium" />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    )
}

export default Task;