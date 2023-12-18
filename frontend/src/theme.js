import { createTheme } from '@mui/material/styles';
import { lime, purple } from '@mui/material/colors';


// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: lime,
    secondary: purple,
    error: {
      main: '#ff0000',  // Color for error states
    },
    background: {
      default: '##5850b9',  // Background color for the application
    },
  },
  typography: {
    // Define your typography adjustments here
    h2: {
      fontSize: '2rem',
      color: '#333333',  // Example color for h1 elements
    },
    h6: {
      fontSize: '2rem',
      color: '#03396c'
    },
    body1: {
      fontSize: '1rem',
      color: '#666666',  // Example color for body text
    },
  },
  // You can also define additional styles for components
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 5, // Rounded button borders
          // Other style overrides for buttons
        },
      },
    },
    // Additional component overrides can go here
  },
});

export default theme;
