import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../axiosService';
import { TextField, Button, FormControl, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const ReportForm = () => {
    const [report, setReport] = useState({
        sourceOrganization: '',
        title: '',
        publicationDate: null, // Keep the publication date here
        threatStages: []
    });
    const [allThreatStages, setAllThreatStages] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReport = async () => {
            if (id) {
                try {
                    const response = await axios.get(`/reports/${id}`);
                    const fetchedReport = response.data;
                    // Ensure that threatStages is an array
                    if (!fetchedReport.threatStages) {
                      fetchedReport.threatStages = [];
                    }
                    // Parse the publicationDate to Date object if it's not null
                    if (fetchedReport.publicationDate) {
                      fetchedReport.publicationDate = new Date(fetchedReport.publicationDate);
                    }
                    setReport(fetchedReport);
                } catch (error) {
                    console.error("Error fetching report: ", error);
                }
            }
        };

        const fetchThreatStages = async () => {
            try {
                const response = await axios.get('/threat-stages');
                setAllThreatStages(response.data);
            } catch (error) {
                console.error("Error fetching threat stages: ", error);
            }
        };

        fetchReport();
        fetchThreatStages();
    }, [id]);

    const handleChange = (event) => {
        setReport({ ...report, [event.target.name]: event.target.value });
    };

    const handleThreatStageChange = (event) => {
        const selectedThreatStageId = event.target.value;
        const isSelected = event.target.checked;

        if (isSelected) {
            setReport({ 
                ...report, 
                threatStages: [...report.threatStages, allThreatStages.find(ts => ts.id === selectedThreatStageId)] 
            });
        } else {
            setReport({ 
                ...report, 
                threatStages: report.threatStages.filter(ts => ts.id !== selectedThreatStageId) 
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const reportData = {
                ...report,
                publicationDate: report.publicationDate
            };
            if (id) {
                await axios.put(`/reports/${id}`, reportData);
            } else {
                await axios.post('/reports', reportData);
            }
            navigate('/reports');
        } catch (error) {
            console.error("Error saving report: ", error);
        }
    };
    const handlePublicationDateChange = (newValue) => {
      setReport({ ...report, publicationDate: newValue });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <FormControl fullWidth>
              <TextField
                    label="Source Organization"
                    name="sourceOrganization"
                    value={report.sourceOrganization}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    label="Title"
                    name="title"
                    value={report.title}
                    onChange={handleChange}
                    margin="normal"
                />
                {report.publicationDate === null || report.publicationDate instanceof Date ? (
                    <DatePicker
                        label="Publication Date"
                        value={report.publicationDate}
                        onChange={handlePublicationDateChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                ) : null}
                {/* Threat Stages Selection */}
                <FormGroup>
                    {allThreatStages.map((threatStage) => (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={report.threatStages.some(ts => ts.id === threatStage.id)}
                                    onChange={handleThreatStageChange}
                                    value={threatStage.id}
                                />
                            }
                            label={threatStage.name}
                            key={threatStage.id}
                        />
                    ))}
                </FormGroup>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    style={{ marginTop: '20px' }}
                >
                    Save Report
                </Button>
            </FormControl>
        </LocalizationProvider>
    );
};

export default ReportForm;
