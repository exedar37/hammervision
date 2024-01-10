import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import axios from '../../axiosService';

const FlowDiagram = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const { reportId } = useParams();

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await axios.get(`/reports/${reportId}`);
        const reportData = response.data;
        createFlowElements(reportData);
      } catch (error) {
        console.error("Error fetching report data: ", error);
      }
    };

    fetchReportData();
  }, [reportId]);

  const createFlowElements = (reportData) => {
    const newNodes = [];
    const newEdges = [];

    // Create a node for the report
    newNodes.push({
        id: reportData.id,
        type: 'default',
        data: { label: `Report: ${reportData.title}` },
        position: { x: 250, y: 25 }
    });

    reportData.threatStages.forEach((threatStage, index) => {
        const threatStageId = `threatStage-${threatStage.id}`;

        // Create a node for each threat stage
        newNodes.push({
            id: threatStageId,
            type: 'default',
            data: { label: `Threat Stage: ${threatStage.name}` },
            position: { x: 250 * (index + 1), y: 100 }
        });

        // Connect the report to each threat stage
        newEdges.push({
            id: `e-${reportData.id}-${threatStageId}`,
            source: reportData.id,
            target: threatStageId,
            type: 'smoothstep',
            animated: true
        });

        threatStage.observables.forEach((observable, obsIndex) => {
            // Create a unique ID for each observable instance within its threat stage
            const observableId = `observable-${threatStage.id}-${observable.id}`;

            // Create a node for each observable instance
            newNodes.push({
                id: observableId,
                type: 'default',
                data: { label: `Observable: ${observable.value}` },
                position: { x: 250 * (index + 1), y: 200 + obsIndex * 50 }
            });

            // Connect each threat stage to its respective observables
            newEdges.push({
                id: `e-${threatStageId}-${observableId}`,
                source: threatStageId,
                target: observableId,
                type: 'smoothstep',
                animated: true
            });
        });
    });

    setNodes(newNodes);
    setEdges(newEdges);
};

  return (
    <div style={{ height: 500 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        // Additional properties and event handlers as needed
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default FlowDiagram;
