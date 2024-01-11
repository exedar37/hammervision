import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../axiosService';
import { TextField, Button, Autocomplete, Container, Typography, Paper } from '@mui/material';

const ThreatStageForm = ({ threatStageId = null, onSave = null, onCancel = null }) => {
    const params = useParams();
    const navigate = useNavigate();
    const [threatStage, setThreatStage] = useState({
        name: '',
        description: '',
        mitreAttackTechnique: '',
        observables: []
    });
    const [observables, setObservables] = useState([]);
    const actualId = threatStageId || params.id;
    const isEdit = actualId !== undefined;

    useEffect(() => {
        const fetchObservables = async () => {
            try {
                const response = await axios.get('/observables');
                setObservables(response.data);
            } catch (error) {
                console.error("Error fetching observables: ", error);
            }
        };

        const fetchThreatStage = async () => {
            if (actualId) {
                try {
                    const response = await axios.get(`/threat-stages/${actualId}`);
                    setThreatStage(response.data);
                } catch (error) {
                    console.error("Error fetching threat stage: ", error);
                }
            }
        };

        fetchObservables();
        if (isEdit) {
            fetchThreatStage();
        }
    }, [actualId, isEdit]);

    const handleChange = (event) => {
        setThreatStage({ ...threatStage, [event.target.name]: event.target.value });
    };

    const handleObservableChange = (event, value) => {
        setThreatStage({ ...threatStage, observables: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let response;
            if (isEdit) {
                response = await axios.put(`/threat-stages/${actualId}`, threatStage);
            } else {
                response = await axios.post('/threat-stages', threatStage);
            }

            if (onSave) {
                onSave(response.data);
            } else {
                navigate('/threat-stages');
            }
        } catch (error) {
            console.error("Error saving threat stage: ", error);
        }
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        } else {
            navigate('/threat-stages');
        }
    };

    return (
        <Paper maxWidth="sm">
            <Typography variant="h4" style={{ margin: '20px 0' }}>
                {isEdit ? 'Edit Threat Stage' : 'Add Threat Stage'}
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Name"
                    name="name"
                    value={threatStage.name}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Description"
                    name="description"
                    value={threatStage.description}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="MITRE ATT&CK Technique"
                    name="mitreAttackTechnique"
                    value={threatStage.mitreAttackTechnique}
                    onChange={handleChange}
                />
                <Autocomplete
                    multiple
                    options={observables}
                    getOptionLabel={(observable) => observable.value}
                    value={threatStage.observables}
                    onChange={handleObservableChange}
                    renderInput={(params) => <TextField {...params} label="Observables" />}
                />
                <Button variant="contained" color="primary" type="submit" style={{ marginTop: '20px' }}>
                    {isEdit ? 'Update' : 'Create'}
                </Button>
                <Button onClick={handleCancel} style={{ marginTop: '20px' }}>
                    Cancel
                </Button>
            </form>
        </Paper>
    );
};

export default ThreatStageForm;
