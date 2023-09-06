import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';


export const ActionNode = ({ data }) => {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <Handle type="target" position={Position.Top} id="a" />
      <div className="tooltip hover:tooltip-open tooltip-left" data-tip={data.label}>

        <div className="flex flex-col items-center">
          <div className="w-36 h-24 bg-accent rounded-md flex items-center justify-center">
            <p className="text-white">{data.label}</p>
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} id="b" />
    </>
  );
}