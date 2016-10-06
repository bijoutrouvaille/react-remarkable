'use strict';

import React from 'react';
import Markdown from 'remarkable';

var iterable = function (o) {
  return typeof o == 'object' && o != null;
};
var deepEqual = function (a, b) {
  if (!iterable(a) || !iterable(b)) return a === b;
  for (var key in a) if (a.hasOwnProperty(key)) if (!deepEqual(a[k], b[k])) return false;
  return true;
};

var Remarkable = React.createClass({
  displayName: 'Remarkable',


  getDefaultProps() {
    return {
      container: 'div',
      options: {}
    };
  },

  render() {
    var Container = this.props.container;

    return React.createElement(
      Container,
      null,
      this.content()
    );
  },

  componentWillUpdate(nextProps, nextState) {
    if (!deepEqual(nextProps.options, this.props.options) || !deepEqual(nextProps.plugins, this.props.plugins)) {
      this.createMd(nextProps);
    }
  },

  content() {
    if (this.props.source) {
      return React.createElement('span', { dangerouslySetInnerHTML: { __html: this.renderMarkdown(this.props.source) } });
    } else {
      return React.Children.map(this.props.children, child => {
        if (typeof child === 'string') {
          return React.createElement('span', { dangerouslySetInnerHTML: { __html: this.renderMarkdown(child) } });
        } else {
          return child;
        }
      });
    }
  },
  createMd(props) {
    this.md = new Markdown(props.options);
    if (props.plugins) props.plugins.forEach(plugin => this.md.use(plugin));
  },

  renderMarkdown(source) {
    if (!this.md) {
      this.createMd(this.props);
    }

    return this.md.render(source);
  }

});

export default Remarkable;