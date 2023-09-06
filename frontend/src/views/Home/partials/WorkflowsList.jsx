import React from "react"
import { deleteWorkflow } from "../../../lib/api"
import toast from 'react-hot-toast';
export const WorkflowsList = ({ setIsModalVisible, isWorkflowsLoading, workflows, refetch }) => {
    const handleDeleteWorkflow = async (workflowId) => {
        try {
            await deleteWorkflow(workflowId);
            toast.success('Workflow deleted successfully', {
                duration: 1000,
                position: 'bottom-center'
            });
        } catch (error) {
            toast.error('Something went wrong', {
                duration: 1000,
                position: 'bottom-center'
            });
        } finally {
            refetch();
        }
    }
    return <div className="bg-neutral h-full rounded-box overflow-auto p-2 m-1 ">
        <div className="flex w-full justify-start ml-2 p-1">
            <button className="btn text-xs" onClick={() => setIsModalVisible(true)}>Create Workflow</button>
        </div>
        <div>
            <ul className="  overflow-y-auto flex-nowrap">

                <div className="mt-2">

                    {isWorkflowsLoading ? (
                        <div>
                            <span className="loading loading-spinner text-primary loading-xl"></span>
                        </div>
                    ) : (
                        <div className="overflow-y-auto h-full">
                            {workflows?.map(wf => <WorkflowListItem key={wf._id} workflow={wf} onDeleteWorkflow={handleDeleteWorkflow} ></WorkflowListItem>)}
                        </div>
                    )}

                </div>

            </ul>
        </div>
    </div>

}

const WorkflowListItem = ({ workflow, onDeleteWorkflow}) => {
    return <li className='text-primary hover:bg-primary hover:text-neutral'>
        <div className="flex justify-between p-1 items-center">
            <a className="truncate text-center p-1 ">{workflow.name}</a>
            <div className="p-1 min-w-fit flex items-center">
                <div className={`badge mr-1 ${workflow.isValid ? 'badge-success': 'badge-primary '}`}>{workflow.isValid ? 'Valid' : 'Invalid'}</div>
                <button className="rounded-full" onClick={() => onDeleteWorkflow(workflow._id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>
            </div>
        </div>
    </li>
}