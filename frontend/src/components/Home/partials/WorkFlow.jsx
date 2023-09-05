import React from "react"
import ReactFlow from 'reactflow';
const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
export const Workflow = () => {
    return <div className=' bg-neutral h-5/6 w-5/6 mt-2 sm:w-2/3 sm:h-5/6 sm:mr-1 rounded-3xl' >
        <ReactFlow nodes={initialNodes} edges={initialEdges} />
    </div>

}