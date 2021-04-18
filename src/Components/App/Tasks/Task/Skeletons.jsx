import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {Grid } from "@material-ui/core"
import useStyles from './Styles'
import { Typography } from '@material-ui/core'
import {Card, CardActions, CardContent } from "@material-ui/core"

const SkeletonCard = ({numItems}) => {
    const classes = useStyles();
    return (
        <SkeletonTheme color="#d8d8d8" highlightColor="#e8e8e8">
            <Grid container spacing={2} >
            {Array(numItems)
                .fill()
                .map((item, index) => (
                    <Grid key={index} item xs={12} sm={12} md={6} lg={4} xl={4}>
                        <Card className={classes.card} style={{height: "100%", display: "flex"}}>
                            <CardContent >
                                <div className={classes.header}>
                                    <Typography variant="h5" style={{display: "inline-block", fontWeight: "bold", width: "60%"}}><Skeleton /></Typography>
                                    <Typography variant="caption" style={{display: "inline-block", float: "right", width: "68px"}}><Skeleton /></Typography>
                                </div>
                                <Typography><Skeleton width={100}/></Typography>
                                <Typography><Skeleton width={50} height={32} style={{borderRadius: "16px"}}/></Typography>
                                <Typography variant="body2" component="p" style={{margin: "0px 5px", height: "80px", width: "100%"}}><Skeleton count={4} /></Typography>
                            </CardContent>
                            <CardActions className={classes.cardActions} style={{marginLeft: "5px"}}>
                                <Typography variant="h5" style={{display: "inline-block", marginRight: "5px"}}><Skeleton circle={true} width={24} height={24}/></Typography>
                                <Typography variant="h5" style={{display: "inline-block"}}><Skeleton circle={true} width={24} height={24}/></Typography>                        
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </SkeletonTheme>
    );
  };
  export default SkeletonCard;