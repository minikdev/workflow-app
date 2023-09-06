import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

export const EndNode = ({ data })  => {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      
      <div className="flex flex-col items-center">
      <div className="w-24 h-24 bg-error rounded-full flex items-center justify-center">
        <p className="text-white">{data.label}</p>
      </div>
    </div>
      <Handle type="target" position={Position.Top} id="a" />
    </>
  );
}