import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  mainContainer: {

  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
  button: {
    marginRight: "auto",
    marginLeft: "auto"
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none'
  },
  fab: {
    margin: 0,
    top: 'auto',
    right: 50,
    bottom: 50,
    left: 'auto',
    position: 'fixed',
  },
  dragListContent: {
    position: 'relative',
    width: '320px',
    height: '400px',
    padding: "5px 0px"
  }
}))