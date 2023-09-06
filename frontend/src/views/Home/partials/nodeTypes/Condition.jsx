

import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';


export const ConditionNode = ({ data }) => {
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    return (
        <>
            <Handle type="target" position={Position.Top} id="a" />
            <div className="tooltip hover:tooltip-open tooltip-left" data-tip={data.label}>

            <div className="flex flex-col items-center">
                <div className="w-28 h-28 bg-info rounded-md flex items-center justify-center transform rotate-45">
                    <div className='rotate-[315deg] truncate'>
                        <p className="text-white ">{data.label}</p>
                    </div>
                </div>
            </div>
            </div>
            <Handle type="source" position={Position.Bottom} id="a" />
        </>
    );
}