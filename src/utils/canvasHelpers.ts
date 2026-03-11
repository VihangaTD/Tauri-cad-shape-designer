export interface CanvasSize {
  width: number;
  height: number;
}

export interface DrawImageOptions {
  padding?: number;
  backgroundColor?: string;
}

export interface FitResult {
  drawWidth: number;
  drawHeight: number;
  offsetX: number;
  offsetY: number;
  scale: number;
}

export function clearCanvas(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  backgroundColor = "#ffffff"
): void {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}

export function resizeCanvasToDisplaySize(
  canvas: HTMLCanvasElement,
  devicePixelRatio = window.devicePixelRatio || 1
): boolean {
  const displayWidth = Math.floor(canvas.clientWidth * devicePixelRatio);
  const displayHeight = Math.floor(canvas.clientHeight * devicePixelRatio);

  const needResize =
    canvas.width !== displayWidth || canvas.height !== displayHeight;

  if (needResize) {
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }

  return needResize;
}

export function calculateFit(
  canvasWidth: number,
  canvasHeight: number,
  sourceWidth: number,
  sourceHeight: number,
  padding = 24
): FitResult {
  const safeCanvasWidth = Math.max(canvasWidth - padding * 2, 1);
  const safeCanvasHeight = Math.max(canvasHeight - padding * 2, 1);

  const widthScale = safeCanvasWidth / sourceWidth;
  const heightScale = safeCanvasHeight / sourceHeight;
  const scale = Math.min(widthScale, heightScale);

  const drawWidth = sourceWidth * scale;
  const drawHeight = sourceHeight * scale;

  const offsetX = (canvasWidth - drawWidth) / 2;
  const offsetY = (canvasHeight - drawHeight) / 2;

  return {
    drawWidth,
    drawHeight,
    offsetX,
    offsetY,
    scale,
  };
}

export function drawCenteredImage(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  image: CanvasImageSource,
  imageWidth: number,
  imageHeight: number,
  options: DrawImageOptions = {}
): FitResult {
  const { padding = 24, backgroundColor = "#ffffff" } = options;

  clearCanvas(ctx, canvas, backgroundColor);

  const fit = calculateFit(
    canvas.width,
    canvas.height,
    imageWidth,
    imageHeight,
    padding
  );

  ctx.drawImage(
    image,
    fit.offsetX,
    fit.offsetY,
    fit.drawWidth,
    fit.drawHeight
  );

  return fit;
}

export function createImageFromSvg(svg: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load SVG image."));
    };

    image.src = url;
  });
}

export function getCanvas2DContext(
  canvas: HTMLCanvasElement
): CanvasRenderingContext2D {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("2D canvas context is not available.");
  }

  return ctx;
}