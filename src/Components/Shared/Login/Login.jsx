import React, { useState } from 'react'

import { loginUser } from "../../../API/index"

import { Typography, Paper, TextField, Grid, IconButton, Button, Link, Snackbar } from "@material-ui/core"


import AccountCircle from '@material-ui/icons/AccountCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {motion} from 'framer-motion'
import MuiAlert from '@material-ui/lab/Alert';

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
        emailOrUsername: '', password: ''
    })

    const [alert, setAlert] = useState(false);
    const closeAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
          }
          setAlert(false);
    }
    const [severity, setSeverity] = useState("");
    const handleSubmit = () => {
       
        loginUser(userData).then((response) => {
            const returnResponse = response.data['success']
            const isValid = returnResponse !== false
            

            if(isValid) {
                setSeverity("success")
                localStorage.setItem('userData', JSON.stringify(returnResponse))
                window.location.pathname = "/tasks"
                console.log('Valid')
            }
            else {
                setSeverity("error")
            }
            setAlert(true)
        })
    }
    return ( 
        <div>
            <Paper elevation={3} style={{width: "350px", height: "350px", position: 'absolute', left: '50%', top: '50%',transform: 'translate(-50%, -50%)', padding: "20px 10px", borderRadius: "15px"}}>
                <Typography variant="h5" style={{fontWeight: "bold", textAlign: "center"}}>Login</Typography>
                <div style={{width: "90%", marginRight: "auto", marginLeft: "auto", marginBottom: "10px", marginTop: "10px"}}>
                    <Grid container spacing={1} style={{width: "80%", marginRight: "auto", marginLeft: "auto"}}>
                        <Grid item style={{width: "10%"}}>
                            <AccountCircle  style={{marginTop: "12px", height: "30px"}}/>
                        </Grid>
                        <Grid item style={{width: "85%", marginLeft: "5px"}}>
                            <TextField id="input-with-icon-grid" variant="outlined" label="Username or email" onChange={(e) => setUserData({ ...userData, emailOrUsername: e.target.value })}/>
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
                            <TextField id="input-with-icon-grid" variant="outlined" label="Password" type={visible ? "" : "password"} onChange={(e) => setUserData({ ...userData, password: e.target.value })}/>
                        </Grid>
                    </Grid>
                </div>
                <div style={{width: "20%", marginRight: "auto", marginLeft: "auto", marginTop: "20px", marginBottom: "15px"}}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        type="submit" 
                        component={motion.div}
                        whileHover={{
                            scale: 1.02,
                            transition: { duration: 0.1 }
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {handleSubmit()}}
                    >
                        Login
                    </Button>
                </div>
                
                <div style={{textAlign: "center"}}>
                    <Typography variant="caption" style={{textAlign: "center"}}>Don't have an account? <Link href="/register" variant="caption" style={{textAlign: "center", textDecoration: "none"}}>Register here</Link></Typography>
                </div>
                <br></br>
                <div style={{textAlign: "center"}}>
                    <Typography variant="caption" style={{textAlign: "center"}}><Link href="#" variant="caption" style={{textAlign: "center", textDecoration: "none"}}>Forgot Password?</Link></Typography>
                </div>
            </Paper>
            <Snackbar open={alert} autoHideDuration={2000} onClose={closeAlert}>
                <Alert onClose={closeAlert} severity={severity}>
                    {severity === "success" ? ("Logged in successfully!") : "Incorrect Username/Password!"}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Login;