import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {Grid, Chip} from "@material-ui/core"
import useStyles from './Styles'
import { Typography } from '@material-ui/core'
import {Card, CardActions, CardContent } from "@material-ui/core"

const SkeletonCard = ({numItems}) => {
    const classes = useStyles();
    return (
        <SkeletonTheme color="#d8d8d8" highlightColor="#e8e8e8">
            <Grid container spacing={3} style={{paddingTop: "20px", marginRight: "auto", marginLeft: "auto", width: "90%"}}>
            {Array(numItems)
                .fill()
                .map((item, index) => (
                    <Grid key={index} style={{padding: "6px"}} item>
                        <Card className={classes.card}>
                            <CardContent style={{paddingBottom: "0px"}}>
                                <Grid container style={{marginTop: "5px"}}>
                                    <div style={{display: "inline-block", marginRight: "10px"}}><Skeleton width={24} height={24} /></div>
                                    <Typography variant="h7" style={{display: "inline-block", fontWeight: "bold", width: "100px", fontSize: "18px", marginRight: "5px"}}><Skeleton /></Typography>
                                    <Skeleton circle={true} width={20} height={20}/>
                                </Grid>
                                <Grid container alignItems="center">
                                    <div classname={classes.chip} style={{margin: "4px", marginLeft: "0px", padding: "4px 0px", display: "inline-block"}}>
                                        <Skeleton width={60} height={25} style={{borderRadius: "8px"}}/>
                                    </div>
                                    <Typography variant="body2" style={{display: "inline-block", margin: "4px"}}><Skeleton width={50} height={16}/></Typography>
                                </Grid>
                            </CardContent>
                            <CardActions className={classes.cardActions} style={{marginLeft: "5px"}}>
                                <Typography variant="subtitle2" gutterBottom style={{marginLeft: "5px", float: "left"}}><Skeleton width={68}/></Typography>
                                <div style={{marginLeft: "auto", marginRight: "5px"}}>
                                    <Typography variant="h5" style={{display: "inline-block", marginRight: "8px"}}><Skeleton circle={true} width={20} height={20}/></Typography>
                                    <Typography variant="h5" style={{display: "inline-block"}}><Skeleton circle={true} width={20} height={20}/></Typography>
                                </div>                        
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </SkeletonTheme>
    );
  };
  export default SkeletonCard;