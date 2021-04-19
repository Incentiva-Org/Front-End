import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { editTask } from "../../../../API/index"
import { deleteTask } from '../../../../API/index';

import { Paper, Typography } from '@material-ui/core'
import {Card, CardActions, CardContent, Chip, IconButton, Grid, Snackbar, TextField, MenuItem, Button, Zoom } from "@material-ui/core"
import {withStyles} from "@material-ui/core/styles"
import DeleteIcon from "@material-ui/icons/Delete"
import useStyles from "./Styles"
import EditIcon from '@material-ui/icons/Edit';
import Checkbox from '@material-ui/core/Checkbox';
import { motion } from "framer-motion";
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Task = ({ task, reloadTasks }) => {

    const classes = useStyles();

    const [taskData, setTaskData] = useState({
        title: task.title, description: task.description, tag: task.tag, predictedTime: task.predictedTime, day: task.day, completed: task.completed
    })

    const [raised, setRaised] = useState(false);
    const toggleRaised = () => {
        setRaised(!raised);
    }

    const [checked, setChecked] = useState(taskData.completed);
        
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
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleDescClick = (event) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };
  
    const descOpen = Boolean(anchorEl);
    const id = descOpen ? 'transitions-popper' : undefined;

    const CHARACTER_LIMIT = 150;
    const tags = [
        {
            value: 'School',
            label: 'School',
            color: "FF8042"
        },
        {
            value: 'Work',
            label: 'Work',
            color: "FFBB28"
        },
        {
            value: 'Life',
            label: 'Life',
            color: "00C49F"
        },
        {
            value: 'Exercise',
            label: 'Exercise',
            color: "0088FE"
        },
    ];
    var color = ""
    for(const i in tags) {
        if(tags[i].value === task.tag) {
            color = tags[i].color
        }
    }
    
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
            editTask(task._id, taskData).then(() => {
                reloadTasks()
                handleClose();
                setTimeout(1000);
                setSeverity("success")
            })
        }
        else {
            setSeverity("error")
        }
        setAlert(true)
        
    }
    const handleChange = (event) => {
        event.preventDefault()
        setChecked(event.target.checked);

        setTaskData({title: task.title, description: task.description, tag: task.tag, predictedTime: task.predictedTime, day: task.day, completed: event.target.checked})

        editTask(task._id, {title: task.title, description: task.description, tag: task.tag, predictedTime: task.predictedTime, day: task.day, completed: event.target.checked}).then(() => {
            
            reloadTasks()
        })
    };
    
    return (
        <>
            <Card className={classes.card} onMouseOver={toggleRaised} onMouseOut={toggleRaised} raised={raised}>
                <CardContent style={{paddingBottom: "0px"}}>
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
                                style={{display: "inline-block", left: 0, top: 0, transitionDuration: "1000ms"}}
                            />
                            }
                            label={
                                {...checked ? 
                                    (
                                    <Typography variant="h7" className={classes.title} style={{fontWeight: "bold", textDecoration: "line-through", fontSize: "18px"}}>
                                        {task.title}
                                        <IconButton style={{padding: "0px", marginLeft:"5px"}} aria-describedby={id} onClick={handleDescClick}>
                                            <InfoOutlinedIcon />
                                        </IconButton>
                                    </Typography>
                                    )
                                    :
                                    <Typography variant="h7" className={classes.title} style={{fontWeight: "bold", fontSize: "18px"}}>
                                        {task.title}
                                        <Tooltip title="Description" placement="top">
                                            <IconButton style={{padding: "0px", marginLeft:"5px"}} aria-describedby={id} onClick={handleDescClick}>
                                                <InfoOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Typography>
                                }                            
                            }
                        />
                        <Popper id={id} open={descOpen} anchorEl={anchorEl} transition>
                            {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Paper style={{padding: "10px"}} elevation={8}>{task.description}</Paper>
                            </Fade>
                            )}
                        </Popper>
                    </div>
                    <Grid container alignItems="center">
                        <Chip label={task.tag} classname={classes.chip} style={{margin: "4px", marginLeft: "0px", padding: "4px 0px", height: "25px", top: 0, display: "inline-block", color: `#${color}`, background: `#${color}33`, borderRadius: "8px"}}/>
                        <Typography variant="body2" style={{display: "inline-block", margin: "4px"}}>{task.predictedTime} mins</Typography>
                    </Grid>
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
                            <IconButton size="small" aria-label="delete" color="primary"onClick={() => {
                                    deleteTask(task._id).then(() => reloadTasks())                                    
                                }}>
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
                                <TextField name="title" variant="outlined" label="Title" fullWidth value={taskData.title} inputProps={{ maxLength: 25 }} helperText={`${taskData.title.length}/25`} onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}/>
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
                                        style={{
                                            padding: "8px 0px"
                                        }}
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
                                        style={{
                                            padding: "8px 0px"
                                        }}
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