import { insert, findById, update, list } from '../repositories/WorkflowRepository.js'
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
    const upstreamLinks = await getUpstreamLinksByDestinationNodeId(workflow.startingNodeId, workflowId)
    const nodes = await findNodesByIds([...new Set([
        ...upstreamLinks.map(l => l.originNodeId),
        ...upstreamLinks.map(l => l.destinationNodeId),
    ])])
    
    if (!nodes.find(n => n.id === nodeId) && nodeId !== workflow.startingNodeId) throw new Error("Invalid node id")
    
    if(!context) throw new Error("Context is required")

    const insertedNode = await insertNode({context, type})
    await insertLink({originNodeId: insertedNode._id, destinationNodeId: destinationNode._id, workflowId: workflow._id})
    await validateWorkflow(workflow._id, [...nodes, insertedNode])
    const resultWorkflow = await getWorkflowWithNodes(workflowId)
    
    return resultWorkflow
}

export const getWorkflowWithNodes = async (workflowId) => {
    const workflow = await findById(workflowId)
    if(!workflow) throw new Error("Workflow not found")
    const startingNode = await findNodeById(workflow.startingNodeId)
    if(!startingNode) throw new Error("Node not found")
    
    const links = await getUpstreamLinksByDestinationNodeId(startingNode._id, workflowId)
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
                layer.nodes.push(originNode)
            }
        }
    }
    
    return {
        ...workflow._doc,
        links,
        layer
    }
}
export const validateWorkflow = async (workflowId, nodes) => {
    const workflow = await findById(workflowId)
    if(!workflow) throw new Error("Workflow not found")
    const initNodes = nodes.filter(n => n.type === NODE_TYPE_ENUM[0])
    const actionNodes = nodes.filter(n => n.type === NODE_TYPE_ENUM[1])
    const conditionNodes = nodes.filter(n => n.type === NODE_TYPE_ENUM[2])
    const endNodes = nodes.filter(n => n.type === NODE_TYPE_ENUM[3])
    const isValid = initNodes.length === 1 && actionNodes.length >= 1 && conditionNodes.length >= 1 && endNodes.length >= 1
    await update(workflowId, {isValid})
}

export const deleteWorkflow = async (workflowId) => {
    const workflow = await findById(workflowId)
    if(!workflow) throw new Error("Workflow not found")
    await update(workflowId, {isDeleted: true})
}

export const listWorkflows = async () => {
    return await list()
}