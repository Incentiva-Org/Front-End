import React, {useState, useEffect} from 'react'
import { getInfo, removePending, acceptPending, sendRequest } from '../../../API/index';
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
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Friends = () => {

    const uid = JSON.parse(localStorage.getItem('userData')).uid
    useEffect(() => {
        
        getInfo(uid).then((res) => {
            setFriends(res.data.friends)
            setPending(res.data.pending)
            
            
            setLoading(false)
        })
    }, [])

    const [loading, setLoading] = useState(true)
    const [friends, setFriends] = useState()
    const [pending, setPending] = useState()

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }


    const [search, setSearch] = useState("")
    const [result, setResult] = useState()
    const classes = useStyles();

    const [open, setOpen] = useState(false)
    const [severity, setSeverity] = useState("success")
    const [message, setMessage] = useState()

    const [requests, setRequests] = useState()
    const [friendsData, setFriendsData] = useState()

    const handleSubmit = () => {
        
        sendRequest(uid, search).then((res) => {
            if(res.data.success){
                setMessage("Friend Request sent!")
                setOpen(true)
            } else{
                setSeverity("error")
                setMessage("User not found!")
                setOpen(true)
            }
        })
        
        setSearch("")
        setSeverity("success")
    }

    const removePendingFunc = (friend) => {
        setLoading(true)
        removePending(uid, friend).then((res) => {

            res.data.success && setMessage("Friend request removed!")
            setOpen(true)

            getInfo(uid).then((res) => {
                setFriends(res.data.friends)
                setPending(res.data.pending)
                
                
                setLoading(false)
            })
        })
    }

    const addPendingFunc = (friend) => {
        setLoading(true)
        acceptPending(uid, friend).then((res) => {

            res.data.success && setMessage("Friend request accepted!")
            setOpen(true)

            getInfo(uid).then((res) => {
                setFriends(res.data.friends)
                setPending(res.data.pending)
                
                
                setLoading(false)
            })
        })
    }


    const FriendCard = ({friend}) => {

        return (
            <Card style={{width:"300px", padding: '10px', borderRadius: '10px', margin: "8px 0px"}} elevation={3}>
                <Grid container spacing={2}>
                    <Grid item>
                        <RemoveIcon style={{marginTop: "40%", marginLeft:"5px", cursor:"pointer"}} onClick={() => {removePendingFunc(friend)}}  color="primary" />
                    </Grid>
                    <Grid item>
                        <CheckIcon style={{marginTop: "40%", cursor:"pointer"}} onClick={() => {addPendingFunc(friend)}}  color="primary" />
                    </Grid>
                    <Grid item>
                        <Typography style={{lineHeight: '48px'}}>{friend}</Typography>
                    </Grid>
                </Grid>
            </Card>
        )
    }


    const FriendInfoCard = ({friend}) => {

        return (
            <Card style={{width:"300px", padding: '10px', borderRadius: '10px', margin: "8px 0px"}} elevation={3}>

            </Card>
        )
    }

    return (
        loading ? 
            <h1></h1>
        
        :(
            
            <div>
                <h1>Friends</h1>
                <br></br>
                <div style={{width: "320px", margin: "10px auto"}}>
                    Friends: {friends}
                </div>
                
                <div>
                    <Paper className={classes.root}>
                        <InputBase
                            className={classes.input}
                            placeholder="Search a username"
                            inputProps={{ 'aria-label': 'search a username' }}
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                        <IconButton className={classes.iconButton} aria-label="search" type="submit" onClick={handleSubmit}>
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



                    <br></br>
                    { pending.length != 0 && <Typography style={{fontSize: "20px", fontWeight: "bold"}}>Pending Friend Requests:</Typography> }
                    
                    {
                        pending.map((pendingName) => <FriendCard friend={pendingName} key={pendingName}/> )

                    }

 
                    <Snackbar open={open} autoHideDuration={6000} onClose={() => {setOpen(false)}}>
                        <Alert severity={severity}>
                            {message}
                        </Alert>

                    </Snackbar>
                    
                </div>
                

                
                
            </div>

        )
    )
}

export default Friends
