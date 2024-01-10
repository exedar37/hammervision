import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axiosService';
import { Typography, Paper, List, ListItem, ListItemText, Divider, Button } from '@mui/material';

const ThreatStagesPage = () => {
    const [threatStages, setThreatStages] = useState([]);

    useEffect(() => {
        const fetchThreatStages = async () => {
            try {
                const response = await axios.get('/threat-stages');
                setThreatStages(response.data);
            } catch (error) {
                console.error("Error fetching threat stages: ", error);
            }
        };

        fetchThreatStages();
    }, []);

    return (
        <Paper style={{ padding: 16 }}>
            <Typography variant="h4" style={{ marginBottom: 16 }}>Threat Stages</Typography>
            <Button variant="contained" color="primary" component={Link} to="/threat-stages/add">
                Add New Threat Stage
            </Button>
            <List>
                {threatStages.map(threatStage => (
                    <React.Fragment key={threatStage.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemText
                                primary={threatStage.name}
                                secondary={
                                    <>
                                        <Typography component="span" variant="body2" color="textPrimary">
                                            {threatStage.description}
                                        </Typography>
                                        {threatStage.observables && threatStage.observables.map(observable => (
                                            <Typography key={observable.id} variant="body2">
                                                {observable.value}
                                            </Typography>
                                        ))}
                                    </>
                                }
                            />
                            <Link to={`/threat-stages/edit/${threatStage.id}`}>Edit</Link>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))}
            </List>
        </Paper>
    );
};

export default ThreatStagesPage;
