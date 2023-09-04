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
        console.log(ids)
        return await NodeModel.find({_id: {$in: ids}})
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}