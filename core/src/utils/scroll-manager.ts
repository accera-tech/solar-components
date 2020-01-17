/**
 * Controls the state of scroll actions.
 * Thanks to @galambalazs.
 */
export class ScrollManager {

  static isDisabled = false;
  static isDisabledForAll: boolean;

  /**
   * A map object that list, enable/disable each keys that manipulate the scroll into the window.
   * left: 37, up: 38, right: 39, down: 40,
   * spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
   */
  static keys = {
    37: 1,
    38: 1,
    39: 1,
    40: 1,
    32: 1,
    33: 1,
    34: 1
  };

  static preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.returnValue = false;
  }

  static preventDefaultForScrollKeys(e) {
    if (ScrollManager.keys[e.keyCode]) {
      ScrollManager.preventDefault(e);
      return false;
    }
  }

  /**
   * Override the main listeners, disabling the scroll for each enabled key in `keys` object.
   * Also, set `height: 100vh` and `overflow: hidden` in the `html` element, forcing the content size to match
   * with the window.
   * @param all Disable the scroll for the browser.
   */
  static disable(all?: boolean) {
    this.isDisabled = true;
    this.isDisabledForAll = all;

    document.querySelector('html').style.height = '100vh';
    document.querySelector('html').style.overflow = 'hidden';

    if (all) {
      const preventDefault = ScrollManager.preventDefault;
      const preventDefaultForScrollKeys = ScrollManager.preventDefaultForScrollKeys;
      if (window.addEventListener) { // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
      }
      window.onwheel = preventDefault; // modern standard
      window.onmousewheel = (document as any).onmousewheel = preventDefault; // older browsers, IE
      window.ontouchmove = preventDefault; // mobile
      document.onkeydown = preventDefaultForScrollKeys;
    }
  }

  /**
   * Reset the main listeners, enabling the scroll.
   * Also reset the html element styles assigned before in `disable` function.
   */
  static enable() {
    this.isDisabled = false;
    this.isDisabledForAll = false;

    document.querySelector('html').style.height = '';
    document.querySelector('html').style.overflow = '';

    if (this.isDisabledForAll) {
      if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', ScrollManager.preventDefault, false);
      }
      window.onmousewheel = (document as any).onmousewheel = null;
      window.onwheel = null;
      window.ontouchmove = null;
      document.onkeydown = null;
    }
  }
}
