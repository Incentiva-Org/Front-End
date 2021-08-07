import Check from '@material-ui/icons/Check'
import AccessTime from '@material-ui/icons/AccessTime'
import Notes from '@material-ui/icons/Notes'
import Star from '@material-ui/icons/Star'
import GroupIcon from '@material-ui/icons/Group';


const routes = {
    
    "Tasks": {
        icon: <Check />,
        path: "/tasks"
    },
    
    "Study Mode": {
        icon: <AccessTime />,
        path: "/study"
    },
    
    "Notes": {
        icon: <Notes />,
        path: "/notes"
    },

    "Insights": {
        icon: <Star />,
        path: "/insights"
    },
    "Friends": {
        icon: <GroupIcon />,
        path: "/friends"
    },

    
}

export default routes