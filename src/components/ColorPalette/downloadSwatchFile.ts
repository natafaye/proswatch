import type { Palette } from "../../shared/types";
import { createSwatchesFile } from "procreate-swatches"
import { convertHexToRgbArray } from "./convertHexToRgbArray";

export const downloadSwatchFile = async (palette: Palette) => {
    // Make the file
    const swatchesBuffer = await createSwatchesFile(
        palette.name, 
        palette.colorList.map(c => c.color ? [convertHexToRgbArray(c.color), "rgb"] : null)
    )
    const blob = new Blob([swatchesBuffer], { type: "swatches" })

    // Download it
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = palette.name + ".swatches"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}