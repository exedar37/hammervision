import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axiosService';
import { Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

const DetectionsPage = () => {
    const [detections, setDetections] = useState([]);

    useEffect(() => {
        const fetchDetections = async () => {
            try {
                const response = await axios.get('/detections');
                setDetections(response.data);
            } catch (error) {
                console.error("Error fetching detections: ", error);
            }
        };

        fetchDetections();
    }, []);

    return (
        <Paper style={{ padding: 16 }}>
            <Typography variant="h4" style={{ marginBottom: 16 }}>Detections</Typography>
            <Link to="/detections/add">Add New Detection</Link>
            <List>
                {detections.map(detection => (
                    <React.Fragment key={detection.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemText
                                primary={detection.name}
                                secondary={
                                    <>
                                        <Typography component="span" variant="body2" color="textPrimary">
                                            {detection.description}
                                        </Typography>
                                        {detection.observables && detection.observables.map(observable => (
                                            <Typography key={observable.id} variant="body2">
                                                {observable.value}
                                            </Typography>
                                        ))}
                                    </>
                                }
                            />
                            <Link to={`/detections/edit/${detection.id}`}>Edit</Link>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))}
            </List>
        </Paper>
    );
};

export default DetectionsPage;
