import React, { useEffect } from "react"
import ReactFlow from 'reactflow';
import { useActions} from './workflowActions'
export const Workflow = ({selectedWorkflowId}) => {
    const {nodes,edges} = useActions({selectedWorkflowId});
    return <div className=' bg-neutral h-5/6 w-5/6 mt-2 sm:w-2/3 sm:h-5/6 sm:mr-1 rounded-3xl' >
        <ReactFlow nodes={nodes} edges={edges} className="rounded-3xl"/>
    </div>

}