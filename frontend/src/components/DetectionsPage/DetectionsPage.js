import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axiosService'; // Adjust the path as necessary

const DetectionsPage = () => {
    const [detections, setDetections] = useState([]);

    useEffect(() => {
        const fetchDetections = async () => {
            try {
                const response = await axios.get('/detections');
                setDetections(response.data);
            } catch (error) {
                console.error("Error fetching detections: ", error);
            }
        };

        fetchDetections();
    }, []);

    return (
        <div>
            <h1>Detections</h1>
            <Link to="/detections/add">Add New Detection</Link>
            <ul>
                {detections.map(detection => (
                    <li key={detection.id}>
                        <h3>{detection.name}</h3>
                        <p>{detection.description}</p>
                        <p>{detection.severity}</p>
                        <p>Observables:</p>
                        <ul>
                            {detection.Observables && detection.Observables.length > 0 ? (
                                detection.Observables.map(observable => (
                                    <li key={observable.id}>{observable.value}</li>
                                ))
                            ) : (
                                <li>No observables associated</li>
                            )}
                        </ul>
                        <Link to={`/detections/edit/${detection.id}`}>Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DetectionsPage;
