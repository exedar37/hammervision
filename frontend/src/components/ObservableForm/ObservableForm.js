import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../axiosService';
import { Container, TextField, Button, Typography, MenuItem, FormControl, Autocomplete, 
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper  } from '@mui/material';

const ObservableForm = ({ observableId = null, onSave = null, onCancel = null }) => {
    const params = useParams();
    const navigate = useNavigate();
    const actualId = observableId || params.id;
    const isEdit = actualId !== undefined;    

    const [observable, setObservable] = useState({
        category: '',
        subCategory: '',
        detailType: '',
        dataType: '',
        comparisonOperator: '',
        value: '',
    });

    const categories = ["Host", "Network", "Cloud Service"];
    const subCategories = {
        "Host": ["Windows", "Linux/BSD", "Mac"],
        "Network": ["Flow", "DNS", "Protocol"],
        "Cloud Service": ["AWS", "Azure", "GCP"],
    };
    const dataTypes = ["String", "Integer", "IP", "Hash"];
    const comparisonOperators = ["Equals", "Contains", "Regex"];
    const [detailTypes, setDetailTypes] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);
    const handleDelete = () => {
        axios.delete(`/observables/${actualId}`)
        .then(response => {
            // Handle the successful deletion
            console.log('Observable deleted successfully');
            // Redirect to the observables list
            navigate('/observables');
        })
        .catch(error => {
            // Handle any errors here
            console.error('Error deleting observable: ', error);
        });
    // Close the dialog
    setOpenDialog(false);
    };

    useEffect(() => {
        if (isEdit) {
            // Fetch the observable data for editing
            axios.get(`/observables/${actualId}`)
                .then(response => {
                    setObservable(response.data);
                })
                .catch(error => console.error("Error fetching observable: ", error));
        }
    }, [actualId, isEdit]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setObservable({ ...observable, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let response;
            if (isEdit) {
                response = await axios.put(`/observables/${actualId}`, observable);
            } else {
                response = await axios.post('/observables', observable);
            }        
            if (onSave) {
                onSave(response.data);
            } else {
                navigate('/observables');
            }
        } catch (error) {
            console.error("Error submitting observable: ", error);
        }
    };
    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        } else {
            navigate('/observables');
        }
    };
    return (
        <Paper maxWidth="sm">
            <Typography variant="h6">{isEdit ? 'Edit Observable' : 'Add Observable'}</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    select
                    label="Category"
                    name="category"
                    value={observable.category}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                >
                    {categories.map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    label="SubCategory"
                    name="subCategory"
                    value={observable.subCategory}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    disabled={!observable.category}
                >
                    {observable.category && subCategories[observable.category].map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                </TextField>
                <Autocomplete
                    options={detailTypes}
                    value={observable.detailType}
                    onChange={(event, newValue) => {
                        setObservable({ ...observable, detailType: newValue });
                    }}
                    freeSolo
                    renderInput={(params) => <TextField {...params} label="Detail Type" />}
                />
                <TextField
                    select
                    label="Data Type"
                    name="dataType"
                    value={observable.dataType}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                >
                    {dataTypes.map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    label="Comparison Operator"
                    name="comparisonOperator"
                    value={observable.comparisonOperator}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                >
                    {comparisonOperators.map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Value"
                    name="value"
                    value={observable.value}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    {isEdit ? 'Update' : 'Add'}
                </Button>
                <Button variant="contained" color="secondary" onClick={() => setOpenDialog(true)}>
                    Delete Observable
                </Button>
            </form>
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Observable"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this observable?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

        </Paper>
    );
};

export default ObservableForm;
