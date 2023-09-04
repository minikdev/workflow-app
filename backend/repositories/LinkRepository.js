import { LinkModel } from "../models/LinkModel.js";

export const getLinksAggregated = async (nodeId) => {
    try {
        return await LinkModel.aggregate([
            {
              $match: {
                destinationNodeId: nodeId
              }
            },
            {
              $graphLookup: {
                from: "links",
                startWith: "$destionationNodeId",
                connectFromField: "destionationNodeId",
                connectToField: "originNodeId",
                as: "connectedNodes",
                maxDepth: 100, // Adjust the depth as needed
              }
            },
            {
              $unwind: "$connectedNodes"
            },
            {
              $project: {
                _id: 0,
                id: "$connectedNodes.id",
                destionationNodeId: "$connectedNodes.destionationNodeId",
                originNodeId: "$connectedNodes.originNodeId",
                level: "$connectedNodes.level"
              }
            },
            {
              $sort: {
                level: 1
              }
            }
          ])
    } catch (error) {
        console.log("amk")
        console.log(error)
        throw new Error(error)
    }
}

export const insert = async ({originNodeId, destinationNodeId}) => {
        try {
            return await LinkModel({originNodeId, destinationNodeId}).save()
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
}