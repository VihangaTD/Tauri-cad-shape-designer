import {
  Download,
  FileImage,
  FileCog,
  FileOutput,
  Loader2,
} from "lucide-react";

type ExportPanelProps = {
  isDisabled?: boolean;
  isExporting?: boolean;
  onExportPng: () => void;
  onExportDetailedPng: () => void;
  onExportDxf: () => void;
  onExportDetailedDxf: () => void;
};

export default function ExportPanel({
  isDisabled = false,
  isExporting = false,
  onExportPng,
  onExportDetailedPng,
  onExportDxf,
  onExportDetailedDxf,
}: ExportPanelProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <Download className="h-4 w-4 text-slate-700" />
        <h2 className="text-sm font-semibold text-slate-800">Export</h2>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <ExportButton
          label="PNG"
          icon={<FileImage size={14} />}
          onClick={onExportPng}
          disabled={isDisabled || isExporting}
        />

        <ExportButton
          label="PNG+"
          icon={<FileCog size={14} />}
          onClick={onExportDetailedPng}
          disabled={isDisabled || isExporting}
        />

        <ExportButton
          label="DXF"
          icon={<FileOutput size={14} />}
          onClick={onExportDxf}
          disabled={isDisabled || isExporting}
        />

        <ExportButton
          label="DXF+"
          icon={<FileCog size={14} />}
          onClick={onExportDetailedDxf}
          disabled={isDisabled || isExporting}
        />
      </div>

      {isExporting && (
        <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
          <Loader2 className="h-3 w-3 animate-spin" />
          Exporting...
        </div>
      )}
    </section>
  );
}

type ExportButtonProps = {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

function ExportButton({
  label,
  icon,
  onClick,
  disabled = false,
}: ExportButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex items-center justify-center gap-1 rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {icon}
      {label}
    </button>
  );
}