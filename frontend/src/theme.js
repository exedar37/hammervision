import { createTheme } from '@mui/material/styles';

// Define colors
const primaryColor = '#1976d2'; // A shade of blue
const secondaryColor = '#FFC107'; // Amber

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    background: {
      default: '#f4f5f7', // Light gray for background
    },
    text: {
      primary: '#333', // Dark gray for primary text
      secondary: '#555', // Slightly lighter for secondary text
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    // You can add more typography styles here
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Buttons with regular case text
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#f5f5f5', // A light grey color
          //backgroundColor: primaryColor,
          color: '#424242', // A darker grey for text
          padding: '20px', // Add some padding
          boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)', // Subtle shadow
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontSize: '1rem',
          fontWeight: 400,
          lineHeight: 1.5,
          letterSpacing: '0.00938em',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '16px',
          //backgroundColor: '#f0f0f0', // This will apply to all Containers
          backgroundColor: '#435D7B'
        },
      },
    },
    // Add other component customizations if needed
  },
  // Add other theme customizations if needed
});

export default theme;
