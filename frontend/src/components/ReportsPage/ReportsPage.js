import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axiosService';
import { Typography, Paper, List, ListItem, ListItemText, Divider, TextField, Button } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const ReportsPage = () => {
    const [reports, setReports] = useState([]);
    const [filterDate, setFilterDate] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get('/reports');
                setReports(response.data);
            } catch (error) {
                console.error("Error fetching reports: ", error);
            }
        };

        fetchReports();
    }, []);

    const filteredReports = filterDate 
        ? reports.filter(report => report.dateOfAddition && new Date(report.dateOfAddition).toISOString().split('T')[0] === filterDate.toISOString().split('T')[0])
        : reports;

    return (
        <Paper style={{ padding: 16 }}>
            <Typography variant="h4" style={{ marginBottom: 16 }}>Reports</Typography>
            <Link to="/reports/add">Add New Report</Link>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Filter by Date of Addition"
                    value={filterDate}
                    onChange={setFilterDate}
                    renderInput={(params) => <TextField {...params} />}
                />
                <Button onClick={() => setFilterDate(null)}>Clear Filter</Button>
            </LocalizationProvider>

            <List>
                {filteredReports.map(report => (
                    <React.Fragment key={report.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemText
                                primary={report.title}
                                secondary={
                                    <>
                                        <Typography component="span" variant="body2" color="textPrimary">
                                            Source: {report.sourceOrganization}
                                        </Typography>
                                        {report.createdAt && ` - Added on: ${new Date(report.createdAt).toLocaleDateString()}`}
                                        {report.publicationDate && ` - Published: ${new Date(report.publicationDate).toLocaleDateString()}`}
                                        {report.updatedAt && ` - Updated: ${new Date(report.updatedAt).toLocaleDateString()}`}
                                        <div>Threat Stages:</div>
                                        <ul>
                                            {report.threatStages && report.threatStages.length > 0 ? (
                                                report.threatStages.map(ThreatStage => (
                                                    <li key={ThreatStage.id}>{ThreatStage.name}</li>
                                                ))
                                            ) : (
                                                <li>No threat stages associated</li>
                                            )}
                                        </ul>
                                    </>
                                }
                            />
                            <Link to={`/reports/edit/${report.id}`}>Edit</Link>
                            <Link to={`/reports/diagram/${report.id}`}>View Diagram</Link>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))}
            </List>
        </Paper>
    );
};

export default ReportsPage;
