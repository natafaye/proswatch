import BulkAddTextbox from "./components/BulkAddTextbox";
import ColorDndContext from "./components/ColorDndContext";
import PaletteList from "./components/PaletteList";

export default function App() {
  return (
    <ColorDndContext>
      <div className="flex gap-5 p-5">
        <PaletteList className="flex-grow"/>
        <div className="basis-16">
          <h3 className="text-xl mb-2">Add Colors</h3>
          <BulkAddTextbox />
        </div>
      </div>
    </ColorDndContext>
  )
}