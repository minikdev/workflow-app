

import { Handle, Position } from 'reactflow';
import { handleStyle } from './style';
const handleStyleLeft = { left: 20, top: 90 };
const handleStyleRight = { left: 90, top: 90 };

export const ConditionNode = ({ data }) => {
    const isExtendibleCSource = !data?.links?.some(link => link.destinationNodeId === data.id )
    const isExtendibleBSource = !data?.links?.some(link => link.destinationNodeId === data.id )
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
            <Handle type="source" position={Position.Bottom} id={`${data.id}-a-source`} style={{ ...handleStyle, ...handleStyleLeft }} > <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            </Handle>
            <Handle type="source" position={Position.Bottom} id={`${data.id}-b-source`} style={{ ...handleStyle, ...handleStyleRight }}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            </Handle>
        </>
    );
}