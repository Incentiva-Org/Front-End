
import React, {useEffect, useState} from 'react'

import { fetchTasks } from '../../../API/index'

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import {Button, Grid, Paper} from '@material-ui/core'
import MoodIcon from '@material-ui/icons/Mood';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import TaskGraph from "./Graphs/TaskGraph"
import HappinessGraph from "./Graphs/HappinessGraph"
import TaskPie from "./Graphs/TaskPie"
import {format} from 'date-fns';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TrendingDown from '@material-ui/icons/TrendingDown';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 400,
  },
  input: {
    width: 42,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function valuetext(value) {
  return `${value}`;
}
const NiceSlider = withStyles({
  root: {
    color: 'primary',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const Insights = () => {

  const [tasks, setTasks] = useState()

  const reloadTasks = () => {
    fetchTasks(JSON.parse(localStorage.getItem('userData')).username).then((response) => {
        const returnResponse = response.data
        console.log('reloaded')
        setTasks(returnResponse['tasksData'])
        setLoading(false)
    })
  }
  useEffect(() => { 
      reloadTasks()
  }, []);
    localStorage.setItem("userStats", JSON.stringify([]))
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  const classes = useStyles();
  const [happiness, setHappiness] = useState(5);

  const handleSliderChange = (e, newValue) => {
    setHappiness(newValue);
  }

  const getTagCounts = () => {
    const currentDate = format(new Date(), "MM/dd/yyyy")
    var isUnique = true;
    const currData = JSON.parse(localStorage.getItem("userStats"))
    for(const i in currData) {
      if(currData[i].Date === currentDate) {
        console.log("Hi")
        isUnique = false;
      }
    }
    var formData = {Date: currentDate, School: 0, Work: 0, Life: 0, Exercise: 0, Happiness: happiness}
    if(isUnique) {
      for(const i in tasks) {
        if(tasks[i].day === currentDate) {
          if(tasks[i].completed === true) {
            if(tasks[i].tag === "School") {
              formData.School++;
            }
            else if(tasks[i].tag === "Work") {
              formData.Work++;
            }
            else if(tasks[i].tag === "Life") {
              formData.Life++;
            }
            else if(tasks[i].tag === "Exercise") {
              formData.Exercise++;
            }
          }
        }
      }
      currData.push(formData)
      localStorage.setItem("userStats", JSON.stringify(currData))
    }
  }
  getTagCounts();
  const handlePredictClick = () => {
    getTagCounts();
    const formData = JSON.parse(localStorage.getItem("userStats"))
    console.log(formData)
    setLoading(true)
    fetch('http://127.0.0.1:5000/', 
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(response => {
        setTimeout(() => setLoading(false), 200)
        setResult(response.result)
        console.log(response.result)
        console.log(JSON.parse(response.result))
      });
  }
  return (
    <div className={classes.mainContainer}>
        <h1>Insights</h1>
        <Button variant="contained" color="primary" style={{marginBottom: "30px", textTransform: "none", fontWeight: "bold"}} onClick={handlePredictClick} endIcon={<EqualizerIcon/>}>
            Generate Insights ({JSON.parse(localStorage.getItem("userStats")).length})
        </Button>
        <Typography gutterBottom style={{textAlign: "center"}}>
            Indicate your happiness level below for today:
        </Typography>        
        <div style={{margin: "0px auto", textAlign: "center", width: "320px"}}>
          <NiceSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={5} min={0} step={1} max={10} onChange={handleSliderChange} style={{width: "320px"}}/>
          <div style={{width: "320px", justifyContent: "space-between", justify: "center", display: "flex"}}>
            <div style={{width: "25%", textAlign: "left"}}>
              <SentimentVeryDissatisfiedIcon />
            </div>
            <div style={{width: "25%"}}>
              <SentimentDissatisfiedIcon />
            </div>
            <div style={{width: "25%"}}>
              <SentimentSatisfiedIcon />
            </div>
            <div style={{width: "25%", textAlign: "right"}}>
              <MoodIcon />
            </div>
          </div>
        </div>
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        {!result ? null :
          <>
            <h2 style={{fontWeight: "bold", fontSize:"20px", textAlign: "center"}}>Analytics</h2>
            <Grid container justify="center" spacing={6}>
              <Grid item>
                <TaskGraph data={JSON.parse(localStorage.getItem("userStats"))}/>
              </Grid>
              <Grid item>
                <HappinessGraph data={JSON.parse(localStorage.getItem("userStats"))}/>
              </Grid>
            </Grid>
            <Grid container spacing={10} justify="center" style={{marginTop: "10px"}}>
              <Grid item>
                <TaskPie data={JSON.parse(localStorage.getItem("userStats"))} />
              </Grid>
              <Grid item>
                <Grid container spacing={3}> 
                  <Grid item>
                    <Paper style={{width: "140px", height: "145px", textAlign: "center", padding: "10px", borderRadius: "5px" }} elevation={4}>
                      <Typography variant="h3" style={{fontWeight: "bold", fontSize: "18px", marginBottom: "5px"}}>{Object.keys(JSON.parse(result))[0]}</Typography>
                      <TrendingUpIcon style={{color: "rgb(42, 219, 94)", margin: "10px 0px"}} fontSize="large"/>
                      <br></br>
                      <Typography style={{color: "rgb(42, 219, 94)", border: "1px solid rgb(42, 219, 94)", width: "50px", marginLeft: "auto", marginRight: "auto"}}>+{Object.values(JSON.parse(result))[0]}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item>
                    <Paper style={{width: "140px", height: "145px", textAlign: "center", padding: "10px", borderRadius: "5px"}} elevation={4}>
                      <Typography variant="h6" style={{fontWeight: "bold", fontSize: "18px", marginBottom: "5px"}}>{Object.keys(JSON.parse(result))[1]}</Typography>
                      <TrendingDownIcon style={{color: "red", margin: "7px 0px"}} fontSize="large"/>
                      <br></br>
                      <Typography style={{color: "red", border: "1px solid red", width: "50px", marginLeft: "auto", marginRight: "auto"}}>{Object.values(JSON.parse(result))[1]}</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </>
        }
    </div>

  );
}

export default Insights;

