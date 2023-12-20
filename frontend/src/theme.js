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
    // Custom styles for components
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Buttons with regular case text
        },
      },
    },
    // Add other component customizations if needed
  },
  // Add other theme customizations if needed
});

export default theme;
