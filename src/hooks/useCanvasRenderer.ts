import { useCallback, useEffect, useRef, useState } from "react";
import type { ShapeConfig } from "../types/shape";
import { generateSvg } from "../services/tauri/generateSvg";
import {
  clearCanvas,
  createImageFromSvg,
  drawCenteredImage,
  drawPlaceholder,
  getCanvas2DContext,
  resizeCanvasToDisplaySize,
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
    setSvg("");

    try {
      resizeCanvasToDisplaySize(canvas);
      const ctx = getCanvas2DContext(canvas);
      clearCanvas(ctx, canvas, "#ffffff");

      const svgString = await generateSvg(shapeConfig);

      if (currentVersion !== renderVersionRef.current) return;

      setSvg(svgString);

      const image = await createImageFromSvg(svgString);

      if (currentVersion !== renderVersionRef.current) return;

      resizeCanvasToDisplaySize(canvas);

      drawCenteredImage(ctx, canvas, image, image.width, image.height, {
        padding: 24,
        backgroundColor: "#ffffff",
      });
    } catch (err) {
      console.error("Canvas render failed:", err);

      if (currentVersion !== renderVersionRef.current) return;

      const message =
        err instanceof Error ? err.message : "Failed to render canvas preview.";

      setError(message);

      const ctx = canvas.getContext("2d");
      if (ctx) {
        resizeCanvasToDisplaySize(canvas);
        clearCanvas(ctx, canvas, "#ffffff");
        drawPlaceholder(
          ctx,
          canvas.width,
          canvas.height,
          "Preview render failed"
        );
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

    const observer = new ResizeObserver(() => {
      void renderNow();
    });

    const handleResize = () => {
      void renderNow();
    };

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