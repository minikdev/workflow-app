import React from "react"
import { Workflow } from "./partials/WorkFlow";
import { WorkflowTable } from "./partials/WorkflowTable"
import { useActions } from "./homeActions";
export const Home = () => {
    const [selectedWorkflowId, setSelectedWorkflowId] = React.useState("");
    const {
        isModalVisible,
        setIsModalVisible,
        isLoading,
        workflows,
        handleCreate,
        isWorkflowsLoading,
        refetch
    } = useActions({selectedWorkflowId});
    return (
        <div className='flex flex-col-reverse sm:flex sm:flex-row justify-between items-center h-full w-full'>
            <WorkflowTable 
            setSelectedWorkflowId={setSelectedWorkflowId}
            selectedWorkflowId={selectedWorkflowId}
            workflows={workflows}
            isWorkflowsLoading={isWorkflowsLoading}
            setIsModalVisible={setIsModalVisible}
            refetch={refetch}
            isModalVisible={isModalVisible}
            handleCreate={handleCreate}
            isLoading={isLoading}
             ></WorkflowTable>
            <Workflow selectedWorkflowId={selectedWorkflowId} refetchWorkflows={refetch}></Workflow>
        </div>
    )
}