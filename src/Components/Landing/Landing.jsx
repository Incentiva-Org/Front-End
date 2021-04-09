import React, { useState } from 'react'

import { 
    Typography,
    Card,
    Grid,
    CardActions,
    CardContent,
    Button,
    Grow,
    Container,
    Paper,
    Collapse,
    Fade,
    Slide,
    Zoom,
    IconButton,
    Fab
} from "@material-ui/core"

import MuiLink from "@material-ui/core/Link"

import useStyles from "./Styles"

import Wave from 'react-wavify'
import MainImg from "../../Assets/landingimage.svg"

import Check from '@material-ui/icons/Check'
import AccessTime from '@material-ui/icons/AccessTime'
import Notes from '@material-ui/icons/Notes'
import Star from '@material-ui/icons/Star'

const Landing = () => {
    const classes = useStyles();
    const [opened, setOpened] = useState(false);

    const cards = [
        {
            title: "Tasks",
            image: <Check />,
            description: "Create a task for any day, where you can assign a tag, predict how long it's going to take, and check it off when you're complete."
        },
        {
            title: "Study",
            image: <AccessTime />,
            description: "Utilizing the pomodoro method, our minimalistic, distraction-free layout is guaranteed to maximize productivity."
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
                <Typography variant="h3" style={{textAlign: "center", fontWeight: "bold", marginTop: "20px", letterSpacing: "0.07em"}}>Incentiva</Typography>
            </Fade>
            <div style={{justifyContent: "space-between", display: "flex"}}>
                <Fade in mountOnEnter unmountOnExit style={{transitionDelay: "100ms", transitionDuration: "1000ms"}}>
                    <div style={{width: "60%", padding: "20px 0px", marginLeft: "20px", marginTop:"auto", marginBottom:"auto"}}>
                        <Typography variant="h5" style={{fontSize: "20px", lineHeight: "1.5"}}>
                            Introducing Incentiva: a platform that gives its users all the tools and motivation they need to succeed in their day-to-day lives.
                            With tools for simple task management, distraction-free study sessions, sophisticated note-taking, and personalized insights, Incentiva aims to help anyone looking to improve their workflow.
                        </Typography>
                        <div style={{marginTop: "20px", textAlign: "right"}}>
                            <MuiLink href="/login" underline="none">
                                <Button style={{marginRight: "20px"}} color="primary">Login</Button>
                            </MuiLink>
                            <MuiLink href="/register" underline="none">
                                <Button color="primary" variant="contained">Register</Button>
                            </MuiLink>
                        </div>   
                    </div>
                </Fade>
                <Slide in direction="left" mountOnEnter unmountOnExit>
                    <img 
                        src={MainImg}
                        width="30%"
                    />
                </Slide>
            </div>
            <Wave fill='#805AD5'
                paused={false}
                options={{
                    height: 30,
                    amplitude: 25,
                    speed: 0.2,
                    points: 3
                }}
            />
            <div style={{background: "#805AD5", position: "relative", bottom: "5px"}}>
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
                <div style={{width: "253px", height:"300px", marginRight:"auto", marginLeft:"auto", textAlign: "center"}}>
                    <Typography style={{bottom: "0px", position: "absolute", textAlign: "center"}}>Incentiva 2021 All Rights Reserved</Typography>
                </div>
            </div>
        </div>
    )
}
export default Landing;