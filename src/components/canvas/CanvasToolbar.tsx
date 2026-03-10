export default function CanvasToolbar() {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Canvas Preview</h2>
        <p className="text-sm text-slate-500">
          Live shape preview rendered from backend SVG.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Reset View
        </button>
      </div>
    </div>
  );
}