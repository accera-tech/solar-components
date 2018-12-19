import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function syncEvent(node, eventName, newEventHandler) {
  const eventNameLc = eventName[0].toLowerCase() + eventName.substring(1);
  const eventStore = node.__events || (node.__events = {});
  const oldEventHandler = eventStore[eventNameLc];

  // Remove old listener so they don't double up.
  if (oldEventHandler) {
    node.removeEventListener(eventNameLc, oldEventHandler);
  }

  // Bind new listener.
  if (newEventHandler) {
    node.addEventListener(eventNameLc, eventStore[eventNameLc] = function handler(e) {
      newEventHandler.call(this, e);
    });
  }
}

/**
 * Use a webcomponent from solar-components.
 */
export class SolarComponent extends Component {
  
  componentWillReceiveProps(props) {
    const node = ReactDOM.findDOMNode(this);
    const { component, ...attributes } = this.props;
    this.attributes = attributes;

    if (node == null) return;

    Object.keys(attributes).forEach(name => {
      if (name === 'children' || name === 'style') {
        return;
      }

      if (name.indexOf('on') === 0 && name[2] === name[2].toUpperCase()) {
        syncEvent(node, name.substring(2), props[name]);
      } else {
        node[name] = props[name];
      }
    });
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  render() {
    const { component, children, className, ...attributes } = this.props;
    attributes.class = className || attributes.class; // bypass class HTML attribute

    return React.createElement(component, attributes, children);
  }
}
