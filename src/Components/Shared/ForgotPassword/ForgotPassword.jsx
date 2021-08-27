import React, { useState } from 'react'

import { forgotPassword } from "../../../API/Auth/AuthProvider"

import { Typography, Paper, TextField, Grid, IconButton, Button, Link, Snackbar, FormControl, OutlinedInput, InputAdornment, CircularProgress } from "@material-ui/core"

import {NavLink} from "react-router-dom"
import AccountCircle from '@material-ui/icons/AccountCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {motion} from 'framer-motion'
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ForgotPassword = () => {

    if(localStorage.getItem('userData')){window.location.pathname = "/tasks"}


    const [userData, setUserData] = useState({
        email: ''
    })

    const [alert, setAlert] = useState(false);
    const closeAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
          }
          setAlert(false);
    }
    const [severity, setSeverity] = useState("");
    const [accError, setAccError] = useState(false);
    const [accSeverity, setAccSeverity] = useState("")
    const [loading, setLoading] = useState(false)


    const closeAccAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
          }
          setAccError(false);
    }
    const handleSubmit = async () => {
        setLoading(true)
        try {
            
            await forgotPassword(userData.email)

            setSeverity("success")
            setAlert(true)
            window.location.pathname = "/tasks"
            console.log('Valid')
            
        } catch (err) {
            
            if(err.code == "auth/user-not-found"){
                setAccSeverity("No user with this email exists. Please try again.")

            }else {
                setAccSeverity(err.message)

            }
            setAccError("error")
        }
        setLoading(false)
    }
    return ( 
        <div>
            <Paper elevation={3} style={{width: "350px", height: "280px", position: 'absolute', left: '50%', top: '50%',transform: 'translate(-50%, -50%)', padding: "20px 10px", borderRadius: "5px"}}>
                <Typography variant="h5" style={{fontWeight: "bold", textAlign: "center", marginBottom: "30px"}}>Forgot Password</Typography>
                <div style={{width: "280px", marginLeft: "auto", marginRight: "auto"}}>
                    <FormControl fullWidth>
                        <OutlinedInput 
                            id="username"
                            placeholder="Username/Email" 
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            style={{marginBottom: "10px", textAlign: "center", marginBottom: "15px"}}
                            fullWidth
                            endAdornment={
                                <InputAdornment position="end">
                                    <AccountCircle edge="end"/>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>
                <div style={{width: "200px", marginRight: "auto", marginLeft: "auto", marginTop: "15px", marginBottom: "10px"}}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        type="submit"
                        disableElevation
                        component={motion.div}
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 }
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {handleSubmit()}}
                        style={{borderRadius: "5px", width:"100%", textTransform: "none"}}
                    >
                        {loading ? <CircularProgress style={{width: "20px", height: "20px", color: "white"}}/> : "Send Email"}
                    </Button>
                </div>
                
                <div style={{textAlign: "center"}}>
                    <Typography variant="caption" style={{textAlign: "center"}}>Have an Account? <Link to="/login" component={NavLink} variant="caption" style={{textAlign: "center", textDecoration: "none"}}>Login</Link></Typography>
                </div>
                <br></br>
            </Paper>
            <Snackbar open={alert} autoHideDuration={2000} onClose={closeAlert}>
                <Alert onClose={closeAlert} severity={"success"}>
                    Recovery Email Sent! 
                </Alert>
            </Snackbar>
            <Snackbar open={accError} autoHideDuration={2000} onClose={closeAccAlert}>
                <Alert onClose={closeAccAlert} severity="error">
                    {accSeverity}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default ForgotPassword;