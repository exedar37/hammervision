import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axiosService';
import { Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

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
            <Link to="/threat-stages/add">Add New Threat Stage</Link>
            <List>
                {threatStages.map(threatStage => (
                    <React.Fragment key={threatStage.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemText
                                primary={threatStage.name}
                                secondary={<Typography variant="body2">{threatStage.description}</Typography>}
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
