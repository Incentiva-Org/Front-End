import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { editTask } from "../../../Actions/Tasks"
import { deleteTask } from '../../../Actions/Tasks';

import { Typography } from '@material-ui/core'
import {Card, CardActions, CardContent, Chip, IconButton, Grid, Snackbar, TextField, MenuItem, Button } from "@material-ui/core"
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
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Task = ({ task }) => {
    const tasks = useSelector((state) => state.tasks)
    const classes = useStyles();

    const [taskData, setTaskData] = useState({
        title: task.title, description: task.description, tag: task.tag, predictedTime: task.predictedTime, day: task.day, completed: task.completed
    })

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
        setTaskData({ ...taskData, completed: event.target.checked })
    };
    const dispatch = useDispatch();
    

    const clear = () => {
        setTaskData({title: "", description: "", tag: "", predictedTime: "", day: task.day, completed: task.completed});
    }

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const CHARACTER_LIMIT = 150;
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
    const [alert, setAlert] = useState(false);
    const closeAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
          }
          setAlert(false);
    }
    const [severity, setSeverity] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(taskData.title !== "" && taskData.description !== "" && taskData.tag !== "" && taskData.predictedTime !== "") {
            dispatch(editTask(task._id, taskData));
            handleClose();
            clear();
            setTimeout(2000);
            setSeverity("success")
        }
        else {
            setSeverity("error")
        }
        setAlert(true)
        console.log(task)
    }
    return (
        <>
            <Card className={classes.card} onMouseOver={toggleRaised} onMouseOut={toggleRaised} raised={raised} style={{border: {...raised ? ("2px black solid") : ""}}}>
                <CardContent>
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
                                {...checked ? 
                                    (<Typography variant="h6" className={classes.title} style={{fontWeight: "bold", textDecoration: "line-through"}}>{task.title}</Typography>)
                                    :
                                    <Typography variant="h6" className={classes.title} style={{fontWeight: "bold"}}>{task.title}</Typography>
                                }                            }
                        />
                        
                    </div>
                    <Grid container alignItems="center" style={{marginBottom: "10px"}}>
                        <Chip label={task.tag} classname={classes.chip} style={{margin: "4px", marginLeft: "0px", padding: "6px 0px", height: "30px", top: 0, display: "inline-block"}}/>
                        <Typography variant="body2" style={{display: "inline-block", margin: "4px"}}>{task.predictedTime} mins</Typography>
                    </Grid>
                    <Typography variant="body2" component="p" style={{margin: "0px 5px", height: "40px", width: "100%"}}>{task.description}</Typography>
                </CardContent>
                
                <CardActions className={classes.cardActions}>
                    <Typography variant="subtitle2" gutterBottom style={{marginLeft: "5px", float: "left", width: "68px" }}>{task.day}</Typography>
                    <div style={{marginLeft: "auto"}}>
                        <Tooltip title="Edit" placement="top">
                            <IconButton size="small" aria-label="edit" color="primary" onClick={handleOpen}>
                                <EditIcon fontSize="medium" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete" placement="top">
                            <IconButton size="small" aria-label="delete" color="primary"onClick={() => dispatch(deleteTask(task._id))}>
                                <DeleteIcon fontSize="medium" />
                            </IconButton>
                        </Tooltip>
                    </div>
                </CardActions>
            </Card>
            <Dialog 
                    aria-labelledby="customized-dialog-title" 
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                >
                        <MuiDialogTitle disableTypography className={classes.root}>
                            <Typography variant="h6">Edit Task</Typography>
                            <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </MuiDialogTitle>
                        <MuiDialogContent dividers>
                            <Typography>{taskData.day}</Typography>
                            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                                <TextField name="title" variant="outlined" label="Title" fullWidth value={taskData.title} onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}/>
                                <TextField name="description" variant="outlined" label="Description" inputProps={{ maxLength: CHARACTER_LIMIT }} helperText={`${taskData.description.length}/${CHARACTER_LIMIT}`} multiline rowsMax={4} fullWidth value={taskData.description} onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}/>
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
                                <MuiDialogActions style={{padding: "0px", marginLeft: "auto", marginRight: "auto", textAlign: "center"}}>
                                    <Button 
                                        className={classes.buttonSubmit} 
                                        variant="contained" 
                                        color="primary" 
                                        size="large" 
                                        type="submit" 
                                        component={motion.div}
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { duration: 0.2 }
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => {handleSubmit(e)}}
                                    >
                                        Confirm
                                    </Button>
                                    <Button 
                                        className={classes.buttonSubmit} 
                                        variant="outlined" 
                                        color="primary" 
                                        size="large" 
                                        type="submit" 
                                        component={motion.div}
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { duration: 0.2 }
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={clear}
                                    >
                                        Clear
                                    </Button>
                                </MuiDialogActions>
                            </form>
                            <Snackbar open={alert && severity === "error"} autoHideDuration={2000} onClose={closeAlert}>
                                <Alert onClose={closeAlert} severity={severity}>
                                    All fields must be filled out!
                                </Alert>
                            </Snackbar>
                        </MuiDialogContent>
                </Dialog>
                <Snackbar open={alert && severity === "success"} autoHideDuration={2000} onClose={closeAlert}>
                    <Alert onClose={closeAlert} severity={severity}>
                        Task edited successfully!
                    </Alert>
                </Snackbar>
        </>
    )
}

export default Task;