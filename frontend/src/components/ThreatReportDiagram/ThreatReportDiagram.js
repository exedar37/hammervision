import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axiosService';
import mermaid from 'mermaid';

const ThreatDiagram = () => {
    const { reportId } = useParams();
    const mermaidRef = useRef(null);
    const [diagramData, setDiagramData] = useState(null); // Add this line


    useEffect(() => {
        mermaid.initialize({ startOnLoad: false });
        const fetchReportData = async () => {
            try {
                const response = await axios.get(`/reports/${reportId}`);
                const reportData = response.data;
                if (reportData && reportData.ThreatStages) {
                    createDiagram(reportData);
                    setDiagramData(true); // Set diagramData to true after creating the diagram
                }
            } catch (error) {
                console.error("Error fetching report data: ", error);
            }
        };

        fetchReportData();
    }, [reportId]);

    const createDiagram = (reportData) => {
        let diagram = 'graph TD\n';
        diagram += `A[Report: ${reportData.title}] -->|Contains| B(Threat Stages)\n`;
    
        reportData.ThreatStages.forEach(threatStage => {
            diagram += `B --> ${threatStage.id}[${threatStage.name}]\n`;
            
            if (threatStage.Observables && threatStage.Observables.length > 0) {
                threatStage.Observables.forEach(observable => {
                    diagram += `${threatStage.id} --> ${observable.id}("${observable.detailType || 'Observable'}: ${observable.value}")\n`;
                });
            } else {
                diagram += `${threatStage.id} --> ${threatStage.id}_NoObservables["No Observables"]\n`;
            }
        });

        if (mermaidRef.current) {
            try {
                mermaid.render("mermaidChart", diagram, (svgCode) => {
                    mermaidRef.current.innerHTML = svgCode;
                });
            } catch (error) {
                console.error("Mermaid syntax error: ", error);
            }
        }
    };

    return (
        <div ref={mermaidRef}>
            {!diagramData && <p>Loading threat diagram...</p>}
        </div>
    );
};

export default ThreatDiagram;
