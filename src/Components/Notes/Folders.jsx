import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { IconButton } from "@material-ui/core";
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import DescriptionIcon from '@material-ui/icons/Description';
const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400
  }
});

const Folders = ({data}) => {
  console.log("rendering");
  const classes = useStyles();

  const [, setState] = useState(1);

  const renderItem = item => (
    <TreeItem
      key={item.id}
      nodeId={item.id}
      label={
        <Box>
            <IconButton>
                {item.title.includes("Folder")? (
                    <FolderIcon />
                ) : <DescriptionIcon />
                }
            </IconButton>
            {item.title}
          <IconButton style={{float: "right"}}>
                <DeleteIcon/>
            </IconButton>
        </Box>
        }
      onFocus={() => {
        console.log("focus");
        setState(Math.random);
      }}
    >
      {item.children && item.children.length > 0
        ? item.children.map(renderItem)
        : null}
    </TreeItem>
  );

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      style={{width: "340px"}}
    >
      {data.map(renderItem)}
    </TreeView>
  );
}
export default Folders;