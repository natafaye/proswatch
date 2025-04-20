import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDefaultPalette } from "./getDefaultPalette";
import type { AppState } from "./store";
import { Color, Palette } from "../shared/types";
import { v4 as uuid } from "uuid";

const initialState = {
  paletteList: [getDefaultPalette()],
  bulkAddColorList: [{ id: uuid(), color: "" }],
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
        let oldColorList = state.paletteList.find(p => p.colorList.find(c => c.id === action.payload.dragColorId))?.colorList
        if(!oldColorList) {
          // move it from the bulk add
          oldColorList = state.bulkAddColorList
        }
        const color = oldColorList.find(c => c.id === action.payload.dragColorId)!
        const oldIndex = oldColorList.indexOf(color)

        // New palette and index
        const newColorList = state.paletteList.find(p => p.id === action.payload.dropPaletteId)?.colorList
        if(!newColorList) return
        const newIndex = action.payload.dropIndex

        oldColorList.splice(oldIndex, 1)
        newColorList.splice(newIndex, 0, color)

        // Rebalance each palette to 30
        
        if(oldColorList !== newColorList && newColorList.length > 30) {
          let swappedColor: Color | undefined
          if(newColorList[newIndex - 1]?.color === "") {
            [swappedColor] = newColorList.splice(newIndex - 1, 1)
          } else if(newColorList[newIndex + 1]?.color === "") {
            [swappedColor] = newColorList.splice(newIndex + 1, 1)
          } else if(newColorList.some(c => c.color === "")) {
            const emptyIndex = newColorList.findIndex(c => c.color === "");
            [swappedColor] = newColorList.splice(emptyIndex, 1)
          } else if(newIndex !== 29) {
            swappedColor = newColorList.pop()!
          } else {
            [swappedColor] = newColorList.splice(28, 1)
          }
          console.log(oldIndex, newIndex, swappedColor)
          oldColorList.splice(oldIndex, 0, swappedColor)
        }
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
