import { Handle, Position } from 'reactflow';


export const ActionNode = ({ data }) => {

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

      <Handle type="source" position={Position.Bottom} id={`${data.id}-b-source`} />
    </>
  );
}