import React from 'react';
import ReactInspector, {
  chromeLight, ObjectRootLabel, ObjectLabel, ObjectValue
} from 'react-inspector';

const nodeRenderer = ({
  depth,
  name,
  data,
  isNonenumerable,
  expanded
}) => {
  return depth === 0
    ? !expanded
      ? <ObjectRootLabel name={name} data={data} />
      : <ObjectValue object={data} />
    : <ObjectLabel name={name} data={data} isNonenumerable={isNonenumerable} />;
};

const Inspector = (props) => (
  <ReactInspector
    theme={{
      ...chromeLight,
      ...({ BASE_FONT_SIZE: '20px' })
    }}
    nodeRenderer={nodeRenderer}
    {...props}
  />
);

export default Inspector;
