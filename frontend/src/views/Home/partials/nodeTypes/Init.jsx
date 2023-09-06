import { Handle, Position } from 'reactflow';
import { handleStyle } from './style';


export const InitNode = ({ data }) => {
    const isExtendible = !data?.links?.some(link => link.destinationNodeId === data.id)
    const {setExtendWorkflowModalState} = data;
    return (
        <>
            <div className="tooltip hover:tooltip-open tooltip-left" data-tip={data.label}>

                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-success rounded-full flex items-center justify-center">
                        <p className="text-white">{data.label}</p>
                    </div>
                </div>
            </div>
            <Handle type="source" position={Position.Bottom} id={`${data.id}-a-source`}
                onClick={(e, data) => {
                    if(!isExtendible)return;
                    setExtendWorkflowModalState({isLoading:false, isVisible:true});
                }}
                style={handleStyle}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

            </Handle>

        </>
    );
}