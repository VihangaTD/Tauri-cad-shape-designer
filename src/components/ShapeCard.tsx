import { ShapeDefinition } from "../types/shape";

type Props = {
  shape: ShapeDefinition;
  selected: boolean;
  onClick: () => void;
};

export default function ShapeCard({ shape, selected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-full border rounded p-3 text-left ${
        selected ? "bg-black text-white" : "hover:bg-gray-50"
      }`}
    >
      <div className="font-medium">{shape.label}</div>
      <div className="text-xs opacity-70">
        {shape.fields.map((f) => f.label).join(", ")}
      </div>
    </button>
  );
}