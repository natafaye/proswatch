import { SortableContext } from "@dnd-kit/sortable"
import { Palette } from "../../shared/types"
import SortableColorSquare from "../ColorSqaure/SortableColorSquare"
import EditableText from "./EditableText"
import { updatePalette } from "../../redux/colorSlice"
import { useAppDispatch } from "../../redux/store"
import { downloadSwatchFile } from "./downloadSwatchFile"

type Props = {
    palette: Palette
    className?: string
}

export default function ColorPalette({ palette, className }: Props) {
    const dispatch = useAppDispatch()

    const handleNameChange = (updatedName: string) => {
        dispatch(updatePalette({ ...palette, name: updatedName }))
    }

    const download = () => {
        downloadSwatchFile(palette)
    }

    return (
        <div className={className}>
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl mt-1">
                    <EditableText value={palette.name} onChange={handleNameChange} />
                </h3>
                <button className="bg-neutral-900 p-2 rounded hover:bg-neutral-800" onClick={download}>
                    ⬇️ Download
                </button>
            </div>
            <SortableContext items={palette.colorList.map(color => color.id)}>
                <div className="grid grid-cols-10 gap-[1px]">
                    {palette.colorList.map(color => (
                        <SortableColorSquare key={color.id} color={color} />
                    ))}
                </div>
            </SortableContext>
        </div>
    )
}