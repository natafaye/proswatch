import BulkAddInput from "./components/BulkAddInput";
import ColorDndContext from "./components/ColorDndContext";
import PaletteList from "./components/PaletteList";

export default function App() {
  return (
    <ColorDndContext>
      <div className="flex gap-5 p-5">
        <div className="basis-12">
          <h3 className="text-xl mb-2">Add Colors</h3>
          <BulkAddInput/>
        </div>
        <PaletteList className="flex-grow" />
      </div>
    </ColorDndContext>
  )
}