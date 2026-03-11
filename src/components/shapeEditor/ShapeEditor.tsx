import { Settings2, Ruler } from "lucide-react";
import RotationControls from "./RotationControls";
import FlipControls from "./FlipControls";
import { shapeRegistry } from "../../shapes";
import type { RotationAngle, ShapeConfig } from "../../types/shape";

type ShapeEditorProps = {
  config: ShapeConfig;
  onParameterChange: (key: string, value: number) => void;
  onRotationChange: (rotation: RotationAngle) => void;
  onFlipX: () => void;
  onFlipY: () => void;
};

export default function ShapeEditor({
  config,
  onParameterChange,
  onRotationChange,
  onFlipX,
  onFlipY,
}: ShapeEditorProps) {
  const shapeDefinition = shapeRegistry[config.type];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-start gap-3">
        <div className="rounded-lg bg-slate-100 p-2">
          <Settings2 className="h-5 w-5 text-slate-700" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">Shape Editor</h2>
          <p className="text-sm text-slate-500">
            Modify dimensions and transformations for the selected shape.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Ruler className="h-4 w-4 text-slate-500" />
            <h3 className="text-sm font-medium text-slate-700">Dimensions</h3>
          </div>

          <div className="space-y-3">
            {shapeDefinition.fields.map((field) => (
              <div key={field.key}>
                <label
                  htmlFor={field.key}
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  {field.label}
                  {field.unit ? ` (${field.unit})` : ""}
                </label>

                <input
                  id={field.key}
                  type="number"
                  min={field.min ?? 0}
                  max={field.max}
                  step={field.step ?? 1}
                  value={config.parameters[field.key] ?? ""}
                  onChange={(e) =>
                    onParameterChange(field.key, Number(e.target.value))
                  }
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-900"
                />
              </div>
            ))}
          </div>
        </div>

        <RotationControls
          rotation={config.rotation}
          onChange={onRotationChange}
        />

        <FlipControls
          flipX={config.flipX}
          flipY={config.flipY}
          onFlipX={onFlipX}
          onFlipY={onFlipY}
        />
      </div>
    </section>
  );
}