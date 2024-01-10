import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container'; // Import Container component


// Import your page components
import HomePage from './components/HomePage/HomePage';
import ReportsPage from './components/ReportsPage/ReportsPage';
import ReportForm from './components/ReportForm/ReportForm';
import ObservablesPage from './components/ObservablesPage/ObservablesPage';
import ObservableForm from './components/ObservableForm/ObservableForm';
import DetectionsPage from './components/DetectionsPage/DetectionsPage';
import DetectionForm from './components/DetectionForm/DetectionForm';
import ThreatStagesPage from './components/ThreatStagesPage/ThreatStagesPage';
import ThreatStageForm from './components/ThreatStageForm/ThreatStageForm';
import ThreatDiagram  from './components/ThreatReportDiagram/ThreatReportDiagram';
import FlowDiagram  from './components/FlowDiagram/FlowDiagram';


function App() {
  return (
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Hammervision
            </Typography>
              <Button color="inherit" component={Link} to="/">Home</Button>
              <Button color="inherit" component={Link} to="/reports">Reports</Button>
              <Button color="inherit" component={Link} to="/observables">Observables</Button>
              <Button color="inherit" component={Link} to="/detections">Detections</Button>
              <Button color="inherit" component={Link} to="/threat-stages">Threat Stages</Button>
          </Toolbar>
        </AppBar>
        <Container >
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/reports" element={<ReportsPage />} />
            <Route path="/reports/add" element={<ReportForm />} />
            <Route path="/reports/edit/:id" element={<ReportForm />} />
            <Route path="/reports/diagram/:reportId" element={<ThreatDiagram />} />
            <Route path="/reports/flowdiagram/:reportId" element={<FlowDiagram />} />
            <Route exact path="/observables" element={<ObservablesPage />} />
            <Route path="/observables/add" element={<ObservableForm />} />
            <Route path="/observables/edit/:id" element={<ObservableForm />} />
            <Route exact path="/detections" element={<DetectionsPage />} />
            <Route path="/detections/add" element={<DetectionForm />} />
            <Route path="/detections/edit/:id" element={<DetectionForm />} />
            <Route exact path="/threat-stages" element={<ThreatStagesPage />} />
            <Route path="/threat-stages/add" element={<ThreatStageForm />} />
            <Route path="/threat-stages/edit/:id" element={<ThreatStageForm />} />
          </Routes>
        </Container>
      </Router>
  );
}

export default App;
