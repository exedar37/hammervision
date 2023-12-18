import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const DetectionsPage = () => {
    const [detections, setDetectons] = useState([]);

    useEffect(() => {
        // TODO: Fetch Detections from the backend
    }, []);

    return (
        <div>
            <h1>Detections</h1>
            <Link to="/detections/add">Add New Detection</Link>
            <ul>
                {detections.map(detection => (
                    <li key={detection.id}>
                        {detection.name} - <Link to={`/detections/edit/${detection.id}`}>Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DetectionsPage;

