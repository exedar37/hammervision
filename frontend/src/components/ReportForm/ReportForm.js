import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../axiosService';
import { TextField, Button, FormControl, Checkbox, FormControlLabel, FormGroup, Paper } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const ReportForm = ({ reportId = null, onSave = null, onCancel = null }) => {
    const params = useParams();
    const id = reportId || params.id;  // Use reportId first, if not available, then use id from params
    const navigate = useNavigate();
    const [report, setReport] = useState( {
        sourceOrganization: '',
        title: '',
        publicationDate: null,
        threatStages: []
    });
    const [allThreatStages, setAllThreatStages] = useState([]);

    useEffect(() => {
        const fetchReport = async () => {
            if (id) {
                try {
                    const response = await axios.get(`/reports/${id}`);

                    setReport(response.data);
                } catch (error) {
                    console.error("Error fetching report: ", error);
                }
            }
        };
        fetchReport();

        const fetchThreatStages = async () => {
            try {
                const response = await axios.get('/threat-stages');
                setAllThreatStages(response.data);
            } catch (error) {
                console.error("Error fetching threat stages: ", error);
            }
        };
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
            let response;
            console.log(`saving to report id ${report.id}`)
            console.log(`reportId value: ${reportId}`)
            console.log(reportData)
            if (report.id) {
                response = await axios.put(`/reports/${report.id}`, reportData);
            } else {
                response = await axios.post('/reports', reportData);
            }
            console.log('Report saved:', response.data);
            // If you're using the form in a modal, call onCancel to close it
            if (onCancel) {
                onCancel();
                } else {
                    navigate('/reports');
                }            
            }
            catch (error) {
                console.error("Error saving report: ", error);
            }
    };

    const handlePublicationDateChange = (newValue) => {
      setReport({ ...report, publicationDate: newValue });
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        } else {
            navigate('/reports');
        }
    };

    return (
        <Paper>
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
                                    checked={report.threatStages?.some(ts => ts.id === threatStage.id)}
                                    onChange={handleThreatStageChange}
                                    value={threatStage.id}
                                />
                            }
                            label={threatStage.name}
                            key={threatStage.id}
                        />
                    ))}
                </FormGroup>
                    <Button onClick={handleCancel} style={{ marginTop: '20px' }}>
                        Cancel
                    </Button>
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
        </Paper>
    );
};

export default ReportForm;

