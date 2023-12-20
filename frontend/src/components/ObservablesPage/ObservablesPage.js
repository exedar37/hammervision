import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axiosService.js'; // Adjust the path as necessary
import { Container, Button, List, ListItem, Checkbox, FormControlLabel, Typography, Divider, FormGroup} from '@mui/material';


const ObservablesPage = () => {
    const [observables, setObservables] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [detailTypes, setDetailTypes] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(new Set());
    const [selectedSubCategories, setSelectedSubCategories] = useState(new Set());
    const [selectedDetailTypes, setSelectedDetailTypes] = useState(new Set());
    const [selectedObservables, setSelectedObservables] = useState(new Set());


    const handleSelectObservable = (id) => {
        const newSelection = new Set(selectedObservables);
        if (newSelection.has(id)) {
            newSelection.delete(id);
        } else {
            newSelection.add(id);
        }
        setSelectedObservables(newSelection);
    };

    const handleBulkDelete = async () => {
        if (selectedObservables.size === 0) {
            alert('No observables selected for deletion.');
            return;
        }

        const confirmDelete = window.confirm("Are you sure you want to delete the selected observables?");
        if (!confirmDelete) {
            return;
        }

        try {
            const idsToDelete = Array.from(selectedObservables);
            await axios.delete('/observables/bulk', { data: idsToDelete });
            // Update the state to reflect the changes
            setObservables(prevObservables => prevObservables.filter(observable => !selectedObservables.has(observable.id)));
            setSelectedObservables(new Set()); // Clear selection
            console.log('Observables deleted successfully');
        } catch (error) {
            console.error('Error deleting observables: ', error);
            // Handle error
        }
    };


    useEffect(() => {
        const fetchObservables = async () => {
            try {
                const response = await axios.get('/observables');
                setObservables(response.data);
            } catch (error) {
                console.error("Error fetching observables: ", error);
            }
        };

        fetchObservables();
    }, []);

    useEffect(() => {
        if (observables.length) {
            setCategories(Array.from(new Set(observables.map(item => item.category))));
            setSubCategories(Array.from(new Set(observables.map(item => item.subCategory))));
            setDetailTypes(Array.from(new Set(observables.map(item => item.detailType))));    
        }
    }, [observables]);

    const handleSubCategoryChange = (subCategory) => {
        const newSelectedSubCategories = new Set(selectedSubCategories);
        if (selectedSubCategories.has(subCategory)) {
            newSelectedSubCategories.delete(subCategory);
        } else {
            newSelectedSubCategories.add(subCategory);
        }
        setSelectedSubCategories(newSelectedSubCategories);    };
    
    const handleDetailTypeChange = (detailType) => {
        const newSelectedDetailTypes = new Set(selectedDetailTypes);
        if (selectedDetailTypes.has(detailType)) {
            newSelectedDetailTypes.delete(detailType);
        } else {
            newSelectedDetailTypes.add(detailType);
        }
        setSelectedDetailTypes(newSelectedDetailTypes);    };
    
    
    const handleCategoryChange = (category) => {
        const newSelectedCategories = new Set(selectedCategories);
        if (selectedCategories.has(category)) {
            newSelectedCategories.delete(category);
        } else {
            newSelectedCategories.add(category);
        }
        setSelectedCategories(newSelectedCategories);
    };

    const filteredObservables = observables.filter(observable => {
        const categoryMatch = selectedCategories.size === 0 || selectedCategories.has(observable.category);
        const subCategoryMatch = selectedSubCategories.size === 0 || selectedSubCategories.has(observable.subCategory);
        const detailTypeMatch = selectedDetailTypes.size === 0 || selectedDetailTypes.has(observable.detailType);
    
        return categoryMatch && subCategoryMatch && detailTypeMatch;
    });

    return (
        <Container >
            <Typography variant="h4" gutterBottom>Observables</Typography>
            <Button variant="contained" color="primary" component={Link} to="/observables/add">
                Add New Observable
            </Button>
            <Divider style={{ margin: '20px 0' }} />

            <FormGroup row>
                <Typography variant="subtitle1">Filter by Category:</Typography>
                {categories.map(category => (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={selectedCategories.has(category)}
                                onChange={() => handleCategoryChange(category)}
                            />
                        }
                        label={category}
                        key={category}
                    />
                ))}
            </FormGroup>

            <FormGroup row>
                <Typography variant="subtitle1">Filter by Subcategory:</Typography>
                {subCategories.map(subCategory => (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={selectedSubCategories.has(subCategory)}
                                onChange={() => handleSubCategoryChange(subCategory)}
                            />
                        }
                        label={subCategory}
                        key={subCategory}
                    />
                ))}
            </FormGroup>

            <FormGroup row>
                <Typography variant="subtitle1">Filter by Detail Type:</Typography>
                {detailTypes.map(detailType => (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={selectedDetailTypes.has(detailType)}
                                onChange={() => handleDetailTypeChange(detailType)}
                            />
                        }
                        label={detailType}
                        key={detailType}
                    />
                ))}
            </FormGroup>

            <List>
                {filteredObservables.map(observable => (
                    <ListItem key={observable.id}>
                        <div>
                            <Checkbox
                                checked={selectedObservables.has(observable.id)}
                                onChange={() => handleSelectObservable(observable.id)}
                            />
                            <Typography variant="h6">Observable: {observable.category} - {observable.subCategory}</Typography>
                            <Typography variant="body2">Detail Type: {observable.detailType}</Typography>
                            <Typography variant="body2">Data Type: {observable.dataType}</Typography>
                            <Typography variant="body2">Comparison Operator: {observable.comparisonOperator}</Typography>
                            <Typography variant="body2">Value: {observable.value}</Typography>
                            <Button variant="outlined" color="primary" component={Link} to={`/observables/edit/${observable.id}`}>
                                Edit
                            </Button>

                        </div>
                    </ListItem>
                ))}
            </List>
                <Button variant="contained" color="secondary" onClick={handleBulkDelete}>
                Delete Selected
            </Button>

        </Container>
    );
};

export default ObservablesPage;
