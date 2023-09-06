
import { axios } from "./axios";

export const createWorkflow = async (name) => {
    const { data } = await axios({
        method: "POST",
        endpoint: "workflows",
        body: { name },
    });
    debugger
    return data;
}