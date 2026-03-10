type FlipControlsProps = {
  flipX: boolean;
  flipY: boolean;
  onFlipX: () => void;
  onFlipY: () => void;
};

export default function FlipControls({
  flipX,
  flipY,
  onFlipX,
  onFlipY,
}: FlipControlsProps) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-medium text-slate-700">Flip</h3>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onFlipX}
          className={[
            "rounded-lg border px-3 py-2 text-sm font-medium transition",
            flipX
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
          ].join(" ")}
        >
          Flip X
        </button>

        <button
          type="button"
          onClick={onFlipY}
          className={[
            "rounded-lg border px-3 py-2 text-sm font-medium transition",
            flipY
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
          ].join(" ")}
        >
          Flip Y
        </button>
      </div>
    </div>
  );
}