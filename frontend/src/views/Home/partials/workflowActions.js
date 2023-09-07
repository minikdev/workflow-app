import React, { useEffect, useMemo } from "react"
import {
    useNodesState,
    useEdgesState,
    addEdge,
    MarkerType
} from 'reactflow';
import { useQuery } from "@tanstack/react-query";
import { extendWorkflow, getWorkflow } from "../../../lib/api";
import toast from 'react-hot-toast';
import { InitNode } from "./nodeTypes/Init";
import { EndNode } from "./nodeTypes/End";
import { ActionNode } from "./nodeTypes/Action";
import { ConditionNode } from "./nodeTypes/Condition";


export const useActions = ({ selectedWorkflowId }) => {
    const nodeTypes = useMemo(() => ({ INIT: InitNode, END: EndNode, ACTION: ActionNode, CONDITION: ConditionNode }), []);
    const [workflow, setWorkflow] = React.useState(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [extendWorkflowModalState, setExtendWorkflowModalState] = React.useState({isVisible: false, nodeId: null});
    const [isLoading, setIsLoading] = React.useState(false);
    useEffect(() => {
        if (!workflow) return;
        const { layer, links } = workflow;
        const { nodes: layerNodes } = layer
        setNodes(layerNodes.map((node, index) => ({
            id: node._id,
            position: { x: 0, y: index * 170 },
            data: { label: node.context, id: node._id, links: mapEdges(links), setExtendWorkflowModalState },
            type: node.type,
           
        })))
        setEdges(mapEdges(links))
    }, [workflow])
    const mapEdges = (links) => {
        return links.map((link) => ({
            id: link._id,
            source: link.destinationNodeId,
            target: link.originNodeId,
            animated: true,
            style: { stroke: '#fff' },
            data: { edgeType: 'bezier', link },
            sourceHandle: links.some(l => l.destinationNodeId === link.destinationNodeId && l._id !== link._id) ? `${link.destinationNodeId}-a-source` : `${link.destinationNodeId}-b-source`,
            targetHandle: `${link.originNodeId}-a-target`,
            zIndex: 1,
            markerEnd: {
                type: MarkerType.Arrow,
                width: 20,
                height: 20,
                color: '#000',
            },
        }))
    }
    const {refetch:refetchWorkflow}= useQuery(['workflow', selectedWorkflowId], () => getWorkflow(selectedWorkflowId), {
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
    const handleExtend = async ({context, type, nodeId}) => {
        try {
            setIsLoading(true);
            await extendWorkflow(workflow?._id,{ nodeId, context, type})
            toast.success('Workflow extended successfully', {
                duration: 1000,
                position: 'bottom-center'
            })
            refetchWorkflow();
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong', {
                duration: 1000,
                position: 'bottom-center'
            })
        }finally{
            setIsLoading(false);
            setExtendWorkflowModalState({isVisible: false, nodeId: null})
        }
    }
    const handleClose = () => {
        setExtendWorkflowModalState({isVisible: false, nodeId: null})
        setIsLoading(false);
    }
    return {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        nodeTypes,
        extendWorkflowModalState,
        handleClose,
        handleExtend,
        isLoading,
        setIsLoading
    }

}