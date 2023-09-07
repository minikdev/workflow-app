import React, { useEffect, useMemo } from "react"
import {
    useNodesState,
    useEdgesState,
    addEdge,
    MarkerType
} from 'reactflow';
import { useQuery } from "@tanstack/react-query";
import { extendWorkflow, getWorkflow, getWorkflows } from "../../../lib/api";
import toast from 'react-hot-toast';
import { InitNode } from "./nodeTypes/Init";
import { EndNode } from "./nodeTypes/End";
import { ActionNode } from "./nodeTypes/Action";
import { ConditionNode } from "./nodeTypes/Condition";


export const useActions = ({ selectedWorkflowId, refetchWorkflows }) => {
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
        setNodes(mapNodes(layerNodes,links))
        setEdges(mapEdges(links))
    }, [workflow])

    const mapNodes = (nodes, links) => {
        return nodes.reduce((acc, node, index) => {
            acc.push({
                id: node._id,
                position: decideOnNodePosition(acc,node, index, mapEdges(links)),
                data: { label: node.context, id: node._id, links: mapEdges(links), setExtendWorkflowModalState },
                type: node.type,
            })
            return acc
        },[])
    }
    const decideOnNodePosition = (acc,node, index, edges) => {
        if(index === 0) return { x: 0, y: 0 }

        const sourceNode = acc.find(accNode => accNode.id === edges.find(edge => edge.target === node._id)?.source)
        if(sourceNode.type !== 'CONDITION') return {x:sourceNode.position.x, y: sourceNode.position.y + 170}

        if(isFirstNodeConnectedToCondition(acc,sourceNode,edges)) return {x:sourceNode.position.x + 150, y: sourceNode.position.y + 170}
        if(!isFirstNodeConnectedToCondition(acc,sourceNode,edges)) return {x:sourceNode.position.x - 150, y: sourceNode.position.y + 170}

        return {x:sourceNode.position.x , y: sourceNode.position.y + 170}
        
    }
    const isFirstNodeConnectedToCondition = (acc,sourceNode,edges) => {
        return acc.some(accNode => accNode.id === edges.find(edge => edge.source === sourceNode.id)?.target)
    }
    const mapEdges = (links) => {
        return links.reduce((acc,link) => {
            acc.push({
                id: link._id,
                source: link.destinationNodeId,
                target: link.originNodeId,
                animated: true,
                style: { stroke: '#fff' },
                data: { edgeType: 'bezier', link },
                sourceHandle: decideOnSourceHandle(acc,link),
                targetHandle: `${link.originNodeId}-a-target`,
                zIndex: 1,
                markerEnd: {
                    type: MarkerType.Arrow,
                    width: 20,
                    height: 20,
                    color: '#000',
                },
            })
            return acc
        },[])
    }
    const decideOnSourceHandle = (acc,link) => {
       return acc.some(edge => edge.sourceHandle === `${link.destinationNodeId}-a-source` ) ? `${link.destinationNodeId}-b-source` : `${link.destinationNodeId}-a-source`
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
            refetchWorkflows()
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