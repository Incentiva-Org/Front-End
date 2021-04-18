import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  fileInput: {
    width: '50%',
    margin: '10px 0',
  },
  buttonSubmit: {
    margin: "10px",
    width: "100px",
    display: "inline-block",
    padding: "8px 0px"
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
    marginLeft: "auto",
    marginRight: "auto"
  },
  fab: {
    margin: 0,
    top: 'auto',
    right: 30,
    bottom: 30,
    left: 'auto',
    position: 'fixed',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));