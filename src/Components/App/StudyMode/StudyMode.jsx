import React, {useState, useEffect} from 'react'

import useStyles from "./Styles"
import Alarm from '../../../Assets/Sounds/alarm_gentle.wav'

import { IconButton, Button, Typography, TextField } from "@material-ui/core"
import FullScreenIcon from '@material-ui/icons/Fullscreen';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function timeString(t) {
    var str = Math.floor(t/60) + ":" + t%60
    if (t%60<10) {
        str = str.replace(":", ":0")
    }
    if (Math.floor(t/60)<10) {
        str = "0" + str
    }
    return str
}

const StudyMode = () => {

    const AlarmAudio = new Audio(Alarm);

    const CountData = {
        "Work": 1500,
        "Short Break": 300,
        "Long Break": 900
    }
    
    const [selected, setSelected] = useState("Work")
    const [t, setT] = useState(CountData["Work"])
    const [paused, setPaused] = useState(true)

    useEffect(() => {
        if (!paused) {
            if (t!==0) {
                let timer = setTimeout(() => {
                    setT(t => t-1)
                }, 1000)
                return () => clearTimeout(timer)
            }
            else {
                AlarmAudio.play();
                openDonePrompt()
            }
        }
    }, [t, paused])

    useEffect(() => {
        if (paused) {
            setTimeForm(timeString(t))
        }
    }, [paused])

    useEffect(() => {
        setT(CountData[selected])
    }, [selected])
    
    const [timeForm, setTimeForm] = useState(timeString(t))

    const setTimeToForm = () => {
        var min = Math.floor(parseInt(timeForm.substring(0, timeForm.indexOf(":"))))
        var sec = Math.floor(parseInt(timeForm.substring(timeForm.indexOf(":")+1)))
        if (0<=min && 0<=sec && sec<=60) {
            setT(min*60 + sec)
        }
        setTimeout(() => {setPaused(false)}, 1000)
    }

    const [settings, setSettings] = useState(false); 
    const handleSubmit = () => {
        closeSettings();
    }
    const closeSettings = () => {
        setSettings(false);
    }

    const openSettings = () => {
        setSettings(true);
    }

    
    const [donePrompt, setDonePrompt] = useState(false); 
    const closeDonePrompt = () => {
        setDonePrompt(true);
        AlarmAudio.pause()
    }
    
    const openDonePrompt = () => {
        setDonePrompt(true);
    }

    const fullScreen = () => {
        const screen = document.documentElement;
        window.fullScreen ?  document.exitFullscreen().catch(() => {}) : screen.requestFullscreen().catch(() => {})
        
    }

    useEffect(() => {
        return () => {
            document.exitFullscreen().catch(() => {})
        }
    }, [])

    const mobile = useMediaQuery('(max-width:600px)');

    const classes = useStyles();

    const normalise = () => {
        return t * 100 / CountData[selected];
    }

    return (
        <div>
            <h1 style={{display: "inline-block"}}>Study Mode</h1>
            {!mobile && 
            
            <IconButton onClick={fullScreen} size='lg' style={{background: "rgba(128, 90, 213, 0.1)", marginTop: "10px", display: "inline-block", float: "right"}} color="primary" >
                <FullScreenIcon />
            </IconButton>
        }


            <div style={{marginLeft: "auto", marginRight: "auto", display: "block", textAlign: "center", width: "348px", fontSize: '35px', marginBottom: '20px'}}>
                <Box position="relative" display="inline-flex">
                    <CircularProgress variant="determinate" value={normalise()} thickness={1.8} color="primary" style={{width: "348px", height: "348px"}}/>
                    <Box
                        top={0}
                        left={0}
                        bottom={0}
                        right={0}
                        position="absolute"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography variant="h3" component="div" color="textSecondary">{timeString(t)}</Typography>
                    </Box>
                </Box>
            </div>
            <div style={{marginLeft: "auto", marginRight: "auto", display: "block", textAlign: "center"}}>
                <IconButton 
                    onClick={() => {
                        if (paused) {
                            setTimeToForm()
                        }
                        setPaused(!paused)
                    }} 
                    size='lg'
                    style={{marginBottom: "30px", marginRight: "20px", padding: "0px"}} 
                    color="primary"
                >
                    {paused ? 
                    (<PlayCircleOutlineIcon style={{width: "44px", height: "44px"}}/>)
                    :
                        <PauseCircleOutlineIcon style={{width: "44px", height: "44px"}}/>
                    }
                </IconButton>
                <IconButton onClick={openSettings} size='lg' style={{marginBottom: "30px", display: "inline-block", padding: "8px"}} color="primary" >
                    <SettingsIcon style={{width: "30px", height: "30px"}}/>
                </IconButton>
                <Dialog 
                    aria-labelledby="customized-dialog-title" 
                    className={classes.modal}
                    open={settings}
                    onClose={closeSettings}
                >
                    <MuiDialogTitle disableTypography className={classes.root}>
                        <Typography variant="h6">Settings</Typography>
                        <IconButton aria-label="close" className={classes.closeButton} onClick={closeSettings}>
                            <CloseIcon />
                        </IconButton>
                    </MuiDialogTitle>
                        <form autoComplete="off" type="number" aria-label="Work" noValidate style={{width: "100%", margin: "10px 0px"}}>
                            <MuiDialogContent dividers style={{textAlign: "center"}}>
                                <Typography>Indicate your preferred amount of minutes for each category below:</Typography>
                                <br></br>
                                <TextField
                                    id="work-input"
                                    label="Work"
                                    type="number"
                                    defaultValue={25}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    style={{
                                        display: "inline-block",
                                        marginRight: "30px"
                                    }}
                                    inputProps={{ max: 99, min: 10 }}
                                    onChange={(e) => {}}
                                />
                                <TextField
                                    id="short-input"
                                    label="Short"
                                    type="number"
                                    defaultValue={5}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    style={{
                                        display: "inline-block",
                                        marginRight: "30px"
                                    }}
                                    inputProps={{ max: 99, min: 10 }}
                                    onChange={(e) => {}}
                                />
                                <TextField
                                    id="long-input"
                                    label="Long"
                                    type="number"
                                    defaultValue={15}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    style={{
                                        display: "inline-block",
                                    }}
                                    inputProps={{ max: 99, min: 10 }}
                                    onChange={(e) => {}}
                                />
                                </MuiDialogContent>
                                <MuiDialogActions style={{float: "right"}}>
                                    <Button onClick={closeSettings} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleSubmit} color="primary" autoFocus>
                                        Save
                                    </Button>
                                </MuiDialogActions>
                        </form>
                    </Dialog>

                <Dialog 
                    aria-labelledby="customized-dialog-title" 
                    className={classes.modal}
                    open={donePrompt}
                    onClose={closeDonePrompt}
                >
                    <MuiDialogTitle disableTypography className={classes.root}>
                        <Typography variant="h6">Times up!</Typography>
                        <Button onClick={closeDonePrompt} style={{marginLeft: "10px", marginTop:"10px"}} color="primary">
                            Ok
                        </Button>
                    </MuiDialogTitle>


                </Dialog>
                <br></br>                
            </div>
            <Grid container spacing={2} justify="center">
                <Grid item>
                    <Button 
                        variant="contained"
                        color={selected === "Work" ? "primary" : "default"}
                        onClick={() =>{
                            setSelected("Work");
                            setT(CountData[selected])
                            AlarmAudio.pause();
                        }}
                        style={{
                            height: "40px",
                            fontSize: "12px",
                            fontWeight: "bold",
                        }}
                        >
                        Work
                    </Button>
                </Grid>
                <Grid item>
                    <Button 
                        variant="contained"
                        color={selected === "Short Break" ? "primary" : "default"}
                        onClick={() =>{
                            setSelected("Short Break");
                            setT(CountData[selected])
                            AlarmAudio.pause();
                        }}
                        style={{
                            height: "40px",
                            fontSize: "12px",
                            fontWeight: "bold"
                        }}
                    >
                    Short Break
                    </Button>
                </Grid>
                <Grid item>
                    <Button 
                        variant="contained"
                        color={selected === "Long Break" ? "primary" : "default"}
                        onClick={() =>{
                            setSelected("Long Break");
                            setT(CountData[selected])
                            AlarmAudio.pause();
                        }}
                        style={{
                            height: "40px",
                            fontSize: "12px",
                            fontWeight: "bold"
                        }}
                    >
                        Long Break
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default StudyMode
