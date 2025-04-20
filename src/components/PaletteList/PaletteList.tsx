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
        <div className={clsx("flex flex-wrap gap-4", className)}>
            {paletteList.map((palette) => (
                <ColorPalette
                    key={palette.id}
                    palette={palette}
                    className="basis-[30rem]"
                />
            ))}
            <button
                className={clsx(
                    "bg-neutral-900 hover:bg-neutral-800rounded text-xl font-bold",
                    "w-full min-h-42 basis-[30rem] p-3 pt-1 mt-2"
                )}
                onClick={() => dispatch(addPalette())}
            >
                &#43;
            </button>
        </div>
    )
}