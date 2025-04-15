import type { Color, Palette } from "./types";

export const getColorById = (id: string, paletteList: Palette[]): Color | null => {
    for (const palette of paletteList) {
        const color = palette.colorList.find((color) => color.id === id)
        if (color) return color
    }
    return null
}