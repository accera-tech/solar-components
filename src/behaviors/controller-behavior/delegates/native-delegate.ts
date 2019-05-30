import { FrameworkDelegate } from './framework-delegate';

/**
 * The default framework delegate.
 */
export class NativeDelegate implements FrameworkDelegate {
  createComponent<E extends HTMLStencilElement>(tag: string, options): E {
    const { component, componentProps, ...props } = options;

    const element = document.createElement(tag) as E;
    if (props) {
      Object.assign(element, props);
    }

    if (component) {
      if (typeof component === 'string') {
        element.innerHTML = component;
      } else {
        // The component is a HTMLElement:
        if (componentProps) {
          Object.assign(component, componentProps);
        }
        element.appendChild(component);
      }
    }

    return element;
  }

  async attachViewToDom(domRoot: HTMLElement, element) {
    domRoot.appendChild(element);
    await element.componentOnReady();
  }

  detachViewFromDom(element: any): Promise<void> {
    return element.remove();
  }
}

export const nativeDelegate = new NativeDelegate();
