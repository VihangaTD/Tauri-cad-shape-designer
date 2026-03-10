import { Shapes } from "lucide-react";
import { shapes } from "../../shapes";
import ShapeCard from "./ShapeCard";
import type { ShapeType } from "../../types/shape";

type ShapeLibraryProps = {
  selected: ShapeType;
  onSelect: (shape: ShapeType) => void;
};

export default function ShapeLibrary({
  selected,
  onSelect,
}: ShapeLibraryProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-start gap-3">
        <div className="rounded-lg bg-slate-100 p-2">
          <Shapes className="h-5 w-5 text-slate-700" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">Shape Library</h2>
          <p className="text-sm text-slate-500">
            Select a predefined shape to start designing.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {shapes.map((shape) => (
          <ShapeCard
            key={shape.type}
            shape={shape}
            selected={selected === shape.type}
            onClick={() => onSelect(shape.type)}
          />
        ))}
      </div>
    </section>
  );
}