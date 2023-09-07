import React from "react"
import { createWorkflow, getWorkflows } from "../../lib/api";
import toast from 'react-hot-toast';
import { useQuery } from "@tanstack/react-query";
export const useActions = () => {
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
            setWorkflows(data);
        },
        onError: (error) => {
            toast.error('Something went wrong', {
                duration: 1000,
                position: 'bottom-center'
            });
        }
    })
    return {
        isModalVisible,
        setIsModalVisible,
        isLoading,
        setIsLoading,
        workflows,
        setWorkflows,
        handleCreate,
        isWorkflowsLoading,
        refetch
        
    }
}