import { shapes } from "../../shapes";
import { ShapeType } from "../../types/shape";
import ShapeCard from "./ShapeCard";

type Props = {
  selected: ShapeType;
  onSelect: (shape: ShapeType) => void;
};

export default function ShapeLibrary({ selected, onSelect }: Props) {
  return (
    <section className="border rounded-xl bg-white p-4">
      <h2 className="font-semibold mb-4">Shape Library</h2>

      <div className="space-y-2">
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