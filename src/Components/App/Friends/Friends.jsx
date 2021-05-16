import React, {useState} from 'react'
import {Typography, Grid, Card, Fade, Container} from "@material-ui/core"
import useStyles from "./Styles"
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CheckIcon from '@material-ui/icons/Check';
import RemoveIcon from '@material-ui/icons/Remove';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const Friends = () => {

    const friendData = [
        "chris123",
        "nick123",
        "brandon123",
        "gianna123",
        "zane123"
    ]

    const [search, setSearch] = useState("")
    const [result, setResult] = useState()
    const classes = useStyles();
    const [friendList, setFriendList] = useState([])
    const [tab, setTab] = useState(0)
    const handleTabChange = (event, newValue) => {
        setTab(newValue)
    }

    const handleSubmit = () => {
        console.log(search)
        setResult([])
        var searchResult = []
        for(const i in friendData) {
            if(search) {
                if(friendData[i].includes(search)) {
                    searchResult.push(friendData[i])
                }
            }
        }
        console.log(searchResult);
        setResult(searchResult)
    }

    const FriendCard = ({friend}) => {
        const [raised, setRaised] = useState(false)
        const toggleRaised = () => {
            setRaised(!raised)
        }
        const [added, setAdded] = useState(false)
        const toggleAdded = () => {
            setAdded(!added)
        }
        return (
            <Card style={{width:"300px", padding: '10px', borderRadius: '10px', margin: "8px 0px"}} elevation={3}>
                <Grid container spacing={2}>
                    <Grid item>
                        <IconButton color="primary" onClick={toggleAdded}>{added ? <RemoveIcon /> : <PersonAddIcon />}</IconButton>
                    </Grid>
                    <Grid item>
                        <Typography style={{lineHeight: '48px'}}>{friend}</Typography>
                    </Grid>
                </Grid>
            </Card>
        )
    }
    return (
        <div>
            <h1>Friends</h1>
            <div style={{width: "320px", margin: "10px auto"}}>
                <Tabs
                    value={tab}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    disableTouchRipple={true}
                >
                    <Tab label="Add Friends" style={{textTransform: "none"}} />
                    <Tab label="Friend List" style={{textTransform: "none"}} />
                </Tabs>
            </div>
            <br></br>
            <div>
                <Paper className={classes.root}>
                    <InputBase
                        className={classes.input}
                        placeholder="Search a username"
                        inputProps={{ 'aria-label': 'search a username' }}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <IconButton className={classes.iconButton} aria-label="search" onClick={handleSubmit}>
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <br></br>
                {result ? 
                    (
                        <>
                            <Typography style={{fontSize: "20px", fontWeight: "bold"}}>Add Friends ({result.length}):</Typography>
                            {result.map((friend) => (
                                <Fade in>
                                    <FriendCard friend={friend} />
                                </Fade>
                            ))}
                        </>
                    )
                    :
                    <></>
                }
            </div>
        </div>
    )
}

export default Friends
