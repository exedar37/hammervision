import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../axiosService'; // Make sure the path is correct
import { TextField, Button, Autocomplete, Checkbox, FormControlLabel, FormGroup, Container, Typography, MenuItem } from '@mui/material';

const DetectionForm = () => {
    const [detection, setDetection] = useState({
        name: '',
        description: '',
        severity: 'low',
        observables: []
    });
    const [observables, setObservables] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = id !== undefined;
    const severityLevels = ["low", "medium", "high"];

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
            const fetchDetection = async () => {
                try {
                    const response = await axios.get(`/detections/${id}`);
                    // Ensure observables is always an array
                    response.data.observables = response.data.Observables || [];
                    setDetection(response.data);
                } catch (error) {
                    console.error("Error fetching detection: ", error);
                }
            };

            fetchDetection();
        }

        fetchObservables();
    }, [id, isEdit]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDetection({ ...detection, [name]: value });
    };

    const handleObservableChange = (event, value) => {
        setDetection({ ...detection, observables: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const apiCall = isEdit ? axios.put(`/detections/${id}`, detection) : axios.post('/detections', detection);
            await apiCall;
            navigate('/detections');
        } catch (error) {
            console.error("Error submitting form: ", error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" style={{ margin: '20px 0' }}>{isEdit ? 'Edit Detection' : 'Add Detection'}</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Name"
                    name="name"
                    value={detection.name}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Description"
                    name="description"
                    value={detection.description}
                    onChange={handleChange}
                />
                <TextField
                    select
                    label="Severity"
                    name="severity"
                    value={detection.severity}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    >
                    {severityLevels.map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                </TextField>
                <Autocomplete
                    multiple
                    options={observables}
                    getOptionLabel={(observable) => observable.value}
                    value={detection.observables}
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

export default DetectionForm;

