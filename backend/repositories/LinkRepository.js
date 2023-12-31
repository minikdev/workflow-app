import { LinkModel } from "../models/LinkModel.js";

export const getLinksAggregatedByDestinationNodeId = async (nodeId, workflowId)=> {
  try {
    const initialLinks = await LinkModel.find({destinationNodeId: nodeId, workflowId})
    const response = await LinkModel.aggregate([
      {
        $match: { "workflowId": workflowId}
      },
      {
        $graphLookup: {
          from: 'links',
          startWith: '$originNodeId',
          connectFromField: 'originNodeId',
          connectToField: 'destinationNodeId',
          as: 'upstreamLinks',
          maxDepth: 100,
          depthField: 'level',
        }
      },
      {
        $unwind: '$upstreamLinks'
      },
      {
        $sort: { 'upstreamLinks.level': -1 }
      },
      {
        $project: {
          _id: '$upstreamLinks._id',
          originNodeId: '$upstreamLinks.originNodeId',
          destinationNodeId: '$upstreamLinks.destinationNodeId',
          level: '$upstreamLinks.level'
        }
      },
      {
        $group: {
          _id: '$_id',
          originNodeId: { $first: '$originNodeId' },
          destinationNodeId: { $first: '$destinationNodeId' },
          level: { $first: '$level' }
        }
      },
      {
        $project: {
          _id: 1,
          originNodeId: 1,
          destinationNodeId: 1,
          level: 1
        }
      }
    ])
    return [...initialLinks, ...response].sort((a, b) => a.level - b.level)
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export const insert = async ({ originNodeId, destinationNodeId, workflowId }) => {
  try {
    return await LinkModel({ originNodeId, destinationNodeId, workflowId }).save()
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}