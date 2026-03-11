import { invoke } from "@tauri-apps/api/core";
import type { ShapeConfig } from "../../types/shape";

export async function generateSvg(shapeConfig: ShapeConfig): Promise<string> {
  try {
    const svg = await invoke<string>("generate_svg", {
      shape: shapeConfig,
    });

    if (!svg || typeof svg !== "string") {
      throw new Error("Invalid SVG response from backend.");
    }

    return svg;
  } catch (error) {
    console.error("Failed to generate SVG:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to generate SVG."
    );
  }
}