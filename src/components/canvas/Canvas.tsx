import CanvasToolbar from "./CanvasToolbar";
import CanvasViewport from "./CanvasViewport";

type CanvasProps = {
  svgMarkup: string | null;
  width?: number;
  height?: number;
};

export default function Canvas({
  svgMarkup,
  width = 900,
  height = 600,
}: CanvasProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <CanvasToolbar />

      <div className="mt-4">
        <CanvasViewport
          svgMarkup={svgMarkup}
          width={width}
          height={height}
        />
      </div>
    </section>
  );
}