import React from 'react';
import ReactInspector, { chromeLight } from 'react-inspector';

const Inspector = (props) => (
  <ReactInspector
    theme={{
      ...chromeLight,
      ...({ BASE_FONT_SIZE: '20px' })
    }}
    {...props}
  />
);

export default Inspector;
