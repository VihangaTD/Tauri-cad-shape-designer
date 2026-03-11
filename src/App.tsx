"use client";

import { useState } from "react";

import ShapeLibrary from "./components/shapeLibrary/ShapeLibrary";
import ShapeEditor from "./components/shapeEditor/ShapeEditor";
import Canvas from "./components/canvas/Canvas";
import ExportPanel from "./components/exportPanel/ExportPanel";

import { getDefaultShapeConfig, shapeRegistry } from "./shapes";
import type { RotationAngle, ShapeConfig, ShapeType } from "./types/shape";

function sanitizeParameterValue(value: number, min = 0): number {
  if (!Number.isFinite(value) || Number.isNaN(value)) {
    return min;
  }

  return Math.max(min, value);
}

export default function Page() {
  const [config, setConfig] = useState<ShapeConfig>(
    getDefaultShapeConfig("rectangle")
  );

  const [isExporting] = useState(false);

  const handleSelectShape = (shape: ShapeType) => {
    setConfig(getDefaultShapeConfig(shape));
  };

  const handleParameterChange = (key: string, value: number) => {
    const field = shapeRegistry[config.type].fields.find((item) => item.key === key);
    const min = field?.min ?? 0;

    setConfig((prev) => ({
      ...prev,
      parameters: {
        ...prev.parameters,
        [key]: sanitizeParameterValue(value, min),
      },
    }));
  };

  const handleRotationChange = (rotation: RotationAngle) => {
    setConfig((prev) => ({
      ...prev,
      rotation,
    }));
  };

  const handleFlipX = () => {
    setConfig((prev) => ({
      ...prev,
      flipX: !prev.flipX,
    }));
  };

  const handleFlipY = () => {
    setConfig((prev) => ({
      ...prev,
      flipY: !prev.flipY,
    }));
  };

  const handleExportPng = () => {
    console.log("Export PNG", config);
  };

  const handleExportDetailedPng = () => {
    console.log("Export Detailed PNG", config);
  };

  const handleExportDxf = () => {
    console.log("Export DXF", config);
  };

  const handleExportDetailedDxf = () => {
    console.log("Export Detailed DXF", config);
  };

  return (
    <main className="min-h-screen bg-slate-100 p-4">
      <div className="space-y-2">
        <header className="rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Shape Designer
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Select a shape, edit dimensions, apply transformations, preview the
            result, and export the design.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-2 xl:grid-cols-[280px_minmax(0,1fr)_300px]">
          <div>
            <ShapeLibrary
              selected={config.type}
              onSelect={handleSelectShape}
            />
          </div>

          <div>
            <Canvas shapeConfig={config} />
          </div>

          <div className="space-y-2">
            <ShapeEditor
              config={config}
              onParameterChange={handleParameterChange}
              onRotationChange={handleRotationChange}
              onFlipX={handleFlipX}
              onFlipY={handleFlipY}
            />

            <div className="max-w-full">
              <ExportPanel
                isDisabled={false}
                isExporting={isExporting}
                onExportPng={handleExportPng}
                onExportDetailedPng={handleExportDetailedPng}
                onExportDxf={handleExportDxf}
                onExportDetailedDxf={handleExportDetailedDxf}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}