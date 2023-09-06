import React from "react"
import { CreateWorkflowModal } from "../../../components/reusables/CreateWorkflowModal";
export const WorkflowTable = () => {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    return (
        <div className="w-5/6 h-1/5 sm:w-1/3 sm:h-5/6 menu">
            <ul class="menu bg-neutral h-full rounded-box overflow-y-auto flex-nowrap">
            <div className="flex w-full justify-start ml-2 p-1">
                <button className="btn text-xs" onClick={()=>setIsModalVisible(true)}>Create Workflow</button>
            </div>
                <li className='text-primary'>Item</li>
                <li className='text-primary'>Item</li>
                <li className='text-primary'>Item</li>
            </ul>
            <CreateWorkflowModal isVisible={isModalVisible} handleClose={()=> setIsModalVisible(false)} handleCreate={()=> console.log("handleCreate")}></CreateWorkflowModal>
        </div>
    )
}