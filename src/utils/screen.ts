export interface Viewport {
  height: number;
  width: number;
}

export interface ViewBounding extends Viewport {
  x: number;
  y: number;
}

/**
 * Calculates the amount of space left in a viewport, assuming a box.
 * @param bounding The box that will be positioned on the viewport.
 * @param viewport The viewport definitions.
 */
export function leftSpaceOnViewport(bounding: ViewBounding | DOMRect, viewport: Viewport) {
  return {
    top: (viewport.height - (viewport.height - bounding.y)) - bounding.height,
    left: (viewport.width - (viewport.width - bounding.x)) - bounding.width,
    right: (viewport.width - bounding.x) - bounding.width,
    bottom: (viewport.height - bounding.y) - bounding.height,
  };
}

/**
 * Calculates the amount of space left in the window's viewport, assuming a box.
 * @param bounding The box that will be positioned on the window.
 */
export function leftSpaceOnWindow(bounding: ViewBounding | DOMRect) {
  return leftSpaceOnViewport(bounding, { height: window.innerHeight, width: window.innerWidth });
}
