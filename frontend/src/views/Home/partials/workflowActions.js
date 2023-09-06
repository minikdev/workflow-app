import React, { useEffect, useMemo } from "react"
import {
    useNodesState,
    useEdgesState,
    addEdge,
    MarkerType
} from 'reactflow';
import { useQuery } from "@tanstack/react-query";
import { getWorkflow } from "../../../lib/api";
import toast from 'react-hot-toast';
import { InitNode } from "./nodeTypes/Init";
import { EndNode } from "./nodeTypes/End";
import { ActionNode } from "./nodeTypes/Action";


export const useActions = ({ selectedWorkflowId }) => {
    const nodeTypes = useMemo(() => ({ INIT: InitNode, END: EndNode, ACTION: ActionNode }), []);
    const [workflow, setWorkflow] = React.useState(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    useEffect(() => {
        if (!workflow) return;
        const { layer, links } = workflow;
        const { nodes: layerNodes } = layer
        setNodes(layerNodes.map((node, index) => ({
            id: node._id,
            position: { x: 0, y: index * 200 },
            data: { label: node.context },
            type: node.type,
           
        })))

        setEdges(links.map((link) => ({
            id: link._id,
            source: link.destinationNodeId,
            target: link.originNodeId,
            animated: true,
            style: { stroke: '#fff' },
            data: { edgeType: 'bezier', link },
            sourceHandle: `${link.destinationTracingNodeId}-c-source`,
            targetHandle: `${link.originTracingNodeId}-b-source`,
            zIndex: 1,
            markerEnd: {
                type: MarkerType.Arrow,
                width: 20,
                height: 20,
                color: '#000',
            },
        })))
    }, [workflow])

    useQuery(['workflow', selectedWorkflowId], () => getWorkflow(selectedWorkflowId), {
        onSuccess: (response) => {
            const { data } = response;
            setWorkflow(data);
        },
        onError: (error) => {
            toast.error('Something went wrong', {
                duration: 1000,
                position: 'bottom-center'
            });
        },
        enabled: !!selectedWorkflowId
    })
    return {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        nodeTypes
    }

}