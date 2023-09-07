
import { axiosFetch } from "./axios";

export const createWorkflow = async (name) => {
    return await axiosFetch({
        method: "POST",
        endpoint: "workflows",
        body: { name },
    });
}
export const getWorkflows = async () => {
    return await axiosFetch({
        method: "GET",
        endpoint: "workflows",
        
    });

}
export const deleteWorkflow = async (id) => {
    return await axiosFetch({
        method: "DELETE",
        endpoint: `workflows/${id}`,
        
    });

}
export const getWorkflow = async (id) => {
    return await axiosFetch({
        method: "GET",
        endpoint: `workflows/${id}`,
        
    });
}

export const extendWorkflow = async (workflowId,{nodeId, context, type}) => {
    return await axiosFetch({
        method: "POST",
        endpoint: `workflows/${workflowId}/extend`,
        body: { nodeId, context, type },
    });
}
export const editNode = async ({nodeId, context, type}) => {
    console.log(nodeId,"amkamk");
    return await axiosFetch({
        method: "PUT",
        endpoint: `nodes/${nodeId}`,
        body: {context, type },
    });
}