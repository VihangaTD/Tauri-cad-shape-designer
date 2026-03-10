"use client";

import { useState } from "react";
import ShapeLibrary from "./components/ShapeLibrary";
import { ShapeType } from "./types/shape";

export default function Page() {
  const [selectedShape, setSelectedShape] = useState<ShapeType>("rectangle");

  const handleSelectShape = (shape: ShapeType) => {
    setSelectedShape(shape);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Shape Designer</h1>

        <ShapeLibrary
          selected={selectedShape}
          onSelect={handleSelectShape}
        />

        <div className="text-sm text-gray-600">
          Selected Shape: <b>{selectedShape}</b>
        </div>
      </div>
    </main>
  );
}