"use client";

import { useState } from "react";

import ShapeLibrary from "./components/shapeLibrary/ShapeLibrary";
import ShapeEditor from "./components/shapeEditor/ShapeEditor";
import Canvas from "./components/canvas/Canvas";
import ExportPanel from "./components/exportPanel/ExportPanel";

import { shapeRegistry } from "./shapes";
import type { ShapeConfig, ShapeType } from "./types/shape";

export default function Page() {
  const [config, setConfig] = useState<ShapeConfig>({
    type: "rectangle",
    parameters: { ...shapeRegistry.rectangle.defaultParameters },
    rotation: 0,
    flipX: false,
    flipY: false,
  });

  const [isExporting] = useState(false);

  const handleSelectShape = (shape: ShapeType) => {
    setConfig({
      type: shape,
      parameters: { ...shapeRegistry[shape].defaultParameters },
      rotation: 0,
      flipX: false,
      flipY: false,
    });
  };

  const handleParameterChange = (key: string, value: number) => {
    setConfig((prev) => ({
      ...prev,
      parameters: {
        ...prev.parameters,
        [key]: value,
      },
    }));
  };

  const handleRotationChange = (rotation: 0 | 90 | 180 | 270) => {
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

  const svgMarkup = `
    <svg
      width="500"
      height="350"
      viewBox="0 0 500 350"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="80"
        y="70"
        width="340"
        height="210"
        fill="none"
        stroke="#0f172a"
        stroke-width="4"
      />
    </svg>
  `;

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
            <Canvas svgMarkup={svgMarkup} />
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
                isDisabled={!svgMarkup}
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