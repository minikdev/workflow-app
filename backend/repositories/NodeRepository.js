import { NodeModel } from "../models/NodeModel.js"
export const insert = async ({context, type}) => {
    try {
        return await NodeModel({context, type}).save()
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}