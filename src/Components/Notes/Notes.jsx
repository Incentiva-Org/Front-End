import React, { useCallback, useMemo, useState } from 'react';
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
import RichEditor from "./RichEditor"
import Folders from "./Folders"
import SaveIcon from '@material-ui/icons/Save';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const initialValue = [
  {
    type: "paragraph",
    children: [
      { text: "" },
    ]
  },
  
]
const Notes = () => {
  const classes = useStyles();
  
  const [mainState, setMainState] = useState("initial")
  const [imageUploaded, setImageUploaded] = useState(0)
  const [selectedFile, setSelectedFile] = useState(null)
  const [encoding, setEncoding] = useState("")
  const [loading, setLoading] = useState(false)
  const [textFromImage, setTextFromImage] = useState("")
  const [copied, setCopied] = useState(false)
  const [alert, setAlert] = useState(false);
  const [equation, setEquation] = useState("y=x");
  const data = [
    {
      id: "f1",
      title: "Folder 1",
      children: [
        {
          id: "f1a",
          title: "File 1",
        },
        {
          id: "f1b",
          title: "File 2"
        }
      ]
    },
    {
      id: "f2",
      title: "Folder 2",
      children: [
        {
          id: "f2a",
          title: "File 3",
        },
        {
          id: "f2b",
          title: "File 4"
        }
      ]
    },
    {
      id: "f3",
      title: "Folder 3",
      children: [
        {
          id: "f3a",
          title: "File 5",
        },
        {
          id: "f3b",
          title: "File 6"
        }
      ]
    },
  ];
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
    setLoading(true);
    axios.post('https://incentiva-cloud-vision.herokuapp.com/', {
      imageString: encoding
    })
    .then(res => {
      setTimeout(() => setLoading(false), 200)
      setTextFromImage(res.data);
    })
  }
  
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className={classes.mainContainer}>
        <h1>Notes</h1>
          <div>
             <Grid container
                direction="row"
                justify="space-between"
              >
                <Grid item style={{marginBottom: "20px", marginLeft: "auto", marginRight: "auto"}}>
                    <List component="nav" className={classes.folderContainer}>
                      <div style={{textAlign: "right", marginBottom: "10px"}}>
                          <Tooltip title="New Folder" placement="top">
                              <IconButton onClick={() => {}}><CreateNewFolderIcon /></IconButton>
                          </Tooltip>
                          <Tooltip title="New File" placement="top">
                              <IconButton onClick={() => {}}><NoteAddIcon /></IconButton>
                          </Tooltip>
                      </div>

                      <Folders data={data} className={classes.folderContainer}/>
                  </List>
                </Grid>
                
                <Grid item xs={12} sm={8} md={8} style={{marginLeft: "auto", marginRight: "auto"}}>
                  <RichEditor />
                  
                  <div style={{marginLeft: "16px"}}>
                    <IconButton component="span" className={classes.button} size="small" style={{marginRight: "5px"}}>
                            <SaveIcon color="primary" />
                    </IconButton>
                    <input
                      accept="image/*"
                      style={{display: "none"}}
                      id="contained-button-file"
                      type="file"
                      onChange={handleUploadClick}
                    />
                    <label htmlFor="contained-button-file">
                      <IconButton component="span" className={classes.button} size="small">
                        <AddPhotoAlternateIcon color="primary" />
                      </IconButton>
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