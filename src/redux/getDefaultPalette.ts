import type { Palette } from "../shared/types";
import { v4 as uuid } from "uuid";

export const getDefaultPalette = (): Palette => ({
  id: uuid(),
  name: "Untitled",
  colorList: Array.from({ length: 30 }, () => ({
    id: uuid(),
    color: getRandomColor(),
  }))
});

const getRandomColor = () => {
  const color = `${Math.floor(Math.random() * 16777215).toString(16)}`;
  return "#" + color.padStart(6, "0");
};
