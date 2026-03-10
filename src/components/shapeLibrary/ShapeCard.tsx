import {
  Circle,
  Pentagon,
  RectangleHorizontal,
  Shapes,
  Triangle,
} from "lucide-react";
import type { ShapeDefinition } from "../../types/shape";

type ShapeCardProps = {
  shape: ShapeDefinition;
  selected: boolean;
  onClick: () => void;
};

export default function ShapeCard({
  shape,
  selected,
  onClick,
}: ShapeCardProps) {
  const Icon = getShapeIcon(shape.type);

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full rounded-xl border p-3 text-left transition",
        selected
          ? "border-slate-900 bg-slate-900 text-white shadow-sm"
          : "border-slate-200 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <div
          className={[
            "rounded-lg p-2",
            selected ? "bg-white/10" : "bg-slate-100",
          ].join(" ")}
        >
          <Icon
            className={[
              "h-5 w-5",
              selected ? "text-white" : "text-slate-700",
            ].join(" ")}
          />
        </div>

        <div className="min-w-0">
          <div className="font-medium">{shape.label}</div>
          <div
            className={[
              "mt-1 text-xs",
              selected ? "text-slate-200" : "text-slate-500",
            ].join(" ")}
          >
            {shape.fields.map((f) => f.label).join(", ")}
          </div>
        </div>
      </div>
    </button>
  );
}

function getShapeIcon(type: ShapeDefinition["type"]) {
  switch (type) {
    case "rectangle":
      return RectangleHorizontal;
    case "circle":
      return Circle;
    case "triangle":
      return Triangle;
    case "lshape":
      return Shapes;
    case "trapezoid":
      return Pentagon;
    default:
      return Shapes;
  }
}