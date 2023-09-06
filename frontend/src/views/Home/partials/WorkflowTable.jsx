import React from "react"
import { CreateWorkflowModal } from "../../../components/reusables/CreateWorkflowModal";
import { WorkflowsList } from "./WorkflowsList";
import { createWorkflow, getWorkflows } from "../../../lib/api";
import toast from 'react-hot-toast';
import { useQuery } from "@tanstack/react-query";
export const WorkflowTable = () => {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [workflows, setWorkflows] = React.useState([]);
    const handleCreate = async (workflowName) => {
        setIsLoading(true);
        try {
            await createWorkflow(workflowName)
            toast.success('Workflow created successfully', {
                duration: 1000,
                position: 'bottom-center'
            });
        } catch (error) {
            toast.error('Something went wrong', {
                duration: 1000,
                position: 'bottom-center'
            });
        } finally {
            setIsLoading(false);
            setIsModalVisible(false);
            refetch();
        }
    }
    const { isLoading: isWorkflowsLoading, refetch } = useQuery(['workflows'], () => getWorkflows(), {
        onSuccess: (response) => {
            const { data } = response;
            console.log(data)
            setWorkflows(data);
        },
        onError: (error) => {
            console.log(error);
            toast.error('Something went wrong', {
                duration: 1000,
                position: 'bottom-center'
            });
        }
    })
    return (
        <div className="w-5/6 h-1/5 sm:w-1/3 sm:h-5/6">
            <WorkflowsList workflows={workflows} isWorkflowsLoading={isWorkflowsLoading} setIsModalVisible={setIsModalVisible} refetch={refetch} ></WorkflowsList>           
            <CreateWorkflowModal isVisible={isModalVisible}
                handleClose={() => setIsModalVisible(false)}
                handleCreate={handleCreate}
                isLoading={isLoading}
            ></CreateWorkflowModal>
        </div>
    )
}