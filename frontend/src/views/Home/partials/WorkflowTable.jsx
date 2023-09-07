import React from "react"
import { CreateWorkflowModal } from "../../../components/reusables/CreateWorkflowModal";
import { WorkflowsList } from "./WorkflowsList";
export const WorkflowTable = ({ setSelectedWorkflowId, selectedWorkflowId, workflows, isWorkflowsLoading, setIsModalVisible, refetch, isModalVisible, handleCreate, isLoading }) => {
    
    return (
        <div className="w-5/6 h-1/5 sm:w-1/3 sm:h-5/6">
            <WorkflowsList 
            workflows={workflows} 
            isWorkflowsLoading={isWorkflowsLoading} 
            setIsModalVisible={setIsModalVisible} 
            refetch={refetch} 
            setSelectedWorkflowId={setSelectedWorkflowId}
            selectedWorkflowId={selectedWorkflowId}
            ></WorkflowsList>           
            <CreateWorkflowModal isVisible={isModalVisible}
                handleClose={() => setIsModalVisible(false)}
                handleCreate={handleCreate}
                isLoading={isLoading}
            ></CreateWorkflowModal>
        </div>
    )
}