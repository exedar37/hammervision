const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import models
const { Observable, Detection, ThreatStage, Report } = require('./models');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Observable Routes
app.get('/observables', async (req, res) => {
    try {
        const observables = await Observable.findAll();
        res.json(observables);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/observables', async (req, res) => {
    try {
        const newObservable = await Observable.create(req.body);
        res.status(201).json(newObservable);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
app.put('/observables/:id', async (req, res) => {
    try {
        await Observable.update(req.body, {
            where: { id: req.params.id }
        });
        const updatedObservable = await Observable.findByPk(req.params.id);
        res.json(updatedObservable);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
app.delete('/observables/:id', async (req, res) => {
    try {
        await Observable.destroy({
            where: { id: req.params.id }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});
app.delete('/observables/bulk', async (req, res) => {
    try {
        const ids = req.body; // Array of Observable IDs to delete

        await Observable.destroy({
            where: {
                id: ids
            }
        });

        res.status(200).json({ message: 'Observables deleted successfully' });
    } catch (error) {
        console.error('Error during bulk deletion:', error);
        res.status(500).send(error.message);
    }
});
app.get('/observables/:id', async (req, res) => {
    try {
        const observable = await Observable.findByPk(req.params.id);
        if (observable) {
            res.json(observable);
        } else {
            res.status(404).send('Observable not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});



// Detection Routes
app.get('/detections', async (req, res) => {
    try {
        const detections = await Detection.findAll({
            include: [{
                model: Observable,
                as: 'observables'
            }]
        });
        res.json(detections);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/detections/:id', async (req, res) => {
    try {
        const detection = await Detection.findByPk(req.params.id, {
            include: [{
                model: Observable,
                as: 'observables'
            }]
        });
        if (detection) {
            res.json(detection);
        } else {
            res.status(404).send('Detection not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/detections', async (req, res) => {
    try {
        const newDetection = await Detection.create(req.body);
        res.status(201).json(newDetection);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.put('/detections/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, severity, observables } = req.body;

        // Find or create the Detection
        let detection = await Detection.findByPk(id);
        if (!detection) {
            return res.status(404).send('Detection not found');
        }

        // Update Detection details
        await detection.update({ name, description, severity });

        // Update Observables associations
        const observableInstances = await Promise.all(
            observables.map(async observable => {
                return await Observable.findByPk(observable.id) || await Observable.create(observable);
            })
        );
        
        await detection.setObservables(observableInstances);

        // Fetch updated Detection with Observables
        const updatedDetection = await Detection.findByPk(id, {
            include: [{
                model: Observable,
                as: 'observables'
            }]
        });

        res.json(updatedDetection);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});


app.delete('/detections/:id', async (req, res) => {
    try {
        await Detection.destroy({
            where: { id: req.params.id }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// ThreatStage Routes
app.get('/threat-stages', async (req, res) => {
    try {
        const threatStages = await ThreatStage.findAll({
            include: [{
                model: Observable,
                as: 'observables'
            }]
        });
        res.json(threatStages);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/threat-stages/:id', async (req, res) => {
    try {
        const threatStage = await ThreatStage.findByPk(req.params.id, {
            include: [{
                model: Observable,
                as: 'observables'
            }]
        });
        if (threatStage) {
            res.json(threatStage);
        } else {
            res.status(404).send('Threat Stage not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/threat-stages', async (req, res) => {
    try {
        const newThreatStage = await ThreatStage.create(req.body);
        res.status(201).json(newThreatStage);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
app.put('/threat-stages/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, mitreAttackTechnique, observables } = req.body;
        //id, name, description, mitreAttackTechnique
        // Find or create the ThreatStage
        let threatStage = await ThreatStage.findByPk(id);
        if (!threatStage) {
            return res.status(404).send('Threat Stage not found');
        }

        // Update ThreatStage details
        await threatStage.update({ name, description, mitreAttackTechnique });

        // Update ThreatStage associations
        const observableInstances = await Promise.all(
            observables.map(async observable => {
                return await Observable.findByPk(observable.id) || await Observable.create(observable);
            })
        );
        
        await threatStage.setObservables(observableInstances);

        // Fetch updated ThreatStage with Observables
        const updatedThreatStage = await ThreatStage.findByPk(id, {
            model: Observable,
            as: 'observables'
        });

        res.json(updatedThreatStage);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});
app.delete('/threat-stages/:id', async (req, res) => {
    try {
        await ThreatStage.destroy({
            where: { id: req.params.id }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Report Routes
app.get('/reports', async (req, res) => {
    try {
        const reports = await Report.findAll({
            include: [{ model: ThreatStage, as: 'threatStages' }]
        });
        res.json(reports);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/reports', async (req, res) => {
    try {
        const newReport = await Report.create(req.body);
        res.status(201).json(newReport);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
app.put('/reports/:id', async (req, res) => {
    try {
        const reportData = req.body;
        const threatStageIds = Array.isArray(reportData.threatStages) ? reportData.threatStages.map(ts => ts.id) : [];


        // Update report details
        await Report.update(reportData, { where: { id: req.params.id } });

        // Find the report
        const report = await Report.findByPk(req.params.id);

        // Update associated threat stages
        if (report) {
            await report.setThreatStages(threatStageIds);
        }

        // Fetch the updated report with associated threat stages
        const updatedReport = await Report.findByPk(req.params.id, {
            include: [{ model: ThreatStage, as: 'threatStages' }]
        });

        res.json(updatedReport);
    } catch (error) {
        console.error('Error updating report:', error);
        res.status(500).send(error.message);
    }
});
app.delete('/reports/:id', async (req, res) => {
    try {
        await Report.destroy({
            where: { id: req.params.id }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
});
app.get('/reports/:id', async (req, res) => {
    try {
        const report = await Report.findByPk(req.params.id, {
            include: [{
                model: ThreatStage,
                as: 'threatStages',
                include: [{ model: Observable, as: 'observables' }]
            }]
        });
        if (report) {
            res.json(report);
        } else {
            res.status(404).send('Report not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});



// Additional CRUD operations for each model (PUT, DELETE) would follow a similar pattern

module.exports = app;
