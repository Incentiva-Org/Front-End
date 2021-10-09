import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
      menuButton: {
        marginRight: theme.spacing(2),
      },
      logo: {
        width: "120px",
        margin: "10px"
      },
      link: {
          fontSize: "18px",
          color: "inherit",
          '.&hover': {
              textDecoration: "none"
          },
          '.&active': {
            textDecoration: "none"
        },
      },
      '&.MuiLink-underlineHover': {
        textDecoration: "none"
      },
      card: {
        textAlign: "center",
        width: "325px",
        borderRadius: "15px",
      }
}));


export default useStyles