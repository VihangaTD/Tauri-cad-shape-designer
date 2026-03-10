"use client";

import { useState } from "react";

import ShapeLibrary from "./components/shapeLibrary/ShapeLibrary";
import ShapeEditor from "./components/shapeEditor/ShapeEditor";
import Canvas from "./components/canvas/Canvas";

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

  const svgMarkup = `
    <svg
      width="400"
      height="300"
      viewBox="0 0 400 300"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="50"
        y="50"
        width="300"
        height="200"
        fill="none"
        stroke="black"
        stroke-width="4"
      />
    </svg>
  `;

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-slate-900">
            Tauri CAD Shape Designer
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Select a shape, edit dimensions, apply transformations, and preview
            the result.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[280px_minmax(0,1fr)_320px]">
          <ShapeLibrary
            selected={config.type}
            onSelect={handleSelectShape}
          />

          <Canvas svgMarkup={svgMarkup} />

          <ShapeEditor
            config={config}
            onParameterChange={handleParameterChange}
            onRotationChange={handleRotationChange}
            onFlipX={handleFlipX}
            onFlipY={handleFlipY}
          />
        </div>
      </div>
    </main>
  );
}