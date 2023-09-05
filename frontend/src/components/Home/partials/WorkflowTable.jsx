import React from "react"
export const WorkflowTable = () => {
    return (
        <div className="w-5/6 h-1/5 sm:w-1/3 sm:h-5/6 menu">
            <ul class="menu bg-neutral h-full rounded-box overflow-y-auto flex-nowrap">
            <div className="flex w-full justify-start ml-2 p-1">
                <button className="btn text-xs">Create Workflow</button>
            </div>
                <li><a>Item 1</a></li>
                <li><a>Item 2</a></li>
                <li><a>Item 3</a></li>
            </ul>
        </div>
    )
}