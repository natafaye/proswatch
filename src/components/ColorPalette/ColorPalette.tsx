import { SortableContext } from "@dnd-kit/sortable"
import { Palette } from "../../shared/types"
import SortableColorSquare from "../ColorSqaure/SortableColorSquare"
import EditableText from "./EditableText"
import { updatePalette } from "../../redux/colorSlice"
import { useAppDispatch } from "../../redux/store"

type Props = {
    palette: Palette
}

export default function ColorPalette({ palette }: Props) {
    const dispatch = useAppDispatch()

    const handleNameChange = (updatedName: string) => {
        dispatch(updatePalette({ ...palette, name: updatedName }))
    }

    return (
        <div>
            <h3 className="text-xl mb-2">
                <EditableText value={palette.name} onChange={handleNameChange} />
            </h3>
            <button className="bg-neutral-900 p-2 rounded hover:bg-neutral-800">
                Export
            </button>
            <SortableContext items={palette.colorList.map(color => color.id)}>
                <div className="grid grid-cols-10 gap-[0.1rem]">
                    {palette.colorList.map(color => (
                        <SortableColorSquare key={color.id} color={color} paletteId={palette.id} />
                    ))}
                </div>
            </SortableContext>
        </div>
    )
}