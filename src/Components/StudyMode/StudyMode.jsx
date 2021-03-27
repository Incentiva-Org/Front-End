import React, {useState, useEffect} from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { IconButton, Button, ButtonGroup, Typography, TextField } from "@material-ui/core"
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Input from '@material-ui/core/Input';
import SettingsIcon from '@material-ui/icons/Settings';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from "./Styles"
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

import Alarm from '../../Sounds/alarm_gentle.wav'

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
    const [active, setActive] = useState(true) //whether buttons are active

    useEffect(() => {
        if (!paused) {
            if (t!=0) {
                let timer = setTimeout(() => {
                    setT(t => t-1)
                }, 1000)
                return () => clearTimeout(timer)
            }
            else {
                AlarmAudio.play();
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

    const changeTime = (inc) => {
        setActive(false)
        setPaused(true)
        setTimeout(() => {
            setT(inc)
            setTimeout(() => {
                setActive(true)
                setPaused(false)
            }, 500)
        }, 1000)
    }

    const setTimeToForm = () => {
        var min = Math.floor(parseInt(timeForm.substring(0, timeForm.indexOf(":"))))
        var sec = Math.floor(parseInt(timeForm.substring(timeForm.indexOf(":")+1)))
        if (0<=min && 0<=sec && sec<=60) {
            setT(min*60 + sec)
        }
        setTimeout(() => {setPaused(false)}, 1000)
    }

    const handleSubmit = () => {
        closeSettings();
    }
    const [settings, setSettings] = useState(false);
    const closeSettings = () => {
        setSettings(false);
    }

    const openSettings = () => {
        setSettings(true);
    }
    const classes = useStyles();

    const normalise = value => value * 100 / CountData[selected];

    return (
        <div>
            <h1>Study Mode</h1>
            <div style={{marginLeft: "auto", marginRight: "auto", display: "block", textAlign: "center", width: "90%", fontSize: '40px', marginBottom: '20px'}}>
                <Box position="relative" display="inline-flex">
                    <CircularProgress variant="determinate" value={normalise(t)} thickness={1.8} color="primary" style={{width: "375px", height: "375px", border: "black"}}/>
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
                    size='lg' s
                    style={{background: "rgba(128, 90, 213, 0.1)", marginBottom: "10px", marginRight: "20px"}} 
                    color="primary"
                >
                    {paused ? 
                    (<PlayArrowIcon/>)
                    :
                        <PauseIcon/>
                    }
                </IconButton>
                <IconButton onClick={openSettings} size='lg' style={{background: "rgba(128, 90, 213, 0.1)", marginBottom: "10px", display: "inline-block"}} color="primary" >
                    <SettingsIcon />
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
                <br></br>                
            </div>
            <div style={{textAlign: "center", justifyContent: "space-between", width: "80%", marginRight: "auto", marginLeft: "auto"}}>
                <Button 
                    variant="contained"
                    color={selected == "Work" ? "primary" : "default"}
                    onClick={() =>{
                        setSelected("Work");
                        AlarmAudio.pause();
                    }}
                    style={{
                        marginRight: "20px",
                        height: "40px",
                        fontSize: "13px",
                        fontWeight: "bold",
                    }}
                    >
                    Work
                    
                </Button>
                <Button 
                    variant="contained"
                    color={selected == "Short Break" ? "primary" : "default"}
                    onClick={() =>{
                        setSelected("Short Break");
                        AlarmAudio.pause();
                    }}
                    style={{
                        marginRight: "20px",
                        height: "40px",
                        fontSize: "13px",
                        fontWeight: "bold"
                    }}
                >
                Short Break
                </Button>

                <Button 
                    variant="contained"
                    color={selected == "Long Break" ? "primary" : "default"}
                    onClick={() =>{
                        setSelected("Long Break");
                        AlarmAudio.pause();
                    }}
                    style={{
                        height: "40px",
                        fontSize: "13px",
                        fontWeight: "bold"
                    }}
                >
                    Long Break
                </Button>
            </div>
        </div>
    )
}

export default StudyMode
