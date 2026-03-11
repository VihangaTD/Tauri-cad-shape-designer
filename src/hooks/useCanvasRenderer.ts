import { useCallback, useEffect, useRef, useState } from "react";
import type { ShapeConfig } from "../types/shape";
import { generateSvg } from "../services/tauri/generateSvg";
import {
  createImageFromSvg,
  drawCenteredImage,
  getCanvas2DContext,
  resizeCanvasToDisplaySize,
  clearCanvas,
} from "../utils/canvasHelpers";

interface UseCanvasRendererOptions {
  shapeConfig: ShapeConfig;
}

interface UseCanvasRendererReturn {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  svg: string;
  isLoading: boolean;
  error: string | null;
  renderNow: () => Promise<void>;
}

export function useCanvasRenderer({
  shapeConfig,
}: UseCanvasRendererOptions): UseCanvasRendererReturn {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [svg, setSvg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const renderVersionRef = useRef(0);

  const renderNow = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const currentVersion = ++renderVersionRef.current;

    setIsLoading(true);
    setError(null);

    try {
      const svgString = await generateSvg(shapeConfig);

      if (currentVersion !== renderVersionRef.current) return;

      setSvg(svgString);

      const image = await createImageFromSvg(svgString);

      if (currentVersion !== renderVersionRef.current) return;

      resizeCanvasToDisplaySize(canvas);
      const ctx = getCanvas2DContext(canvas);

      drawCenteredImage(ctx, canvas, image, image.width, image.height, {
        padding: 24,
        backgroundColor: "#ffffff",
      });
    } catch (err) {
      console.error("Canvas render failed:", err);

      if (currentVersion !== renderVersionRef.current) return;

      setError(
        err instanceof Error ? err.message : "Failed to render canvas preview."
      );

      const ctx = canvas.getContext("2d");
      if (ctx) {
        clearCanvas(ctx, canvas, "#ffffff");
      }
    } finally {
      if (currentVersion === renderVersionRef.current) {
        setIsLoading(false);
      }
    }
  }, [shapeConfig]);

  useEffect(() => {
    void renderNow();
  }, [renderNow]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      void renderNow();
    };

    const observer = new ResizeObserver(() => {
      void renderNow();
    });

    observer.observe(canvas);

    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [renderNow]);

  return {
    canvasRef,
    svg,
    isLoading,
    error,
    renderNow,
  };
}

export default useCanvasRenderer;