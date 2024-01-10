import React from 'react';
import { Container, Button, List, ListItem, Checkbox, FormControlLabel, Typography, Divider, FormGroup, Paper} from '@mui/material';


const HomePage = () => {
  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h4" style={{ marginBottom: 16 }}>Home Page</Typography>
      <Typography variant="subtitle1">Welcome to the threat intelligence dashboard.</Typography>
    </Paper>
  );
};

export default HomePage;

