import { makeStyles } from '@material-ui/core/styles'



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      boxShadow: "2px 0px 12px rgba(0,0,0,0.1)"
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    logo: {
        width: "50%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "5%",
        marginBottom: "5%"
    },
    link: {
        textDecoration: "none",
        color: "inherit",
        "&:hover": {
            textDecoration: "none"
        }
    }
}));


export default useStyles