import React, { Component } from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';
import AceEditor from "react-ace";

import "brace";
import "brace/mode/text";
import "brace/mode/json";
import "brace/mode/html";
import "brace/mode/xml";

import "brace/theme/github";
import "brace/theme/monokai";
import "brace/theme/solarized_light";
import "brace/ext/language_tools";

export default class CodeEditor extends Component {
  static propTypes = {
    className: PropTypes.string,
    mode: PropTypes.string,
    id: PropTypes.string.isRequired, // must be an unique
    value: PropTypes.string,

    onChange: PropTypes.func,
  };

  static defaultProps = {
    mode: 'text',
    className: '',
    value: '',
    onChange: () => {},
  };

  onEditorLoad = (editor) => {
    editor.renderer.setOption("scrollPastEnd", true);
  };

  render() {
    const { className, id, mode, value, onChange, ...rest } = this.props;
    return (
      <AceEditor
        className={classNames('code-editor', className)}
        mode={mode}
        theme="monokai"
        name={id}
        fontSize={14}
        height="10em"
        width="100%"
        value={value}
        onLoad={this.onEditorLoad}
        onChange={onChange}
        {...rest}
      />
    );
  }
}
