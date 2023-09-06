import { WorkflowModel } from "../models/WorkflowModel.js"

export const insert = async ({name, startingNodeId}) => {
    try {
        const workflowWithTheSameName = await WorkflowModel.findOne({name: name.trim(), isDeleted: false})
        if(workflowWithTheSameName) throw new Error("Workflow with the same name already exists")
        return await WorkflowModel({name: name.trim(), startingNodeId}).save()
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}
export const findById = async (id) => {
    try {
        return await WorkflowModel.findOne({_id: id, isDeleted: false})
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}
export const list = async () => {
    try {
        return await WorkflowModel.find({isDeleted: false})
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}
export const update = async (id, body) => {
    try {
        const workflow = await findById(id)
        if(!workflow) throw new Error("Workflow not found")
        await workflow.update(body)
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}