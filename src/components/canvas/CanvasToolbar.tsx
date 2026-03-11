import { Eye, RotateCcw } from "lucide-react";

export default function CanvasToolbar() {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-slate-100 p-2">
          <Eye className="h-5 w-5 text-slate-700" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">Canvas Preview</h2>
          <p className="text-sm text-slate-500">
            Live shape preview rendered from backend SVG.
          </p>
        </div>
      </div>

      
    </div>
  );
}