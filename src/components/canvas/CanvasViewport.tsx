import { AlertCircle, CheckCircle2, Loader2, Monitor } from "lucide-react";
import { useCanvasRenderer } from "../../hooks/useCanvasRenderer";
import type { ShapeConfig } from "../../types/shape";

type CanvasViewportProps = {
  shapeConfig: ShapeConfig;
  width?: number;
  height?: number;
};

type RenderStatus = "idle" | "rendering" | "ready" | "error";

export default function CanvasViewport({
  shapeConfig,
  width = 900,
  height = 600,
}: CanvasViewportProps) {
  const { canvasRef, svg, isLoading, error } = useCanvasRenderer({
    shapeConfig,
  });

  const status: RenderStatus = error
    ? "error"
    : isLoading
    ? "rendering"
    : svg
    ? "ready"
    : "idle";

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Monitor className="h-4 w-4 text-slate-500" />
          <span className="text-sm font-medium text-slate-700">Workspace</span>
        </div>

        <StatusBadge status={status} />
      </div>

      <div style={{ width: "100%", height }}>
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="block h-full w-full"
        />
      </div>

      {error && (
        <div className="border-t border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-700">
          {error}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: RenderStatus }) {
  if (status === "rendering") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
        Rendering
      </span>
    );
  }

  if (status === "ready") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Ready
      </span>
    );
  }

  if (status === "error") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700">
        <AlertCircle className="h-3.5 w-3.5" />
        Error
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
      <Monitor className="h-3.5 w-3.5" />
      Idle
    </span>
  );
}