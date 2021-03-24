import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    outline: 'none',
    width: "450px",
    borderRadius: "20px"
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: "95%",
    padding: "10px 15px",
  },
  fileInput: {
    width: '50%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
    margin: "5px 3px",
    width: "48%"
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
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