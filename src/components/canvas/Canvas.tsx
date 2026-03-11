import CanvasToolbar from "./CanvasToolbar";
import CanvasViewport from "./CanvasViewport";
import type { ShapeConfig } from "../../types/shape";

type CanvasProps = {
  shapeConfig: ShapeConfig;
  width?: number;
  height?: number;
};

export default function Canvas({
  shapeConfig,
  width = 900,
  height = 600,
}: CanvasProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <CanvasToolbar />

      <div className="mt-4">
        <CanvasViewport
          shapeConfig={shapeConfig}
          width={width}
          height={height}
        />
      </div>
    </section>
  );
}