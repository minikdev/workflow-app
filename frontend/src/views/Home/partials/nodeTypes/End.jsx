import { Handle, Position } from 'reactflow';


export const EndNode = ({ data })  => {
  
  return (
    <>
        <div className="tooltip hover:tooltip-open tooltip-left" data-tip={data.label}>
      <div className="flex flex-col items-center">
      <div className="w-24 h-24 bg-error rounded-full flex items-center justify-center">
        <p className="text-white">{data.label}</p>
      </div>
    </div>
        </div>
      <Handle type="target" position={Position.Top} id={`${data.id}-a-target`} />
    </>
  );
}