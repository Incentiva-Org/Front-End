import React, {useState} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from "./Styles"
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DescriptionIcon from '@material-ui/icons/Description';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import Tooltip from "@material-ui/core/Tooltip"
import Grid from '@material-ui/core/Grid';
import { Container, TextField, Fab, Dialog, Typography, Button, Snackbar } from '@material-ui/core';
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import CardActionArea from "@material-ui/core/CardActionArea";
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from 'axios'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notes = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(!open);
  };

  const [mainState, setMainState] = useState("initial")
  const [imageUploaded, setImageUploaded] = useState(0)
  const [selectedFile, setSelectedFile] = useState(null)
  const [encoding, setEncoding] = useState("")
  const [loading, setLoading] = useState(false)
  const [textFromImage, setTextFromImage] = useState("")
  const [copied, setCopied] = useState(false)
  const [alert, setAlert] = useState(false);

  const closeAlert = (event, reason) => {
      if (reason === 'clickaway') {
          return;
        }
        setAlert(false);
  }
  const handleUploadClick = (event) => {
    var file = event.target.files[0];
    setSelectedFile(event.target.files[0])
    
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSelectedFile([reader.result])
      setImageUploaded(reader.result)
      setEncoding(reader.result.split("base64,")[1])
    }
    setMainState("uploaded")
  }

  const imageResetHandler = () => {
    setMainState("initial");
    setSelectedFile(null);
    setImageUploaded(0);
    setTextFromImage("")
    setLoading(false)
  }

  const uploadImage = () => {
    console.log(encoding)
    setLoading(true);
    axios.post('http://localhost:4000/', {
      imageString: encoding
    })
    .then(res => {
      setTimeout(() => setLoading(false), 200)
      setTextFromImage(res.data);
    })
  }
  return (
    <div className={classes.mainContainer}>
        <h1>Notes</h1>
          <div>
             <Grid container
                direction="row"
              >
                <Grid item>
                <List component="nav" className={classes.folderContainer}>
                    <div style={{textAlign: "right", marginBottom: "10px"}}>
                        <Tooltip title="New Folder" placement="top">
                            <IconButton><CreateNewFolderIcon /></IconButton>
                        </Tooltip>
                        <Tooltip title="New File" placement="top">
                            <IconButton><NoteAddIcon /></IconButton>
                        </Tooltip>
                    </div>
                    <ListItem 
                        button 
                        onClick={(event) => handleListItemClick(event, 0)} 
                        selected={selectedIndex === 0}
                    >
                      <ListItemIcon>
                        <FolderIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Single-line item"
                      />
                      {open ? <ExpandLess /> : <ExpandMore />} 
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit className={classes.nested}>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <DescriptionIcon />
                                </ListItemIcon>
                                <ListItemText primary="Starred" />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
                </Grid>
                <Grid item xs={12} sm={10} md={10}>
                  <Container>
                    <TextField
                        id="outlined-multiline-static"
                        label="Title"
                        defaultValue="New Note"
                        variant="outlined"
                        fullWidth
                        style={{marginBottom: "10px"}}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={20}
                        variant="outlined"
                        fullWidth
                    >
                      
                    </TextField>
                    <div>
                        <input
                          accept="image/*"
                          style={{display: "none"}}
                          id="contained-button-file"
                          type="file"
                          onChange={handleUploadClick}
                        />
                        <label htmlFor="contained-button-file">
                          <Fab component="span" className={classes.button} style={{marginTop: "5px"}}>
                            <AddPhotoAlternateIcon />
                          </Fab>
                        </label>
                      <Dialog open={selectedFile !== null} style={{padding: "5px"}}>
                        <div >
                          <Button onClick={imageResetHandler} color="primary" style={{width: "50px"}}>Close</Button>
                        </div>
                        <CardActionArea style={{textAlign: "center"}}>
                          <img
                            width="100%"
                            className={classes.media}
                            src={selectedFile}
                            alt="Upload"
                          />
                        </CardActionArea>
                        <Button variant="contained" color="primary" style={{width: "50%", marginLeft: "auto", marginRight: "auto", marginTop: "5px", marginBottom:"10px"}} onClick={uploadImage}>Upload</Button>
                        <Container style={{width: "95%"}}>
                          {loading ? 
                            (
                              <LinearProgress variant="indeterminate" style={{marginBottom: "10px"}}/>
                            )
                              :
                              <>
                                {textFromImage ? 
                                (
                                  <>
                                    <CopyToClipboard text={textFromImage} style={{float: "right", display: "block"}}
                                      onCopy={() => {setCopied(true); setAlert(true)}}>
                                      <Tooltip title="Copy" placement="top">
                                        <IconButton color="primary">
                                          <FileCopyIcon />
                                        </IconButton>
                                      </Tooltip>
                                    </CopyToClipboard>
                                    <Typography style={{fontWeight: "bold"}}>Output:</Typography>
                                    <Typography>{textFromImage}</Typography>
                                  </>
                                )
                                :
                                  <></>
                                }
                              </>
                          }
                          
                        </Container>
                      </Dialog>
                    </div>
                  </Container>
                </Grid>
            </Grid>
            <Snackbar open={alert} autoHideDuration={2000} onClose={closeAlert}>
                <Alert onClose={closeAlert} severity="success">
                    Copied to clipboard!
                </Alert>
            </Snackbar>
          </div>
    </div>
  );
}
export default Notes;