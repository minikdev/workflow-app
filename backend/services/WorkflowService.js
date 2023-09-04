import { insert, findById } from '../repositories/WorkflowRepository.js'
import { insert as insertNode, findById as findNodeById, findByIds as findNodesByIds} from '../repositories/NodeRepository.js'
import { insert as insertLink } from '../repositories/LinkRepository.js'
import { INIT_NODE, NODE_TYPE_ENUM } from '../lib/constants.js'
import { getUpstreamLinksByDestinationNodeId } from './LinkService.js'
export const create = async ({name}) => {
    const startingNode = await insertNode(INIT_NODE)
    const insertedWorkflow = await insert({name, startingNodeId: startingNode._id})
    return await getWorkflowWithNodes(insertedWorkflow._id)
}

export const extend = async ({workflowId, nodeId, type, context}) => {
    const workflow = await findById(workflowId)
    if(!workflow) throw new Error("Workflow not found")

    const destinationNode = await findNodeById(nodeId)
    if(!destinationNode) throw new Error("Node not found")

    if(!NODE_TYPE_ENUM.includes(type) || type === NODE_TYPE_ENUM[0]) throw new Error("Invalid node type") // NODE_TYPE_ENUM[0] is INIT
    const upstreamLinks = await getUpstreamLinksByDestinationNodeId(workflow.startingNodeId)
    console.log(upstreamLinks,upstreamLinks)
    const nodes = await findNodesByIds([...new Set([
        ...upstreamLinks.map(l => l.originNodeId),
        ...upstreamLinks.map(l => l.destinationNodeId),
    ])])
    if (!nodes.find(n => n.id === nodeId) && nodeId !== workflow.startingNodeId) throw new Error("Invalid node id")
    
    if(!context) throw new Error("Context is required")

    const insertedNode = await insertNode({context, type})
    await insertLink({originNodeId: insertedNode._id, destinationNodeId: destinationNode._id})
    const resultWorkflow = await getWorkflowWithNodes(workflowId)
    return resultWorkflow
}

export const getWorkflowWithNodes = async (workflowId) => {
    const workflow = await findById(workflowId)
    if(!workflow) throw new Error("Workflow not found")
    const startingNode = await findNodeById(workflow.startingNodeId)
    if(!startingNode) throw new Error("Node not found")
    
    const links = await getUpstreamLinksByDestinationNodeId(startingNode._id)
    const layer = { name: workflow.name, nodes: [startingNode]}
    if(links.length > 0){
        const nodes = await findNodesByIds([...new Set([
            ...links.map(l => l.originNodeId),
            ...links.map(l => l.destinationNodeId),
        ])])
        if(nodes.length <= 0) throw new Error("Nodes not found")
        for(const link of links){
            const originNode = nodes.find(n => n.id === link.originNodeId)
            const destinationNode = nodes.find(n => n.id === link.destinationNodeId)
            if(originNode && destinationNode){
                layer.nodes.push(destinationNode)
            }
        }
    }
    
    return {
        ...workflow._doc,
        links,
        layer
    }
}