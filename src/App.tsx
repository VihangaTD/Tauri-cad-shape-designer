"use client";

import { useState } from "react";
import ShapeLibrary from "./components/shapeLibrary/ShapeLibrary";
import { ShapeType } from "./types/shape";
import Canvas from "./components/canvas/Canvas";

export default function Page() {
  const [selectedShape, setSelectedShape] = useState<ShapeType>("rectangle");

  const handleSelectShape = (shape: ShapeType) => {
    setSelectedShape(shape);
  };

  // temporary SVG preview (until backend is connected)
  const svgMarkup = `
    <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="50" y="50" width="300" height="200" fill="none" stroke="black" stroke-width="4"/>
    </svg>
  `;

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-2xl font-bold mb-6">
          Shape Designer
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Shape Library */}
          <div className="space-y-4">
            <ShapeLibrary
              selected={selectedShape}
              onSelect={handleSelectShape}
            />

            <div className="text-sm text-gray-600">
              Selected Shape: <b>{selectedShape}</b>
            </div>
          </div>

          {/* Canvas Preview */}
          <Canvas svgMarkup={svgMarkup} />

        </div>
      </div>
    </main>
  );
}