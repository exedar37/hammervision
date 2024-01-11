import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import axios from '../../axiosService';
import ObservableForm from '../../components/ObservableForm/ObservableForm';
import ReportForm from '../../components/ReportForm/ReportForm';
import ThreatStageForm from '../../components/ThreatStageForm/ThreatStageForm';
import ModalComponent from '../../components/ModalComponent/ModalComponent'; // Import or define your modal component


const FlowDiagram = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const { reportId } = useParams();
  const [selectedNode, setSelectedNode] = useState(null); // State to track the selected node
  
  const onNodeClick = (event, node) => {
    console.log("Node clicked:", node);
    setSelectedNode(node); // Update state with clicked node
  };


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
        type: 'report',
        data: { label: `Report: ${reportData.title}` },
        position: { x: 250, y: 25 }
    });

    reportData.threatStages.forEach((threatStage, index) => {
        const threatStageId = `threatStage-${threatStage.id}`;

        // Create a node for each threat stage
        newNodes.push({
          id: threatStageId,
          type: 'threatStage',
          data: { 
              label: `Threat Stage: ${threatStage.name}`,
              actualId: threatStage.id  // Store the actual threat stage ID
          },
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
            const observableNodeId = `observable-${threatStage.id}-${observable.id}`;

            // Create a node for each observable instance
            newNodes.push({
                id: observableNodeId,
                type: 'observable',
                data: {             
                        label: `Observable: ${observable.value}`,
                        actualId: observable.id  // Store the actual observable ID
                      },
                position: { x: 250 * (index + 1), y: 200 + obsIndex * 100 }
            });

            // Connect each threat stage to its respective observables
            newEdges.push({
                id: `e-${threatStageId}-${observableNodeId}`,
                source: threatStageId,
                target: observableNodeId,
                type: 'smoothstep',
                animated: true
            });
        });
    });
    
    setNodes(newNodes);
    setEdges(newEdges);
  };
  const handleSave = (updatedData) => {
    // Check if the selected node is still available
    if (!selectedNode) return;

    // Update the local state (nodes in the diagram) to reflect the changes
    const updatedNodes = nodes.map(node => {
        if (node.id === selectedNode.id) {
            return {
                ...node,
                data: { ...node.data, label: `Updated Label: ${updatedData.title}` } // Modify according to your data structure
            };
        }
        return node;
    });
    setNodes(updatedNodes);

    // Close the modal
    setSelectedNode(null);
};


  const renderFormBasedOnNodeType = () => {
    if (!selectedNode) return null;

    switch(selectedNode.type) {
        case 'report':
            return (
                <ReportForm
                    reportId = {selectedNode.id}
                    onSave={handleSave}
                    onCancel={() => setSelectedNode(null)}
                />
            );
        case 'threatStage':
            return (
                <ThreatStageForm
                    threatStageId={selectedNode.data.actualId}
                    onSave={handleSave}
                    onCancel={() => setSelectedNode(null)}
                />
            );
        case 'observable':
            return (
                <ObservableForm
                    observableId={selectedNode.data.actualId}
                    onSave={handleSave}
                    onCancel={() => setSelectedNode(null)}
                />
            );
        default:
            return null;
    }
  };


  return (
    <div style={{ height: 500 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        onNodeClick={onNodeClick}
        // Additional properties and event handlers as needed
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
      {selectedNode && (
          <ModalComponent 
          open={Boolean(selectedNode)}
          onClose={() => setSelectedNode(null)}
          title="Edit Node"
        >
          {renderFormBasedOnNodeType()}
        </ModalComponent>
            )}
    </div>
  );
};

export default FlowDiagram;
