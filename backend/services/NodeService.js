import {findById} from '../repositories/NodeRepository.js'
export const update = async ({id,context,type}) => {
    const node = await findById(id)
    if(!node) throw new Error("Node not found")
    await node.update({context, type})
    return await findById(id)
}