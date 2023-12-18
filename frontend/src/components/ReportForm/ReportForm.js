import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ReportForm = () => {
  const [reportData, setReportData] = useState({ title: '', content: '' });
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (id) {
      // TODO: Fetch report data for editing
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id) {
      // TODO: Update report
    } else {
      // TODO: Create new report
    }
  };

  const handleChange = (event) => {
    setReportData({ ...reportData, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <h1>{id ? 'Edit Report' : 'Add Report'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input type="text" name="title" value={reportData.title} onChange={handleChange} />
        </div>
        <div>
          <label>Content</label>
          <textarea name="content" value={reportData.content} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
        <button onClick={() => navigate('/reports')}>Cancel</button>
      </form>
    </div>
  );
};

export default ReportForm;

