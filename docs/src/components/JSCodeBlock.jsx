import React from 'react';
import styled from 'styled-components';
import { Controlled as BaseCodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/matchbrackets';

import { theme } from './codemirrorTheme';

const defaultOptions = {
  tabSize: 2,
  lineNumbers: true,
  lineWrapping: true,
  autoCloseTags: true,
  theme: 'docz-light',
};

const Wrapper = styled('div')`
  position: relative;
  border: 1px solid #E6E6E6;
  margin-bottom: 30px;
`;

const CodeMirror = styled(BaseCodeMirror)`
  ${theme};
  position: relative;
  flex: 1;
  .CodeMirror {
    max-width: 100%;
    height: 100%;
  }
  .CodeMirror-gutters {
    left: 1px !important;
  }
  .CodeMirror-lines {
    padding: 10px 0;
    box-sizing: content-box;
  }
  .CodeMirror-line {
    padding: 0 10px;
  }
  .CodeMirror-linenumber {
    padding: 0 7px 0 5px;
  }
  pre {
    font-family: "Inconsolata",monospace;
    font-size: 1em;
    line-height: 1.8;
  }
`;

export class JSCodeBlock extends React.Component {
  state = { code: this.props.children, err: null };
  executed = false;

  componentDidMount() {
    // @TODO: Find a generic way to know if the target playground is initialized.
    document.addEventListener('stencil_componentDidLoad', () => this.run());
  }

  run() {
    if (!this.executed) {
      try {
        eval(`(function() {${this.state.code}})()`);
      } catch(err) {
        this.setState({ ...this.state, err: err.toString() })
      }
      this.executed = true;
    }
  }

  render() {
    return (
      <Wrapper>
        {this.state.err && <pre style={{ color: 'red' }}>{this.state.err}</pre>}
        <CodeMirror value={this.state.code.trim()} mode={'javascript'} options={defaultOptions} />
      </Wrapper>
    );
  }
}
