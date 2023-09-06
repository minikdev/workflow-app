
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