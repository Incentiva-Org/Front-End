import React, { useState } from 'react'

import { 
    Typography,
    Card,
    Grid,
    CardContent,
    Button,
    Collapse,
    Fade,
    Slide,
    Zoom,
    Fab,
    Link,
    Toolbar,
    Paper
} from "@material-ui/core"

import MuiLink from "@material-ui/core/Link"
import {NavLink} from 'react-router-dom'

import useStyles from "./Styles"

import Wave from 'react-wavify'
import MainImg from "../../../Assets/landingimage.svg"
import Logo from "../../../Assets/Incentiva-Mini.png"

import Check from '@material-ui/icons/Check'
import AccessTime from '@material-ui/icons/AccessTime'
import Notes from '@material-ui/icons/Notes'
import Star from '@material-ui/icons/Star'
import {motion, useMotionValue, useTransform} from "framer-motion"
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import GroupIcon from '@material-ui/icons/Group';

const imageVariants = {
    hover: {
      scale: 1.05,
  
      transition: {
        duration: 0.5,
        yoyo: Infinity
      }
    }
  };

const Landing = () => {
    const classes = useStyles();
    const [loaded, setLoaded] = useState(false);
    const pathLength = useMotionValue(0);
    const opacity = useTransform(pathLength, [0, 1], [0, 1]);
    
    const [open, setOpen] = useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }
    

    
    const cards = [
        {
            title: "Tasks",
            image: <Check />,
            description: "Create a task for any day, where you can assign a tag, predict how long it's going to take, and check it off when you're complete."
        },
        {
            title: "Study",
            image: <AccessTime />,
            description: <Typography>Utilizing the <Link underline="none" href='https://en.wikipedia.org/wiki/Pomodoro_Technique' target="_blank">Pomodoro Technique</Link>, our minimalistic, distraction-free layout is guaranteed to maximize productivity.</Typography>
        },
        {
            title: "Notes",
            image: <Notes />,
            description: "Jot down any quick notes, and upload images whose text you want transcribed (ie. handwriting). Images are sent through Google Cloud's Vision AI and outputs any text it picks up, within an impressively short time."
        },
        {
            title: "Insights",
            image: <Star />,
            description: "You thought the AI stuff was done? Here with Insights, data from both your happiness scores and tasks are gathered, analyzed by our backend AI model, and outputs which type of task contributes the most to your happiness."
        },
        /*
        {
            title: "Friends",
            image: <GroupIcon />,
            description: "Under construction :)"
        }
        */
    ];

    setTimeout(() => {setLoaded(true)}, 500)

    const ContentCard = ({props}) => {
        const [opened, setOpened] = useState(false);
        return (
            <Card elevation={6} onMouseOver={(e) => setOpened(true)} onMouseLeave={(e) => setOpened(false)} className={classes.card} style={{margin: "0px auto"}}>
                <CardContent>
                    <Fab size="lg" style={{marginBottom:"10px"}} color="primary">
                        {props.image}
                    </Fab>
                    <Typography variant="h5" style={{fontWeight: "bold"}}>
                        {props.title}
                    </Typography>
                </CardContent>
                <Collapse in={opened} style={{margin: "5px"}}>
                    <Typography >{props.description}</Typography>
                </Collapse>
            </Card>
        )
    }

    return (
        <div className={classes.mainContainer}>
            <div style={{alignItems: "center"}}>
                <br></br>
                <Fade in style={{transitionDuration: "1000ms"}}>
                    <Typography variant="h3" style={{fontWeight: "bold", marginTop: "30px", letterSpacing: "0.07em", textAlign: "center"}}>Incentiva</Typography>
                </Fade>
                <div style={{width: "240px", height: "100px", margin: "0px auto"}}>
                    <motion.img src={Logo} style={{width: "100%"}} initial={{y: -50, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 1}} variants={imageVariants} whileHover="hover"/>
                </div>
            </div>
            <Grid container flex="row" justify="space-between" alignItems="center" spacing={2} style={{width: "90%", margin: "10px auto"}}>
                <Grid item sm={8} style={{margin: "10px auto"}}>
                    <Fade in mountOnEnter unmountOnExit style={{transitionDelay: "100ms", transitionDuration: "1000ms"}}>
                        <div>
                            <Typography variant="h5" style={{fontSize: "20px", lineHeight: "1.5"}}>
                                Introducing Incentiva: a platform that gives its users all the tools and motivation they need to succeed in their day-to-day lives.
                                With tools for simple task management, distraction-free study sessions, sophisticated note-taking, and personalized insights, Incentiva aims to help anyone looking to improve their workflow.
                            </Typography>
                            <div style={{textAlign: "right", margin: "10px 0px"}}>
                                <MuiLink to="/login" component={NavLink} underline="none">
                                    <Button style={{marginRight: "10px", fontSize: '16px', textTransform: "none", lineHeight: "40px", padding: "0px 10px",}} color="primary">Login</Button>
                                </MuiLink>
                                <MuiLink to="/register" component={NavLink} underline="none">
                                    <Button color="primary" disableElevation style={{fontSize: '16px', textTransform: "none", padding: "0px 10px", lineHeight: "40px"}} variant="contained">Register</Button>
                                </MuiLink>
                            </div>   
                        </div>
                    </Fade>
                </Grid>
                <Grid item style={{width: "320px", marginLeft: "auto", marginRight: "auto"}}>
                    <Slide in direction="left" mountOnEnter unmountOnExit>
                        <img 
                            src={MainImg}
                            width="320px"
                            alt="MainImg"
                        />
                    </Slide>
                </Grid>
            </Grid>
            <Wave fill='#805AD5'
                paused={false}
                options={{
                    height: 30,
                    amplitude: 25,
                    speed: 0.2,
                    points: 3
                }}
            />
            <div style={{background: "#805AD5", position: "relative", bottom: "8px"}}>
                <Fade in style={{transitionDelay: "100ms", transitionDuration: "1000ms"}}>
                    <Typography variant="h4" style={{textAlign: "center", fontWeight: "bold", marginBottom: "20px"}}>Features</Typography>
                </Fade>
                <Grid container spacing={4} style={{justifyContent: "center"}}>
                    {cards.map((card, index) => (
                        <Zoom in style={{transitionDelay: `${index * 250}ms`, transitionDuration: "500ms"}}>
                            <Grid item key={card.title}>
                                {<ContentCard props={card}/>}
                            </Grid>
                        </Zoom>
                    ))}
                </Grid>
                <div style={{width: "253px", height:"200px", marginRight:"auto", marginLeft:"auto", textAlign: "center"}}>
                    <Typography style={{bottom: "0px", position: "absolute", textAlign: "center"}}>Incentiva 2021 All Rights Reserved</Typography>
                </div>
            </div>
            <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message=""
                style={{width: "300px", color: "white"}}
            >
                <Paper style={{padding: "20px"}}>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                    <Typography style={{marginTop: "10px", fontSize: "14px", opacity: "0.7"}}>Incentiva is currently still being worked on and therefore some features aren't fully functional yet. We appreciate your patience and are happy to take any feedback you have!</Typography>
                </Paper>
            </Snackbar>
        </div>
    )
}
export default Landing;