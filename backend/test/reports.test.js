const supertest = require('supertest');
const chai = require('chai');
const app = require('../app'); // Import your Express app

const expect = chai.expect;
const request = supertest(app);

describe('Reports API', () => {
    let testReportId;

    // Test for GET endpoint
    it('GET /reports - should return all reports', async () => {
        const response = await request.get('/reports');
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
    });

    // Test for POST endpoint
    it('POST /reports - should create a new report', async () => {
        const reportData = {
            sourceOrganization: 'Test Org',
            title: 'Test Report',
            dateOfAddition: new Date(),
            publicationDate: new Date()
            // Add other necessary fields based on your model
        };
        const response = await request.post('/reports').send(reportData);
        expect(response.status).to.equal(201);
        testReportId = response.body.id; // Save this ID for later tests
    });

    // Test for PUT endpoint
    it('PUT /reports/:id - should update a report', async () => {
        const reportUpdateData = {
            title: 'Updated Test Report'
            // Update fields as necessary
        };
        const response = await request.put(`/reports/${testReportId}`).send(reportUpdateData);
        expect(response.status).to.equal(200);
    });

    // Test for DELETE endpoint
    it('DELETE /reports/:id - should delete a report', async () => {
        const response = await request.delete(`/reports/${testReportId}`);
        expect(response.status).to.equal(204);
    });
});
