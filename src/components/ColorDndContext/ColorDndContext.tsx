import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, KeyboardSensor, MouseSensor, TouchSensor, UniqueIdentifier, useSensor, useSensors } from "@dnd-kit/core"
import { useEffect, useRef, useState } from "react"
import ColorSquare from "../ColorSqaure"
import { multipleContainersKeyboardCoordinateGetter } from "./multipleContainersKeyboardCoordinates"
import { useMultipleContainersCollisionDetection } from "./useMultipleContainersCollisionDetection"
import { Palette } from "../../shared/types"
import { useSelector } from "react-redux"
import { moveColor, selectAllPalettes, selectColorById, setPaletteList } from "../../redux/colorSlice"
import { useAppDispatch } from "../../redux/store"

type Props = {
  children: React.ReactNode
}

export default function ColorDndContext({ children }: Props) {
  const paletteList = useSelector(selectAllPalettes)
  // Save a copy of the paletteList to restore it in case of drag cancel
  const [clonedPaletteList, setClonedPaletteList] = useState<Palette[] | null>(null)

  // Actively dragged color
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const activeColor = useSelector(selectColorById(activeId?.toString()))

  const dispatch = useAppDispatch()

  // Collision Detection & Sensors
  const lastOverId = useRef<UniqueIdentifier | null>(null)
  const recentlyMovedToNewContainer = useRef(false)
  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [paletteList])
  const collisionDetection = useMultipleContainersCollisionDetection({
    activeId, paletteList, lastOverId, recentlyMovedToNewContainer
  })
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: multipleContainersKeyboardCoordinateGetter })
  )

  // Event handlers

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveId(active?.id.toString() || null)
    setClonedPaletteList(paletteList)
  }

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (over === null || over === undefined || activeId === null) return

    // Get the palette it's over
    const dropPalette = paletteList.find(p => p.id === over.id.toString()
      || p.colorList.some(c => c.id === over.id.toString()))
    if (!dropPalette) return

    // Figure out where to put the color in the palette
    let dropIndex: number
    if (over.id.toString() === dropPalette.id) {
      // If it's over a palette, put it on the end
      dropIndex = dropPalette.colorList.length + 1
    } else {
      // If it's over a color square, decide whether to put it above or below by the mouse location
      const overIndex = dropPalette.colorList.findIndex(c => c.id === over.id.toString())
      const isBelowOverItem =
        over &&
        active.rect.current.translated &&
        active.rect.current.translated.top >
        over.rect.top + over.rect.height;
      const modifier = isBelowOverItem ? 1 : 0;
      dropIndex = overIndex >= 0 ? overIndex + modifier : dropPalette.colorList.length + 1;
    }

    recentlyMovedToNewContainer.current = true

    dispatch(moveColor({
      dragColorId: active.id.toString(),
      dropPaletteId: dropPalette.id,
      dropIndex
    }))
  }

  const handleDragCancel = () => {
    if (clonedPaletteList) dispatch(setPaletteList(clonedPaletteList))
    setActiveId(null)
  }

  const handleDragEnd = () => {
    setActiveId(null)
    setClonedPaletteList(null)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      {children}
      <DragOverlay>
        {activeColor &&
          <ColorSquare squareColor={activeColor} className="border-white border" />
        }
      </DragOverlay>
    </DndContext>
  )
}