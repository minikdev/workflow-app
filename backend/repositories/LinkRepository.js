import { LinkModel } from "../models/LinkModel.js";

export const getLinksAggregatedByDestinationNodeId = async (nodeId) => {
  try {
    const response = await LinkModel.aggregate([
      {
        $graphLookup: {
          from: 'links', // Replace with your actual MongoDB collection name
          startWith: '$destinationNodeId',
          connectFromField: 'destinationNodeId',
          connectToField: 'originNodeId',
          as: 'connectedNodes',
          maxDepth: 100, // Adjust the depth as needed
          restrictSearchWithMatch: {
            destinationNodeId: nodeId
          }
        }
      },
      {
        $unwind: '$connectedNodes'
      },
      {
        $project: {
          _id: '$connectedNodes._id',
          destinationNodeId: '$connectedNodes.destinationNodeId',
          originNodeId: '$connectedNodes.originNodeId',
          level: '$connectedNodes.level'
        }
      },
      {
        $sort: {
          level: 1
        }
      }
    ])
    return response
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export const insert = async ({ originNodeId, destinationNodeId }) => {
  try {
    return await LinkModel({ originNodeId, destinationNodeId }).save()
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}