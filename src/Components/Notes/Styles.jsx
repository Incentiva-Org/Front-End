import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    folderContainer: {
        flexGrow: 1,
        maxWidth: 400,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    }
}));


export default useStyles