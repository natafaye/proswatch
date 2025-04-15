import { HTMLAttributes } from "react"
import clsx from "clsx"
import type { Color } from "../../shared/types"

type Props = HTMLAttributes<HTMLDivElement> & {
    squareColor: Color
    ref?: React.Ref<HTMLDivElement>
}

export default function ColorSquare({ 
    squareColor, ref, className, style, ...props 
}: Props) {
    return (
        <div
            style={{ backgroundColor: squareColor.color || "#171717", ...style }}
            className={clsx("aspect-square", className)}
            ref={ref}
            {...props}
        />
    )
}