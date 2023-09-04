import { getLinksAggregated } from "../repositories/LinkRepository.js"

export const getUpstreamLinksWithNodeId = async (nodeId) => {
    return await getLinksAggregated(nodeId)
}