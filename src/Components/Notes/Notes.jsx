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

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const Notes = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(!open);
  };

  return (
    <div className={classes.mainContainer}>
        <h1>Notes</h1>
          <div>
             
            <List component="nav" className={classes.folderContainer}>
                <div style={{textAlign: "right"}}>
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
          </div>
    </div>
  );
}
export default Notes;