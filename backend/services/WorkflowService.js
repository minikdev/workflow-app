import { insert } from '../repositories/WorkflowRepository.js'
import { insert as insertNode } from '../repositories/NodeRepository.js'
import { INIT_NODE } from '../lib/constants.js'
export const create = async ({name}) => {
    const startingNode = await insertNode(INIT_NODE)
    return await insert({name, startingNodeId: startingNode._id})
}