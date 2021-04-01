import React, { useState } from 'react'
import { Typography, Paper, Input, InputLabel, InputAdornment, FormControl, TextField, Grid, IconButton, Button, Link } from "@material-ui/core"
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/EmailOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {motion} from 'framer-motion'
import useStyles from "./Styles"

const Login = () => {
    const classes = useStyles();
    const [visible, setVisible] = useState(false);
    const toggleVisibility = () => {
        setVisible(!visible);
    }
    return (
        <div className={classes.mainContainer}>
            <Paper elevation={3} style={{width: "375px", height: "375px", position: 'absolute', left: '50%', top: '50%',transform: 'translate(-50%, -50%)', padding: "20px 10px", borderRadius: "10px"}}>
                <Typography variant="h5" style={{fontWeight: "bold", textAlign: "center"}}>Login</Typography>
                <div style={{width: "250px", marginRight: "auto", marginLeft: "auto", marginBottom: "20px", marginTop: "20px"}}>
                    <Grid container spacing={1} style={{width: "250px"}}>
                        <Grid item>
                            <AccountCircle  style={{paddingTop: "15px", height: "30px"}}/>
                        </Grid>
                        <Grid item>
                            <TextField id="input-with-icon-grid" variant="outlined" label="Username" />
                        </Grid>
                    </Grid>
                </div>
                <div style={{width: "250px", marginRight: "auto", marginLeft: "auto", marginBottom: "20px"}}>
                    <Grid container spacing={1} style={{width: "250px"}}>
                        <Grid item>
                            <EmailIcon  style={{paddingTop: "15px", height: "30px"}}/>
                        </Grid>
                        <Grid item>
                            <TextField id="input-with-icon-grid" variant="outlined" label="Email" />
                        </Grid>
                    </Grid>
                </div>
                <div style={{width: "250px", marginRight: "auto", marginLeft: "auto"}}>
                    <Grid container spacing={1} style={{width: "250px"}}>
                        <Grid item>
                            <IconButton onClick={toggleVisibility} style={{padding: "0", marginTop: "15px"}}>
                                {
                                    visible? (<VisibilityIcon />)
                                    :
                                        <VisibilityOffIcon />
                                }
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <TextField id="input-with-icon-grid" variant="outlined" label="Password" />
                        </Grid>
                    </Grid>
                </div>
                <div style={{width: "20%", marginRight: "auto", marginLeft: "auto", marginTop: "20px", marginBottom: "10px"}}>
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
                        onClick={() => {}}
                    >
                        Login
                    </Button>
                </div>
                <div style={{textAlign: "center"}}>
                    <Typography variant="caption" style={{textAlign: "center"}}>Don't have an account? <Link href="#" variant="caption" style={{textAlign: "center"}}>Register here</Link></Typography>
                </div>
            </Paper>
        </div>
    )
}

export default Login;