import { HTMLStencilElement } from '@stencil/core/internal';
import { FrameworkDelegate } from './framework-delegate';

/**
 * The default framework delegate.
 */
export class NativeDelegate implements FrameworkDelegate {
  createComponent<E extends HTMLStencilElement>(tag: string, options): E {
    const { component, componentProps, ...props } = options;

    const element = document.createElement(tag) as E;
    if (props) {
      Object.keys(props).forEach(key => {
        if (typeof props[key] === 'string') {
          element.setAttribute(key, props[key]);
        } else {
          element[key] = props[key];
        }
      });
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

  // @ts-ignore
  detachViewFromDom(element: any, props): Promise<void> {
      return element.remove();
  }
}

export const nativeDelegate = new NativeDelegate();
