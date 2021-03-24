import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    outline: 'none'
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: 250,
    padding: "15px 20px"
  },
  fileInput: {
    width: '50%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
    margin: "5px 5px",
    width: "45%"
  },
}));