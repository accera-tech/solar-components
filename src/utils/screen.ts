export interface Viewport {
  height: number;
  width: number;
}

export interface ViewBounding extends Viewport {
  x: number;
  y: number;
}

export function leftSpaceOnViewport(bounding: ViewBounding | DOMRect, viewport: Viewport) {
  return {
    top: (viewport.height - (viewport.height - bounding.y)) - bounding.height,
    left: (viewport.width - (viewport.width - bounding.x)) - bounding.width,
    right: (viewport.width - bounding.x) - bounding.width,
    bottom: (viewport.height - bounding.y) - bounding.height,
  }
}

export function leftSpaceOnWindow(bounding: ViewBounding | DOMRect) {
  return leftSpaceOnViewport(bounding, { height: window.innerHeight, width: window.innerWidth });
}
