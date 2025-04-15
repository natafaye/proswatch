import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDefaultPalette } from "./getDefaultPalette";
import type { AppState } from "./store";
import { Color, Palette } from "../shared/types";

const initialState = {
  paletteList: [getDefaultPalette()],
  bulkAddColorList: [] as Color[],
};

const colorSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {
    addPalette: (state) => {
      state.paletteList.push(getDefaultPalette());
    },
    updatePalette: (state, action: PayloadAction<Palette>) => {
      return {
        ...state,
        paletteList: state.paletteList.map((palette) =>
          palette.id === action.payload.id ? action.payload : palette
        ),
      };
    },
    setPaletteList: (state, action: PayloadAction<Palette[]>) => {
      state.paletteList = action.payload;
    },
    setBulkAddColors: (state, action: PayloadAction<Color[]>) => {
        state.bulkAddColorList = action.payload
    },
    moveColor: (state, action: PayloadAction<{dragColorId: string, dropPaletteId: string, dropIndex: number}>) => {
        // Old palette and index
        const oldColorList = state.paletteList.find(p => p.colorList.find(c => c.id === action.payload.dragColorId))?.colorList
        if(!oldColorList) return // TODO: handle bulk add color move
        const color = oldColorList.find(c => c.id === action.payload.dragColorId)!
        const oldIndex = oldColorList.indexOf(color)

        // New palette and index
        const newColorList = state.paletteList.find(p => p.id === action.payload.dropPaletteId)?.colorList
        if(!newColorList) return // TODO: handle bulk add color move
        const newIndex = action.payload.dropIndex

        oldColorList.splice(oldIndex, 1)
        newColorList.splice(newIndex, 0, color)
    },
  },
});

export const { addPalette, updatePalette, setPaletteList, setBulkAddColors, moveColor } = colorSlice.actions;

export const colorReducer = colorSlice.reducer;

// Selectors

export const selectAllPalettes = (state: AppState) => state.colors.paletteList;

export const selectBulkAddColors = (state: AppState) =>
  state.colors.bulkAddColorList;

export const selectColorById = (id: string | undefined) => (state: AppState) => {
  const color = state.colors.paletteList
    .flatMap((palette) => palette.colorList)
    .find((color) => color.id === id);
  if(color) return color
  return state.colors.bulkAddColorList.find((color) => color.id === id)
}
