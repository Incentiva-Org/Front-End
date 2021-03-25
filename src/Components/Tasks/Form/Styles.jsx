import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    outline: 'none',
    width: "300px",
    borderRadius: "20px",
    marginLeft: "auto",
    marginRight: "auto"
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: "100%",
    padding: theme.spacing(2),
  },
  fileInput: {
    width: '50%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
    margin: "10px 3px",
    width: "47%"
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
    right: 50,
    bottom: 50,
    left: 'auto',
    position: 'fixed',
  },
}));