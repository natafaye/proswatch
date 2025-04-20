import { Ref } from "react"
import type { Color } from "../../shared/types"
import SortableColorSquare from "../ColorSqaure/SortableColorSquare"

type Props = {
    value: string
    color: Color
    inputRef: Ref<HTMLInputElement>
    onChange: (newValue: string) => void
    onColorFinish: () => void
}
export default function ColorInput({ value, color, inputRef, onChange, onColorFinish }: Props) {
    return (
        <div className="flex items-center gap-1">
            {/* <div className="w-7 h-7 me-1" style={{ backgroundColor: color.color || "black" }} /> */}
            <SortableColorSquare color={color} className="w-7 h-7 me-1"/>
            <span className="text-xl">#</span>
            <input type="text"
                ref={inputRef}
                className="bg-neutral-900 text-xl p-1"
                value={value}
                maxLength={6}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onColorFinish()}
            />
        </div>
    )
}