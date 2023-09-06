import { Handle, Position } from 'reactflow';
import { handleStyle } from './style';


export const ActionNode = ({ data }) => {
  const isExtendible = !data?.links?.some(link => link.destinationNodeId === data.id)
  return (
    <>
      <Handle type="target" position={Position.Top} id={`${data.id}-a-target`} />
      <div className="tooltip hover:tooltip-open tooltip-left" data-tip={data.label}>

        <div className="flex flex-col items-center">
          <div className="w-36 h-24 bg-accent rounded-md flex items-center justify-center">
            <p className="text-white">{data.label}</p>
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} id={`${data.id}-a-source`} style={handleStyle}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      </Handle>
    </>
  );
}