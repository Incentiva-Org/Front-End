
import React, {useEffect, useState} from 'react'

import { fetchTasks } from '../../API/index'

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import {Button} from '@material-ui/core'
import MoodIcon from '@material-ui/icons/Mood';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import TaskGraph from "./Graphs/TaskGraph"
import HappinessGraph from "./Graphs/HappinessGraph"
import {format} from 'date-fns';
import EqualizerIcon from '@material-ui/icons/Equalizer';

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

  const [tagCounts, setTagCounts] = useState({
      School: 0, Work: 0, Life: 0, Exercise: 0
  })
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  const classes = useStyles();
  const [happiness, setHappiness] = useState(5);

  const handleSliderChange = (e, newValue) => {
    setHappiness(newValue);
  }
const getTagCounts = () => {
    var school = 0
    var work = 0
    var life = 0
    var exercise = 0
    for(const i in tasks) {
        if(tasks[i].day === format(new Date(), "MM/dd/yyyy")) {
            if(tasks[i].tag === "School") {
                school++;
            }
            else if(tasks[i].tag === "Work") {
                work++;
            }
            else if(tasks[i].tag === "Life") {
                life++;
            }
            else if(tasks[i].tag === "Exercise") {
                exercise++;
            }
        }
    }

  const formData = {
      "days": [
          {
            Date: format(new Date(), "MM/dd/yyyy"),
            School: school,
            Work: work,
            Life: life,
            Exercise: exercise,
            Happiness: happiness
        },
    ]
  }
  return formData;
}
const handlePredictClick = () => {
  const formData = getTagCounts().days;
  console.log(formData)
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
        <h1>Tasks</h1>
        <Button variant="contained" color="primary" style={{marginBottom: "30px"}} onClick={handlePredictClick} endIcon={<EqualizerIcon/>}>
            Generate Insights (0)
        </Button>
        <br></br>
        <Typography gutterBottom style={{textAlign: "center"}}>
            Indicate your happiness level below for today:
        </Typography>
        <br></br>
        <div style={{margin: "0px auto", textAlign: "center"}}>
          <div className={classes.root} style={{display: "inline-block"}}>
            <Slider
              defaultValue={5}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={10}
              style={{display: "inline-block", width: "75%"}}
              onChange={handleSliderChange}
            />
            <div style={{width: "100%", justifyContent: "space-between"}}>
              <SentimentVeryDissatisfiedIcon style={{width: "25%"}}/>
              <SentimentDissatisfiedIcon style={{width: "25%"}}/>
              <SentimentSatisfiedIcon style={{width: "25%"}}/>
              <MoodIcon style={{width: "25%"}}/>
            </div>
          </div>
        </div>
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        {result ? null :
          <div style={{width: "100%", marginRight: "auto", marginLeft: "auto"}}>
            <Typography variant="h6" style={{fontWeight: "bold", textAlign: "center"}}>{result}</Typography>
            <h2 style={{fontWeight: "bold", fontSize:"20px"}}>Analytics:</h2>
            <div style={{width: "48%", display: "inline-block", marginRight: "20px"}}>
              <TaskGraph data={getTagCounts().days}/>
            </div>
            <div style={{width: "48%", display: "inline-block", marginLeft: "20px"}}>
              <HappinessGraph data={getTagCounts().days}/>
            </div>
          </div>
        }
    </div>

  );
}

export default Insights;

