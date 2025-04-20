import { useSortable } from "@dnd-kit/sortable"
import ColorSquare from "./ColorSquare"
import type { Color } from "../../shared/types"
import clsx from "clsx"

type Props = {
    color: Color
    className?: string
}
export default function SortableColorSquare({ color, className }: Props) {
    const { attributes, listeners, isOver, setNodeRef } = useSortable({
        id: color.id,
    })

    return (
        <ColorSquare
            squareColor={color}
            ref={setNodeRef}
            className={clsx(isOver && "opacity-0", className)}
            style={{ cursor: "pointer" }}
            {...attributes}
            {...listeners}
        />
    )
}