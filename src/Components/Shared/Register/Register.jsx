import React, { useState } from 'react'
import {  useHistory } from "react-router-dom"

import { createUser } from "../../../API/Auth/AuthProvider"

import { Typography, Paper, TextField, Grid, IconButton, Button, Link, Snackbar, FormControl, OutlinedInput, InputAdornment, CircularProgress } from "@material-ui/core"

import {NavLink} from "react-router-dom"
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/EmailOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {motion} from 'framer-motion'
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Register = () => {

    if(localStorage.getItem('userData')){window.location.pathname = "/tasks"}
    
    const CHARACTER_LIMIT = 15;
    const [visible, setVisible] = useState(false);
    const toggleVisibility = () => {
        setVisible(!visible);
    }
    const [userData, setUserData] = useState({
        username: '', email: '', password: '', confirmPassword: ''
    })
    const [usernameErrors, setUsernameErrors] = useState("")
    const [emailErrors, setEmailErrors] = useState("")
    const [passwordErrors, setPasswordErrors] = useState("")
    const [confirmPasswordErrors, setConfirmPasswordErrors] = useState("")
    const history = useHistory()
    const [alert, setAlert] = useState(false);
    const closeAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
          }
          setAlert(false);
    }
    const [accError, setAccError] = useState(false);
    const [accSeverity, setAccSeverity] = useState("")
    const closeAccAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
          }
          setAccError(false);
    }

    

    const [severity, setSeverity] = useState("");
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        var isValid = true;
        setLoading(true)

        if (typeof userData.email !== "undefined") {
            var email_pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!email_pattern.test(userData.email)) {
              setEmailErrors("*Please enter valid email")
              isValid = false;
            }
            else {
                setEmailErrors("")
            }
        }

        if(typeof userData.password !== "undefined") {
            if(userData.password.length < 8 || !(/\d/).test(userData.password.length)) {
                setPasswordErrors("*Please enter a valid password")
                isValid = false;
            }
            else {
                setPasswordErrors("")
            }
        }
        if(typeof userData.password !== "undefined") {
            if(userData.confirmPassword !== userData.password) {
                setConfirmPasswordErrors("*Must be equal to password")
                isValid = false;
            }
            else {
                setConfirmPasswordErrors("")
            }
        }
        if(isValid) {
            
            
            try {
                await createUser(userData.email, userData.password, userData.username)

                
                setEmailErrors("")
                setPasswordErrors("")
                setConfirmPasswordErrors("")
                
                setSeverity("success")
                setAlert(true)

                setLoading(false)

                localStorage.setItem('tempUsername', userData.username).then(() => {

                    window.location.pathname = "/tasks"
                })
                
            } catch (err) {
                
                setAccError(true)
                setAccSeverity(err.message)
                
            }
            
            
        }
        else {
            setSeverity("error")
            setAlert(true)
        }
        
    }
    return ( 
        <div>
            <Paper elevation={3} style={{width: "350px", height: "500px", position: 'absolute', left: '50%', top: '50%',transform: 'translate(-50%, -50%)', padding: "20px 10px", borderRadius: "5px", justifyContent: "center"}}>
                <Typography variant="h5" style={{fontWeight: "bold", textAlign: "center", marginBottom: "15px"}}>Register</Typography>

                <div style={{width: "280px", marginLeft: "auto", marginRight: "auto"}}>
                    <FormControl fullWidth style={{marginBottom: "10px"}}>
                        <OutlinedInput 
                            id="username"
                            placeholder="Username" 
                            inputProps={{ maxLength: CHARACTER_LIMIT }}  
                            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                            fullWidth
                            endAdornment={
                                <InputAdornment position="end">
                                    <AccountCircle edge="end"/>
                                </InputAdornment>
                            }
                        />
                        <Typography style={{marginLeft: "5px", marginTop: '0px', fontSize: "14px", color: "rgb(165, 165, 165)"}}>{userData.username.length}/{CHARACTER_LIMIT}</Typography>
                        <Typography variant="caption" style={{color: "red"}}>{usernameErrors}</Typography>
                    </FormControl>

                    <FormControl fullWidth style={{marginBottom: "20px"}}>
                        <OutlinedInput 
                            id="email"
                            placeholder="Email" 
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            fullWidth
                            endAdornment={
                                <InputAdornment position="end">
                                    <EmailIcon edge="end"/>
                                </InputAdornment>
                            }
                        />
                        <Typography variant="caption" style={{color: "red"}}>{emailErrors}</Typography>
                    </FormControl>
                    
                    <FormControl fullWidth style={{marginBottom: "10px"}}>
                        <OutlinedInput
                            id="password"
                            placeholder="Password"
                            type={visible ? "" : "password"} 
                            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                            fullWidth
                            inputProps={{ maxLength: CHARACTER_LIMIT }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={toggleVisibility} edge="end">
                                        { visible ? <VisibilityIcon /> : <VisibilityOffIcon /> }
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <Typography style={{marginLeft: "5px", marginTop: '0px', fontSize: "14px", color: "rgb(165, 165, 165)"}}>{userData.password.length}/{CHARACTER_LIMIT}</Typography>
                        <Typography variant="caption" style={{color: "red"}}>{passwordErrors}</Typography>
                    </FormControl>

                    <FormControl fullWidth style={{marginBottom: "10px"}}>
                        <OutlinedInput
                            id="confirm-password"
                            placeholder="Confirm Password"
                            type={visible ? "" : "password"} 
                            onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
                            fullWidth
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={toggleVisibility} edge="end">
                                        { visible ? <VisibilityIcon /> : <VisibilityOffIcon /> }
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <Typography variant="caption" style={{color: "red"}}>{confirmPasswordErrors}</Typography>
                    </FormControl>

                </div>
                <div style={{width: "200px", marginRight: "auto", marginLeft: "auto", marginTop: "25px", marginBottom: "10px"}}>
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
                        {loading ? <CircularProgress style={{width: "20px", height: "20px", color: "white"}}/> : "Register"}
                    </Button>
                </div>
                <div style={{textAlign: "center"}}>
                    <Typography variant="caption" style={{textAlign: "center"}}>Already have an account? <Link to="/login" component={NavLink} variant="caption" style={{textAlign: "center", textDecoration: "none"}}>Login</Link></Typography>
                </div>
            </Paper>
            <Snackbar open={alert} autoHideDuration={2000} onClose={closeAlert}>
                <Alert onClose={closeAlert} severity={severity}>
                    {severity === "success" ? ("Account created successfully!") : "Error creating account!"}
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

export default Register;