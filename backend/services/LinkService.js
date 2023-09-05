import { getLinksAggregatedByDestinationNodeId } from "../repositories/LinkRepository.js"

export const getUpstreamLinksByDestinationNodeId = async (nodeId, workflowId) => {
    return await getLinksAggregatedByDestinationNodeId(nodeId, workflowId)
}