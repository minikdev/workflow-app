import { create, extend } from '../services/WorkflowService.js'
import { insert as insertNode, findById as findNodeById, findByIds as findNodesByIds} from '../repositories/NodeRepository.js'
import { insert, findById } from '../repositories/WorkflowRepository.js'
import { actionNodeFixture, initNodeFixture } from '../fixtures/NodeFixture.js'
import { workflowCreatedResponse } from '../fixtures/WorkflowFixture.js'
import { INIT_NODE } from '../lib/constants.js'
import {getLinksAggregatedByDestinationNodeId} from '../repositories/LinkRepository.js'
import { firstLinkFixture } from '../fixtures/LinkFixture.js'
jest.mock('../repositories/WorkflowRepository.js',() => ({
    insert: jest.fn(),
    findById: jest.fn(),
}))
jest.mock('../repositories/NodeRepository.js',() => ({
    insert: jest.fn(),
    findById: jest.fn(),
    findByIds: jest.fn(),
}))

jest.mock('../repositories/LinkRepository.js',() => ({
    getLinksAggregatedByDestinationNodeId: jest.fn(),
    insert: jest.fn(),
    
}))


describe("Workflow tests", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it('should create workflow successfully', async () => {
        const name = "test";
        insertNode.mockResolvedValue(initNodeFixture)
        insert.mockResolvedValue({...workflowCreatedResponse, name})
        findById.mockResolvedValue({ _doc: {...workflowCreatedResponse, name},...workflowCreatedResponse, name})
        findNodeById.mockResolvedValue(initNodeFixture)
        getLinksAggregatedByDestinationNodeId.mockResolvedValue([])
        const response = await create({name});
        expect(response).toEqual({...workflowCreatedResponse, links: [], name, layer: {name, nodes: [initNodeFixture]}})
    })
    it('should throw workflow not found error', async () => {
        findById.mockResolvedValue(null)
        try {
            await extend({workflowId: "123", nodeId: "456"});
        } catch (error) {
            expect(error.message).toEqual("Workflow not found")
        }
    })

    it('should throw node not found', async () => {
        findById.mockResolvedValue(workflowCreatedResponse)
        findNodeById.mockResolvedValue(null)
        try {
            await extend({ workflowId: workflowCreatedResponse._id, nodeId: "random-node-id" });
        } catch (error) {
            expect(error.message).toEqual("Node not found")
        }
    })
    it('should invalid node type', async () => {
        findById.mockResolvedValue(workflowCreatedResponse)
        findNodeById.mockResolvedValue(initNodeFixture)
        try {
            await extend({ workflowId: workflowCreatedResponse._id, nodeId: initNodeFixture._id, type: "random-type" });
        } catch (error) {
            expect(error.message).toEqual("Invalid node type")
        }
    })

    it('should invalid node type when the type is INIT', async () => {
        findById.mockResolvedValue(workflowCreatedResponse)
        findNodeById.mockResolvedValue(initNodeFixture)
        try {
            await extend({ workflowId: workflowCreatedResponse._id, nodeId: initNodeFixture._id, type: INIT_NODE.type });
        } catch (error) {
            expect(error.message).toEqual("Invalid node type")
        }
    })

    it('should extend workflow with a new node', async () => {
        const name = "workflow name"
        findById.mockResolvedValueOnce({...workflowCreatedResponse, name})
        findNodeById.mockResolvedValueOnce(initNodeFixture)
        getLinksAggregatedByDestinationNodeId.mockResolvedValueOnce([])
        insertNode.mockResolvedValueOnce(actionNodeFixture)
        findById.mockResolvedValueOnce({ _doc: {...workflowCreatedResponse, name},...workflowCreatedResponse, name})
        findNodeById.mockResolvedValueOnce(initNodeFixture)
        getLinksAggregatedByDestinationNodeId.mockResolvedValueOnce([firstLinkFixture])
        findNodesByIds.mockResolvedValueOnce([initNodeFixture,actionNodeFixture])
        findNodesByIds.mockResolvedValueOnce([initNodeFixture,actionNodeFixture])
        const response = await extend({ workflowId: workflowCreatedResponse._id, nodeId: initNodeFixture._id, type: actionNodeFixture.type, context: actionNodeFixture.context });
        expect(response.name).toEqual(name)
        expect(response.links).toEqual([firstLinkFixture])
    })
})