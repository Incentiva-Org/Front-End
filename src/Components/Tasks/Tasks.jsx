import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import Task from './Task/Task'
import Form from './Form/Form'
import useStyles from './Styles'

import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import ClearIcon from '@material-ui/icons/Clear'
import IconButton from '@material-ui/core/IconButton'
import {Grid, Typography} from "@material-ui/core"

const Tasks = () => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    //const mobile = useMediaQuery('(max-width:750px)')
    const tasks = useSelector((state) => state.tasks)

    const [currentId, setCurrentId] = useState(null)

    console.log(Date())
    return (
        !tasks.length ?
            <>
                <h1>Tasks</h1>
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
                                <Form currentId={currentId} setCurrentId={setCurrentId}/>
                            </div>
                        </Fade>
                    </Modal>
                </div>
                <Typography variant="h5">Add your first task!</Typography>
            </>
        : (
            <>
                <h1>Tasks</h1>
                <Grid className={classes.mainContainer} container spacing={2}>
                    {tasks.map((task) => (
                        <Grid key={task._id} item xs={12} sm={6}>
                            <Task task={task} style={{display: "inline-block"}}/>
                        </Grid>
                    ))}
                </Grid>
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
                                <Form currentId={currentId} setCurrentId={setCurrentId}/>
                            </div>
                        </Fade>
                    </Modal>
                </div>
            </>
        )
    )
}

export default Tasks
