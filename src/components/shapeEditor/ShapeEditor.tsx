import { shapeRegistry } from "../../shapes";
import type { ShapeConfig } from "../../types/shape";
import FlipControls from "./FlipControls";
import RotationControls from "./RotationControls";

type ShapeEditorProps = {
  config: ShapeConfig;
  onParameterChange: (key: string, value: number) => void;
  onRotationChange: (rotation: 0 | 90 | 180 | 270) => void;
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
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Shape Editor</h2>
        <p className="text-sm text-slate-500">
          Modify dimensions and transformations for the selected shape.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="mb-3 text-sm font-medium text-slate-700">Dimensions</h3>

          <div className="space-y-3">
            {shapeDefinition.fields.map((field) => (
              <div key={field.key}>
                <label
                  htmlFor={field.key}
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  {field.label}
                  {field.unit ? ` (${field.unit})` : ""}
                </label>

                <input
                  id={field.key}
                  type="number"
                  min={field.min ?? 1}
                  value={config.parameters[field.key] ?? ""}
                  onChange={(e) =>
                    onParameterChange(field.key, Number(e.target.value))
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-900"
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