import { useEffect, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Monitor } from "lucide-react";

type CanvasViewportProps = {
  svgMarkup: string | null;
  width?: number;
  height?: number;
};

type RenderStatus = "idle" | "rendering" | "ready" | "error";

export default function CanvasViewport({
  svgMarkup,
  width = 900,
  height = 600,
}: CanvasViewportProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [status, setStatus] = useState<RenderStatus>("idle");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (!svgMarkup) {
      setStatus("idle");
      drawPlaceholder(context, canvas.width, canvas.height, "No preview available");
      return;
    }

    let disposed = false;
    setStatus("rendering");

    const blob = new Blob([svgMarkup], {
      type: "image/svg+xml;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const image = new Image();

    image.onload = () => {
      if (disposed) return;

      context.clearRect(0, 0, canvas.width, canvas.height);

      const fitted = getContainSize(
        image.width || canvas.width,
        image.height || canvas.height,
        canvas.width,
        canvas.height
      );

      const dx = (canvas.width - fitted.width) / 2;
      const dy = (canvas.height - fitted.height) / 2;

      context.drawImage(image, dx, dy, fitted.width, fitted.height);
      setStatus("ready");
      URL.revokeObjectURL(url);
    };

    image.onerror = () => {
      if (disposed) return;

      context.clearRect(0, 0, canvas.width, canvas.height);
      drawPlaceholder(context, canvas.width, canvas.height, "Preview render failed");
      setStatus("error");
      URL.revokeObjectURL(url);
    };

    image.src = url;

    return () => {
      disposed = true;
      URL.revokeObjectURL(url);
    };
  }, [svgMarkup]);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Monitor className="h-4 w-4 text-slate-500" />
          <span className="text-sm font-medium text-slate-700">Workspace</span>
        </div>

        <StatusBadge status={status} />
      </div>

      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="block h-auto w-full"
      />
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

function getContainSize(
  sourceWidth: number,
  sourceHeight: number,
  maxWidth: number,
  maxHeight: number
) {
  const sourceRatio = sourceWidth / sourceHeight;
  const targetRatio = maxWidth / maxHeight;

  if (sourceRatio > targetRatio) {
    return {
      width: maxWidth,
      height: maxWidth / sourceRatio,
    };
  }

  return {
    width: maxHeight * sourceRatio,
    height: maxHeight,
  };
}

function drawPlaceholder(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  message: string
) {
  context.fillStyle = "#f8fafc";
  context.fillRect(0, 0, width, height);

  context.strokeStyle = "#cbd5e1";
  context.lineWidth = 1;
  context.strokeRect(16, 16, width - 32, height - 32);

  context.fillStyle = "#64748b";
  context.font = "16px sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(message, width / 2, height / 2);
}