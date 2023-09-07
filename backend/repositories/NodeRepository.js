import { NodeModel } from "../models/NodeModel.js"
export const insert = async ({context, type}) => {
    try {
        return await NodeModel({context, type}).save()
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const findById = async (id) => {
    try {
        return await NodeModel.findById(id)
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const findByIds = async (ids) => {
    try {
        return await NodeModel.find({_id: {$in: ids}})
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}
export const update = async ({id,context,type}) => {
    try {
        const node = await findById(id)
        if(!node) throw new Error("Node not found")
        await node.update({context, type})
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}