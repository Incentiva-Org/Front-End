import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
    margin: "10px 0",
    '&.MuiPaper-elevation8': {
        
    },
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  header: {
    justifyContent: "space-between"
  },
  cardActions: {
    padding: '0 16px 30px 16px',
    display: 'flex',
  },
  chip: {
  },
  title: {
  },
  checkBox: {
    '&.active': {
      '&.MuiFormControlLabel-label': {
        textDecoration: "line-through"
      }
    }
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
    display: "inline-block"
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
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}))