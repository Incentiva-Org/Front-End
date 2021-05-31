import { makeStyles } from '@material-ui/core/styles'


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  
    root: {
      display: 'flex',
      overflowX: "hidden"

    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
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
        marginBottom: "5%",
        display: "block"
    },
    link: {
      '& .MuiListItem-root': {
        marginLeft: "auto",
        marginRight: "auto",
        fontWeight: "bold",

      },
      '& .MuiTypography-displayBlock': {
        fontWeight: "bold"
      },
      '& .MuiListItemIcon-root': {
        fontWeight: "bold"
      },
      '&.active': {
        '& .MuiListItem-root': {
          background: 'rgba(128, 90, 213, 0.1)',
        },
        '& .MuiListItemIcon-root': {
          color: 'rgb(128, 90, 213)',
        },
        '& .MuiTypography-displayBlock': {
          color: 'rgb(128, 90, 213)',
        },
      },
      '&.hover': {
        '& .MuiListItem-root': {
          background: "none"
        },
        '& .MuiListItemIcon-root': {
          color: 'rgb(128, 90, 213)',
        },
        '& .MuiTypography-displayBlock': {
          color: 'rgb(128, 90, 213)',
        },
        '.MuiListItem-root.Mui-selected, .MuiListItem-root.Mui-selected:hover': {
          backgroundColor: "rgba(128, 90, 213, 0.1)"
        },
      }, 
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    navButton: {
      fontSize: '18px', 
      marginRight: "5px",
      textTransform: "none"
    },
    
    landingLink: {
      fontSize: "18px"
    },
    miniLogo: {
      width: "120px",
      margin: "20px 30px"
    },
}));


export default useStyles