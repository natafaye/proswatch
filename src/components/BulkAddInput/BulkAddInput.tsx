import { useEffect, useRef, useState } from "react"
import ColorInput from "./ColorInput"
import { parseHexCode } from "./parseHexCode"
import { useAppDispatch } from "../../redux/store"
import { selectBulkAddColors, setBulkAddColors } from "../../redux/colorSlice"
import { useSelector } from "react-redux"
import { v4 as uuid } from "uuid"

export default function BulkAddTextbox() {
  const [stringValues, setStringValues] = useState<string[]>([""])
  const inputRefs = useRef<HTMLInputElement[]>([])

  const colors = useSelector(selectBulkAddColors)

  const dispatch = useAppDispatch()

  useEffect(() => {
    // If a color is dragged out of the bulk add color list
    setStringValues(stringValues.map((string, index) =>
      // Map each string to itself, unless the string doesn't match the color
      parseHexCode(string) !== colors[index]?.color
        ? colors[index]?.color.replace("#", "") || ""
        : string
    ))
  }, [colors])

  const handleColorUpdate = (index: number, newValue: string) => {
    let colorToAdd = []
    if (index === stringValues.length - 1 && newValue !== "") {
      colorToAdd.push({
        id: uuid(),
        color: ""
      })
    }
    setStringValues(stringValues
      .map((value, i) => i === index ? newValue : value)
      .concat(colorToAdd.length ? [""] : [])
    )
    dispatch(setBulkAddColors(colors
      .map((color, i) => i !== index ? color : ({
        ...color,
        color: parseHexCode(newValue)
      }))
      .concat(colorToAdd))
    )
  }

  const goToNextLine = (index: number) => {
    if (index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus()
    }
  }

  return (
    <div className="flex flex-col gap-1">
      {stringValues.map((value, index) => (
        <ColorInput
          inputRef={(node) => { node && (inputRefs.current[index] = node) }}
          key={index}
          value={value}
          color={colors[index]}
          onChange={(newValue) => handleColorUpdate(index, newValue)}
          onColorFinish={() => goToNextLine(index)}
        />
      ))}
    </div>
  )
}