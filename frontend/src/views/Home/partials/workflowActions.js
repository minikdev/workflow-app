import React, { useEffect } from "react"

import { useQuery } from "@tanstack/react-query";
import { getWorkflow } from "../../../lib/api";
import toast from 'react-hot-toast';

export const useActions = ({selectedWorkflowId}) => {

    const [workflow,setWorkflow] = React.useState(null);
    const [nodes, setNodes] = React.useState([]);
    const [edges, setEdges] = React.useState([]);
    useEffect(() => {
      if(!workflow) return;
      const { layer, links } = workflow;
      const {nodes: layerNodes} = layer
      setNodes(layerNodes.map((node,index) => ({
        id: node._id,
        position: { x: 0, y: index * 100 },
        data: { label: node.context, type: node.type}
      }))) 
      
      setEdges(links.map((link) => ({
        id: link._id,
        source: link.destinationNodeId,
        target: link.originNodeId
      })))
    },[workflow])

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
        edges
    }

}