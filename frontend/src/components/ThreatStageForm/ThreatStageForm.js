import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../axiosService';
import { TextField, Button, Autocomplete, Checkbox, FormControlLabel, FormGroup, Container, Typography, MenuItem } from '@mui/material';

const ThreatStageForm = () => {
    const [threatStage, setThreatStage] = useState({
        name: '',
        description: '',
        mitreAttackTechnique: '',
        observables: []
    });
    //id, name, description, mitreAttackTechnique
    const [observables, setObservables] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = id !== undefined;

    useEffect(() => {
        const fetchObservables = async () => {
            try {
                const response = await axios.get('/observables');
                setObservables(response.data);
            } catch (error) {
                console.error("Error fetching observables: ", error);
            }
        };
        if (isEdit) {

            const fetchThreatStage = async () => {
                if (id) {
                    try {
                        const response = await axios.get(`/threat-stages/${id}`);
                        response.data.observables = response.data.Observables || [];
                        setThreatStage(response.data);
                    } catch (error) {
                        console.error("Error fetching threat stage: ", error);
                    }
                }
            };

            fetchThreatStage();
        }
        fetchObservables();
        }, [id, isEdit]);

    const handleChange = (event) => {
        setThreatStage({ ...threatStage, [event.target.name]: event.target.value });
    };

    const handleObservableChange = (event, value) => {
        setThreatStage({ ...threatStage, observables: value });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const apiCall = isEdit ? axios.put(`/threat-stages/${id}`, threatStage) : axios.post('/threat-stages', threatStage);
            await apiCall;
            navigate('/threat-stages');
        } catch (error) {
            console.error("Error saving threat stage: ", error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" style={{ margin: '20px 0' }}>{isEdit ? 'Edit Threat Stage' : 'Add Threat Stage'}</Typography>
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
            </form>
        </Container>
    );
};

export default ThreatStageForm;
