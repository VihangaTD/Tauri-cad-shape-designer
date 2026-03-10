import { RotateCw } from "lucide-react";

type RotationControlsProps = {
  rotation: 0 | 90 | 180 | 270;
  onChange: (rotation: 0 | 90 | 180 | 270) => void;
};

const ROTATIONS: Array<0 | 90 | 180 | 270> = [0, 90, 180, 270];

export default function RotationControls({
  rotation,
  onChange,
}: RotationControlsProps) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <RotateCw className="h-4 w-4 text-slate-500" />
        <h3 className="text-sm font-medium text-slate-700">Rotation</h3>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {ROTATIONS.map((value) => {
          const isActive = rotation === value;

          return (
            <button
              key={value}
              type="button"
              onClick={() => onChange(value)}
              className={[
                "rounded-xl border px-3 py-2 text-sm font-medium transition",
                isActive
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
              ].join(" ")}
            >
              {value}°
            </button>
          );
        })}
      </div>
    </div>
  );
}