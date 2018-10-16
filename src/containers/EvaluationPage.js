import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Evaluation from "../components/Evaluation/Evaluation";
import { actionCreators as serverActions } from "../actions/server";

function mapStateToProps(state) {
  return {
    server: state.server,
    logger: state.logger
  };
}

function mapDispatchToProps(dispatch) {
  return {
    serverActions: bindActionCreators(serverActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Evaluation);
