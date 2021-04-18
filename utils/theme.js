import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    background: {
      default: '#fff',
    },
  },
  props: {
    MuiTextField: {
      size: 'small',
      margin: 'dense',
       variant: 'outlined',
    }
  }
});

export default theme;
