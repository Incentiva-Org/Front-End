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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DescriptionIcon from '@material-ui/icons/Description';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import Tooltip from "@material-ui/core/Tooltip"
import Grid from '@material-ui/core/Grid';
import { Container, TextField, Fab, Dialog, Typography, CircularProgress } from '@material-ui/core';
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import InputBase from "@material-ui/core/InputBase";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import { createWorker } from 'tesseract.js';
import Tesseract from "tesseract.js"
import LinearProgress from '@material-ui/core/LinearProgress';

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
  const [imgText, setImgText] = useState("");
  const [progress, setProgress] = useState(0);
  const handleUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);
    console.log(URL.createObjectURL(event.target.files[0]))
    reader.onloadend = function(e) {
      setSelectedFile([reader.result])
    }.bind(this);
    setMainState("uploaded")
    setSelectedFile(event.target.files[0])
    setImageUploaded(1);
    Tesseract.recognize(
      URL.createObjectURL(event.target.files[0]),
      'eng',
      { logger: m => console.log(m) }

    ).then(({ data: { text } }) => {
      console.log(text);
      setImgText(text);
    })
  };

  const imageResetHandler = (event) => {
    setMainState("initial");
    setSelectedFile(null);
    setImageUploaded(0);
  }

  const [ocrText, setOcrText] = useState([])

  const worker = createWorker();

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
                <Grid item xs={8}>
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
                        rows={5}
                        variant="outlined"
                        fullWidth
                    >
                      
                    </TextField>
                    <div>
                      <input
                        accept="image/*"
                        style={{display: "none"}}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={handleUploadClick}
                      />
                      <label htmlFor="contained-button-file">
                        <Fab component="span" className={classes.button}>
                          <AddPhotoAlternateIcon />
                        </Fab>
                      </label>
                      <Dialog open={selectedFile !== null}>
                        <CardActionArea>
                          <img
                            width="100%"
                            className={classes.media}
                            src={selectedFile}
                          />
                        </CardActionArea>
                        <Container>
                          <Typography>{!imgText ? (<LinearProgress variant="determinate" value={progress} />) : imgText}</Typography>
                        </Container>
                      </Dialog>
                    </div>
                  </Container>
                </Grid>
            </Grid>
          </div>
    </div>
  );
}
export default Notes;