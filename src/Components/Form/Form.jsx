import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper, MenuItem, Snackbar } from "@material-ui/core"
import MuiAlert from '@material-ui/lab/Alert';
import useStyles from "./Styles"
import { useDispatch } from 'react-redux'
import { createTask } from "../../Actions/Tasks"
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
        title: "", description: "", tag: "", predictedTime: "", day: new Date()
    })

    const clear = () => {
        setTaskData({title: "", description: "", tag: "", predictedTime: ""});
    }

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [alert, setAlert] = useState(false);
    const closeAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
          }
          setAlert(false);
    }
    const [severity, setSeverity] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(taskData.title != "" && taskData.description != "" && taskData.tag != "" && taskData.predictedTime != "") {
            dispatch(createTask(taskData));
            handleClose();
            clear();
            setTimeout(1000);
            setSeverity("success")
        }
        else {
            setSeverity("error")
        }
        setAlert(true)
    }
    return (
        <>
            <div className={classes.fab}>
                <Fab color="primary" aria-label="add" onClick={handleOpen}>
                    <AddIcon />
                </Fab>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                    disableAutoFocus={true}
                    disableEnforceFocus={true}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <IconButton aria-label="cancel" style={{float: "right", margin: "12px 5px"}} onClick={handleClose}>
                                <ClearIcon />
                            </IconButton>
                            <Paper className={classes.paper}>
                                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                                    <Typography variant="h6" style={{fontWeight: "bold"}}>Create Task</Typography>
                                    <TextField name="title" variant="outlined" label="Title" fullWidth value={taskData.title} onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}/>
                                    <TextField name="description" variant="outlined" label="Description" inputProps={{ maxLength: CHARACTER_LIMIT }} helperText={`${taskData.description.length}/${CHARACTER_LIMIT}`} multiline rowsMax={4} fullWidth value={taskData.description}onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}/>
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
                                <Snackbar open={alert && severity == "error"} autoHideDuration={2000} onClose={closeAlert}>
                                    <Alert onClose={closeAlert} severity={severity}>
                                        All fields must be filled out!
                                    </Alert>
                                </Snackbar>
                            </Paper>
                        </div>
                    </Fade>
                </Modal>
                <Snackbar open={alert && severity == "success"} autoHideDuration={2000} onClose={closeAlert}>
                    <Alert onClose={closeAlert} severity={severity}>
                        Task created successfully!
                    </Alert>
                </Snackbar>
            </div>    
        </>
    )
}

export default Form;

