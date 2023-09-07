import React from "react"
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider
} from 'reactflow';
import { useActions} from './workflowActions'
import { ExtendWorkflowModal } from "../../../components/reusables/ExtendWorkflowModal";

export const Workflow = ({selectedWorkflowId}) => {
    const {nodes,edges,onNodesChange,onEdgesChange, nodeTypes, extendWorkflowModalState, handleClose, handleExtend,isLoading} = useActions({selectedWorkflowId});
    return <div className=' bg-neutral h-5/6 w-5/6 mt-2 sm:w-2/3 sm:h-5/6 sm:mr-1 rounded-3xl' >
      <ReactFlowProvider>

        <ReactFlow 
        nodes={nodes} 
        edges={edges}
        nodeTypes={nodeTypes}
        className="rounded-3xl"
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        
        >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
        <ExtendWorkflowModal 
        handleExtend={handleExtend} 
        handleClose={handleClose} 
        isVisible={extendWorkflowModalState?.isVisible}
        extendWorkflowModalState={extendWorkflowModalState}
        isLoading={isLoading}/>
      </ReactFlowProvider>
    </div>

}