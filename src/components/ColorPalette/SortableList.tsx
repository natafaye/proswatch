import { useDroppable } from "@dnd-kit/core"
import { SortableContext } from "@dnd-kit/sortable"
import { ReactNode } from "react"

type Props = {
    list: string[]
    onChange?: (newList: string[]) => void
    children: (item: string, index: number) => ReactNode
    className?: string
}

export default function SortableList({ list, onChange, children, className }: Props) {
    // const { setNodeRef, isOver } = useDroppable({
    //     id: 
    // })
    return (
        <SortableContext items={}>
            <div className={className} ref={setNodeRef}>
                {list.map(children)}
            </div>
        </SortableContext>
    )
}