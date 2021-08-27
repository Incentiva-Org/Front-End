import React, { useState } from 'react'

import { loginUser } from "../../../API/Auth/AuthProvider"

import { Typography, Paper, TextField, Grid, IconButton, Button, Link, Snackbar, OutlinedInput, InputAdornment, InputLabel, FormControl, InputBase, Input, CircularProgress } from "@material-ui/core"

import {NavLink} from "react-router-dom"
import AccountCircle from '@material-ui/icons/AccountCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {motion} from 'framer-motion'
import MuiAlert from '@material-ui/lab/Alert';

import useStyles from "./Styles"

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = () => {

    if(localStorage.getItem('userData')){window.location.pathname = "/tasks"}


    const [visible, setVisible] = useState(false);
    const toggleVisibility = () => {
        setVisible(!visible);
    }
    const [userData, setUserData] = useState({
        email: '', password: ''
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
    const closeAccAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
          }
          setAccError(false);
    }

    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        setLoading(true)
        try {
            
            await loginUser(userData.email, userData.password)
            setLoading(true)
            setSeverity("success")
            setAlert(true)
            setLoading(false)
            window.location.pathname = "/tasks"
            console.log('Valid')
            
        } catch (err) {
            
            setAccSeverity(err.message)
            setAccError("error")
        }
        setLoading(false)
    }

    const classes = useStyles()

    return ( 
        <div>
            <Paper elevation={3} style={{width: "350px", height: "350px", position: 'absolute', left: '50%', top: '50%',transform: 'translate(-50%, -50%)', padding: "20px 10px", borderRadius: "15px", justifyContent: "center"}}>
                <Typography variant="h6" style={{fontWeight: "bold", textAlign: "center", marginBottom: "15px"}}>Login</Typography>
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
                    <FormControl fullWidth>
                        <OutlinedInput
                            id="password"
                            placeholder="Password"
                            type={visible ? "" : "password"} 
                            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                            style={{margin: "0px auto", textAlign: "center"}}
                            fullWidth
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={toggleVisibility} edge="end">
                                        { visible ? <VisibilityIcon /> : <VisibilityOffIcon /> }
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
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
                        {loading ? <CircularProgress style={{width: "20px", height: "20px", color: "white"}}/> : "Login"}
                    </Button>
                </div>
                <div style={{textAlign: "center"}}>
                    <Typography variant="caption" style={{textAlign: "center"}}>Need an account? <Link to="/register" component={NavLink} variant="caption" style={{textAlign: "center", textDecoration: "none"}}>Register here</Link></Typography>
                </div>
                <div style={{textAlign: "center"}}>
                    <Typography variant="caption" style={{textAlign: "center"}}><Link to="/forgotpassword" component={NavLink} variant="caption" style={{textAlign: "center", textDecoration: "none"}}>Forgot Password?</Link></Typography>
                </div>
            </Paper>

            <Snackbar open={alert} autoHideDuration={2000} onClose={closeAlert}>
                <Alert onClose={closeAlert} severity={severity}>
                    {severity === "success" ? "Logged in successfully!" : "Incorrect Username/Password!"}
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

export default Login;