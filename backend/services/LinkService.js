import { getLinksAggregatedByDestinationNodeId } from "../repositories/LinkRepository.js"

export const getUpstreamLinksByDestinationNodeId = async (nodeId) => {
    return await getLinksAggregatedByDestinationNodeId(nodeId)
}