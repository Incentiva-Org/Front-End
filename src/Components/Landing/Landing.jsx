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
    Link
} from "@material-ui/core"

import MuiLink from "@material-ui/core/Link"

import useStyles from "./Styles"

import Wave from 'react-wavify'
import MainImg from "../../Assets/landingimage.svg"

import Check from '@material-ui/icons/Check'
import AccessTime from '@material-ui/icons/AccessTime'
import Notes from '@material-ui/icons/Notes'
import Star from '@material-ui/icons/Star'
import {motion, useMotionValue, useTransform} from "framer-motion"

const imageVariants = {
    loaded: {pathLength: 1},
    notLoaded: {pathLength: 0},
}

const Landing = () => {
    const classes = useStyles();
    const [loaded, setLoaded] = useState(false);
    const pathLength = useMotionValue(0);
    const opacity = useTransform(pathLength, [0, 1], [0, 1]);

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
        }
    ];

    setTimeout(() => {setLoaded(true)}, 500)

    const ContentCard = ({props}) => {
        const [opened, setOpened] = useState(false);
        return (
            <Card elevation={6} onMouseOver={(e) => setOpened(true)} onMouseLeave={(e) => setOpened(false)} className={classes.card}>
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
            <Fade in style={{transitionDuration: "1000ms"}}>
                <Typography variant="h3" style={{textAlign: "center", fontWeight: "bold", marginTop: "30px", letterSpacing: "0.07em"}}>Incentiva</Typography>
            </Fade>
            <div style={{marginLeft:"auto", marginRight:"auto", width: "240px"}}>
                <motion.svg
                    initial="notLoaded"
                    animate={loaded ? "loaded" : "notLoaded"}
                    width="240"
                    height="100"
                    style={{paddingLeft: "30px"}}
                >
                    <motion.path
                        d="M 114.367188 51.34375 L 168.539062 105.042969 L 176.53125 105.042969 L 114.367188 42.617188 L 95.449219 61.769531 L 70.765625 37.046875 L 0.457031 105.042969 L 8.792969 105.042969 L 70.765625 45.394531 L 91.28125 65.945312 L 81.199219 76.039062 L 69.945312 64.769531 L 28.1875 105.042969 L 36.441406 105.042969 L 69.945312 72.84375 L 93.066406 96 L 93.078125 96.015625 L 94.984375 97.921875 L 98.320312 94.578125 L 102.722656 90.171875 L 119.734375 105.042969 L 127.984375 105.042969 L 127.800781 105.042969 L 106.285156 85.664062 L 113.894531 78.046875 L 143.109375 105.042969 L 151.179688 105.042969 L 113.894531 69.96875 L 94.515625 89.378906 L 85.554688 80.398438 Z M 114.367188 51.34375 "
                        fill="rgba(128, 90, 213, 0.8)"
                        strokeWidth="1"
                        stroke="#805AD5"
                        variants={imageVariants}
                        style={{ pathLength, opacity }}
                        custom={loaded}
                        transition={{duration: 2}}
                    />
                    <motion.path
                        d="M 49.253906 105.042969 L 57.851562 105.042969 L 69.3125 95.417969 L 80.773438 105.042969 L 89.371094 105.042969 L 69.3125 86.804688 Z M 49.253906 105.042969"
                        fill="rgba(128, 90, 213, 0.8)"
                        strokeWidth="1"
                        stroke="#805AD5"
                        variants={imageVariants}
                        style={{ pathLength, opacity }}
                        custom={loaded}
                        transition={{duration: 2}}
                    />
                </motion.svg>
            </div>
            <Grid container flex="row" justify="space-between" alignItems="center" spacing={2} style={{width: "92%", marginTop: "10px", marginLeft: "auto", marginRight: "auto"}}>
                <Grid item xs={12} sm={10} md={12} lg={8} xl={8}>
                    <Fade in mountOnEnter unmountOnExit style={{transitionDelay: "100ms", transitionDuration: "1000ms"}}>
                        <div>
                            <Typography variant="h5" style={{fontSize: "20px", lineHeight: "1.5"}}>
                                Introducing Incentiva: a platform that gives its users all the tools and motivation they need to succeed in their day-to-day lives.
                                With tools for simple task management, distraction-free study sessions, sophisticated note-taking, and personalized insights, Incentiva aims to help anyone looking to improve their workflow.
                            </Typography>
                            <div style={{marginTop: "20px", textAlign: "right"}}>
                                <MuiLink href="/login" underline="none">
                                    <Button style={{marginRight: "20px", fontSize: '18px', textTransform: "none", lineHeight: "40px"}} color="primary">Login</Button>
                                </MuiLink>
                                <MuiLink href="/register"  underline="none">
                                    <Button color="primary" style={{fontSize: '18px', textTransform: "none", padding: "0px 10px", lineHeight: "40px"}} variant="contained">Register</Button>
                                </MuiLink>
                            </div>   
                        </div>
                    </Fade>
                </Grid>
                <Grid item style={{width: "400px", marginLeft: "auto", marginRight: "auto"}}>
                    <Slide in direction="left" mountOnEnter unmountOnExit>
                        <img 
                            src={MainImg}
                            width="400px"
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
                <Grid container flex="row" spacing={5} justify="center" alignItems="center" style={{padding: "10px 0px"}}>
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
        </div>
    )
}
export default Landing;