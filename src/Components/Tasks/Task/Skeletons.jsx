import React from "react";
import Skeleton from "react-loading-skeleton";
import {Grid } from "@material-ui/core"
import useStyles from './Styles'
import { Typography } from '@material-ui/core'
import {Card, CardActions, CardContent, Chip, IconButton } from "@material-ui/core"

const SkeletonCard = ({numItems}) => {
    const classes = useStyles();
    return (
        <Grid container spacing={2} style={{marginTop: "10px"}}>
          {Array(numItems)
            .fill()
            .map((item, index) => (
                <Grid key={index} item xs={12} sm={12} md={6} lg={4} xl={4}>
                    <div style={{display: "inline-block", width: "436px", height: "286px"}}>
                        <CardContent>
                            <div className={classes.header}>
                                <Typography variant="h5" style={{display: "inline-block", fontWeight: "bold", width: "75%"}}><Skeleton /></Typography>
                                <Typography variant="caption" style={{display: "inline-block", float: "right", width: "68px"}}><Skeleton /></Typography>
                            </div>
                            <Typography><Skeleton width={100}/></Typography>
                            <Chip style={{width: "60px"}}><Skeleton/></Chip>
                            <Typography variant="body2" component="p"><Skeleton count={4} width={`100%`} /></Typography>
                        </CardContent>
                        <CardActions style={{marginLeft: "5px"}}>
                            <Typography variant="h5" style={{display: "inline-block"}}><Skeleton circle={true} width={30} height={30}/></Typography>
                            <Typography variant="h5" style={{display: "inline-block"}}><Skeleton circle={true} width={30} height={30}/></Typography>                        
                        </CardActions>
                    </div>
                </Grid>
            ))}
        </Grid>
    );
  };
  export default SkeletonCard;