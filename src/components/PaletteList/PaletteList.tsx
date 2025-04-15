import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import { addPalette, selectAllPalettes } from "../../redux/colorSlice";
import ColorPalette from "../ColorPalette";
import clsx from "clsx";

type Props = {
    className?: string
}

export default function PaletteList({ className }: Props) {
    const paletteList = useSelector(selectAllPalettes);
    const dispatch = useAppDispatch();
    return (
        <div className={clsx("flex flex-col gap-4", className)}>
            {paletteList.map((palette) => (
                <ColorPalette
                    key={palette.id}
                    palette={palette}
                />
            ))}
            <button
                className="bg-neutral-900 p-3 pt-1 hover:bg-neutral-800 mt-2 text-xl font-bold rounded"
                onClick={() => dispatch(addPalette())}
            >
                &#43;
            </button>
        </div>
    )
}