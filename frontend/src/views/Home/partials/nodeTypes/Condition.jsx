

import { Handle, Position } from 'reactflow';
const handleStyleLeft = { left: 20, top: 90};
const handleStyleRight = { left: 90, top:90};

export const ConditionNode = ({ data }) => {
    
    return (
        <>
            <Handle type="target" position={Position.Top} id={`${data.id}-a-target`} />
            <div className="tooltip hover:tooltip-open tooltip-left" data-tip={data.label}>

            <div className="flex flex-col items-center">
                <div className="w-28 h-28 bg-info rounded-md flex items-center justify-center transform rotate-45">
                    <div className='rotate-[315deg] truncate'>
                        <p className="text-white ">{data.label}</p>
                    </div>
                </div>
            </div>
            </div>
            <Handle type="source" position={Position.Bottom} id={`${data.id}-b-source`} style={handleStyleLeft} />
            <Handle type="source" position={Position.Bottom} id={`${data.id}-c-source`} style={handleStyleRight}/>
        </>
    );
}