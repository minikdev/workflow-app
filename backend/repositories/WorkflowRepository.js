import { WorkflowModel } from "../models/WorkflowModel.js"

export const insert = async ({name, startingNodeId}) => {
    try {
        return await WorkflowModel({name, startingNodeId}).save()
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}