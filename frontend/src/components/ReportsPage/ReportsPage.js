import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ReportsPage = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // TODO: Fetch reports from the backend
  }, []);

  return (
    <div>
      <h1>Reports</h1>
      <Link to="/reports/add">Add New Report</Link>
      <ul>
        {reports.map(report => (
          <li key={report.id}>
            {report.title} - <Link to={`/reports/edit/${report.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportsPage;

