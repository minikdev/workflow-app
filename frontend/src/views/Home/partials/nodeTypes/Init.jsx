import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';


export const InitNode = ({ data })  => {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
        <div className="tooltip hover:tooltip-open tooltip-left" data-tip={data.label}>

      <div className="flex flex-col items-center">
      <div className="w-24 h-24 bg-success rounded-full flex items-center justify-center">
        <p className="text-white">{data.label}</p>
      </div>
    </div>
        </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}