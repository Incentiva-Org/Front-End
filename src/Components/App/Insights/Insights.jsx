
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
import CheckIcon from "@material-ui/icons/Check"
import Chatbot from "./Chatbot/Chatbot"

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

localStorage.setItem("happinessScores", JSON.stringify([{Day: "06/03/2021", Happiness: 8}, {Day: "06/13/2021", Happiness: 6}, {Day: "06/21/2021", Happiness: 7}, {Day: "06/29/2021", Happiness: 5}, {Day: "06/30/2021", Happiness: 8}, {Day: "07/03/2021", Happiness: 9}, {Day: "07/04/2021", Happiness: 7}, {Day: "07/05/2021", Happiness: 9}, {Day: "07/10/2021", Happiness: 6}]))

const Insights = () => {

  const [tasks, setTasks] = useState()

  const reloadTasks = () => {
    fetchTasks(JSON.parse(localStorage.getItem('userData')).uid).then((response) => {
        const returnResponse = response.data
        console.log('reloaded')
        setTasks(returnResponse['tasksData'])
    })

}
  useEffect(() => { 
      reloadTasks()
  }, []);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  const classes = useStyles();
  const [happiness, setHappiness] = useState(5);

  const handleSliderChange = (e, newValue) => {
    setHappiness(newValue);
  }
  
  const getTagCounts = () => {
    var temp = tasks;
    var sorted = temp.reduce(function (r, a) {
      r[a.day] = r[a.day] || [];
      r[a.day].push(a);
      return r;
    }, Object.create(null));

    var insightsData = []
    var cnt = 0;
    for(var i in sorted) {
      var dataPoint = {Day: "", Work: 0, School: 0, Life: 0, Exercise: 0, Happiness: JSON.parse(localStorage.getItem("happinessScores"))[cnt].Happiness}
      cnt++;
      for(var j in sorted[i]) {
        dataPoint.Day = sorted[i][j].day
        const tag = sorted[i][j].tag
        if(sorted[i][j].completed === true) {
          dataPoint[tag]++
        }
      }
      insightsData.push(dataPoint)
    }
    return insightsData
  }

  const confirmHappiness = () => {
    var currData = JSON.parse(localStorage.getItem("happinessScores"))
    const currHappiness = happiness;
    var newDay = true;
    for(var i in currData) {
      if(currData[i].Day === localStorage.getItem('selected-date')){
        currData[i].Happiness = currHappiness
        localStorage.setItem('happinessScores', JSON.stringify(currData))
        newDay = false;
        break;
      }
    }
    if(newDay === true) {
      currData.push({Day: localStorage.getItem('selected-date'), Happiness: currHappiness})
      localStorage.setItem("happinessScores", JSON.stringify(currData))
    }
  }

  const handlePredictClick = () => {
    const formData = getTagCounts();
    setLoading(true)
    fetch('https://incentiva-backend.herokuapp.com/', 
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
      });
  }
  return (
    <div className={classes.mainContainer}>
        <h1>Insights</h1>
        <Button variant="contained" color="primary" style={{marginBottom: "30px", textTransform: "none", fontWeight: "bold"}} onClick={handlePredictClick} endIcon={<EqualizerIcon/>}>
            Generate Insights
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
          <br></br>
          <Button color="primary" variant="contained" style={{textTransform: "none", fontWeight: "bold"}} endIcon={<CheckIcon/>} onClick={confirmHappiness}>Confirm</Button>
        </div>
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        {!result ? null :
          <>
            <h2 style={{fontWeight: "bold", fontSize:"20px", textAlign: "center"}}>Analytics</h2>
            <Grid container justify="center" spacing={6}>
              <Grid item>
                <TaskGraph data={getTagCounts()}/>
              </Grid>
              <Grid item>
                <HappinessGraph data={getTagCounts()}/>
              </Grid>
            </Grid>
            <Grid container spacing={10} justify="center" style={{marginTop: "10px"}}>
              <Grid item>
                <TaskPie data={getTagCounts()} />
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
        <Chatbot  />
    </div>

  );
}

export default Insights;

