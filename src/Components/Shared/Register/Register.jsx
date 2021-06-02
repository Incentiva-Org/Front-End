import React, { useState } from 'react'
import {  useHistory } from "react-router-dom"

import { createUser } from "../../../API/Auth/AuthProvider"

import { Typography, Paper, TextField, Grid, IconButton, Button, Link, Snackbar } from "@material-ui/core"

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
    const handleSubmit = async () => {
        var isValid = true;
        

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
                window.location.pathname = "/tasks"
                
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
            <Paper elevation={3} style={{width: "350px", height: "500px", position: 'absolute', left: '50%', top: '50%',transform: 'translate(-50%, -50%)', padding: "20px 10px", borderRadius: "15px"}}>
                <Typography variant="h5" style={{fontWeight: "bold", textAlign: "center", marginBottom: "15px"}}>Register</Typography>
                <div style={{width: "90%", marginRight: "auto", marginLeft: "auto", marginBottom: "10px", marginTop: "10px"}}>
                    <Grid container spacing={1} style={{width: "80%", marginRight: "auto", marginLeft: "auto"}}>
                        <Grid item style={{width: "10%"}}>
                            <AccountCircle  style={{marginTop: "12px", height: "30px"}}/>
                        </Grid>
                        <Grid item style={{width: "85%", marginLeft: "5px"}}>
                            <TextField id="input-with-icon-grid" variant="outlined" label="Username" inputProps={{ maxLength: CHARACTER_LIMIT }} helperText={`${userData.username.length}/${CHARACTER_LIMIT}`} onChange={(e) => setUserData({ ...userData, username: e.target.value })}/>
                            <Typography variant="caption" style={{color: "red"}}>{usernameErrors}</Typography>
                        </Grid>
                    </Grid>
                </div>
                <div style={{width: "90%", marginRight: "auto", marginLeft: "auto", marginBottom: "10px", marginTop: "10px"}}>
                    <Grid container spacing={1} style={{width: "80%", marginRight: "auto", marginLeft: "auto"}}>
                        <Grid item style={{width: "10%"}}>
                            <EmailIcon style={{marginTop: "12px", height: "30px"}}/>
                        </Grid>
                        <Grid item style={{width: "85%", marginLeft: "5px"}}>
                            <TextField id="input-with-icon-grid" variant="outlined" label="Email" onChange={(e) => setUserData({ ...userData, email: e.target.value })}/>
                            <Typography variant="caption" style={{color: "red"}}>{emailErrors}</Typography>
                        </Grid>
                    </Grid>
                </div>
                <div style={{width: "90%", marginRight: "auto", marginLeft: "auto", marginBottom: "10px", marginTop: "10px"}}>
                    <Grid container spacing={1} style={{width: "80%", marginRight: "auto", marginLeft: "auto"}}>
                        <Grid item style={{width: "10%"}}>
                            <IconButton onClick={toggleVisibility} style={{padding: "0", marginTop: "15px"}}>
                                {
                                    visible? (<VisibilityIcon />)
                                    :
                                        <VisibilityOffIcon />
                                }
                            </IconButton>
                        </Grid>
                        <Grid item style={{width: "85%", marginLeft: "5px"}}>
                            <TextField id="input-with-icon-grid" variant="outlined" label="Password" type={visible ? "" : "password"} inputProps={{ maxLength: CHARACTER_LIMIT }} helperText={`${userData.password.length}/${CHARACTER_LIMIT}`} onChange={(e) => setUserData({ ...userData, password: e.target.value })}/>
                            <Typography variant="caption" style={{color: "red"}}>{passwordErrors}</Typography>
                        </Grid>
                    </Grid>
                </div>
                <div style={{width: "90%", marginRight: "auto", marginLeft: "auto", marginBottom: "10px", marginTop: "10px"}}>
                    <Grid container spacing={1} style={{width: "80%", marginRight: "auto", marginLeft: "auto"}}>
                        <Grid item style={{width: "10%"}}>
                            <IconButton onClick={toggleVisibility} style={{padding: "0", marginTop: "15px"}}>
                                {
                                    visible? (<VisibilityIcon />)
                                    :
                                        <VisibilityOffIcon />
                                }
                            </IconButton>
                        </Grid>
                        <Grid item style={{width: "85%", marginLeft: "5px"}}>
                            <TextField id="input-with-icon-grid" variant="outlined" label="Confirm Password" type={visible ? "" : "password"} onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}/>
                            <Typography variant="caption" style={{color: "red"}}>{confirmPasswordErrors}</Typography>
                        </Grid>
                    </Grid>
                </div>
                <div style={{width: "100px", marginRight: "auto", marginLeft: "auto", marginTop: "20px", marginBottom: "10px"}}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        type="submit" 
                        component={motion.div}
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 }
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {handleSubmit()}}
                        style={{borderRadius: "15px", width:"100%", textTransform: "none"}}
                    >
                        Register
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