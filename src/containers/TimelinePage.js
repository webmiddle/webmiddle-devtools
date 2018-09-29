import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import get from "lodash/get";

import Timeline from "../components/Timeline/Timeline";
import { actionCreators as timelineActions } from "../actions/timeline";

// "0.0.0" => "0.children.0.children.0"
function toRealPath(path) {
  const pathParts = path.split(".");
  if (pathParts.length === 1) return path;
  const initialRealPath = pathParts
    .slice(0, pathParts.length - 1)
    .map(s => `${s}.children`)
    .join(".");
  const finalRealPath = pathParts[pathParts.length - 1];
  const realPath = [initialRealPath, finalRealPath].join(".");
  return realPath;
}

function getSelectedNode(state) {
  const { selectedNodePath, callState } = state.timeline;
  if (!selectedNodePath) return null;

  const realPath = toRealPath(selectedNodePath);
  const selectedNode = get(callState, realPath);
  return selectedNode;
}

function mapStateToProps(state) {
  return {
    callState: state.timeline.callState,
    selectedNode: getSelectedNode(state),
    selectedNodePath: state.timeline.selectedNodePath
  };
}

function mapDispatchToProps(dispatch) {
  return {
    timelineActions: bindActionCreators(timelineActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
