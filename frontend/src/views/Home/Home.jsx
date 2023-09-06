import React from "react"
import { Workflow } from "./partials/WorkFlow";
import { WorkflowTable } from "./partials/WorkflowTable"
export const Home = () => {
    const [selectedWorkflowId, setSelectedWorkflowId] = React.useState(null);
    return (
        <div className='flex flex-col-reverse sm:flex sm:flex-row justify-between items-center h-full w-full'>
            <WorkflowTable setSelectedWorkflowId={setSelectedWorkflowId}></WorkflowTable>
            <Workflow selectedWorkflowId={selectedWorkflowId}></Workflow>
        </div>
    )
}