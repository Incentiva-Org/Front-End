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
    borderRadius: '10px',
    width: '284px',
    height: '140px',
    borderRadius: '10px',
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
    display: 'flex',
    paddingTop: "0px",
    paddingBottom: "20px"
  },
  chip: {
  },
  title: {
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
    '&.Mui-checked': {
      '&.MuiFormControlLabel-label': {
        textDecoration: "line-through"
      }
    },
    '&.MuiButton-containedSizeLarge': {
      padding: "8px 12px"
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