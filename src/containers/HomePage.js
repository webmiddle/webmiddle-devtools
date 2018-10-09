import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Home from "../components/Home/Home";
import { actionCreators as serverActions } from "../actions/server";
import { actionCreators as authActions } from "../actions/auth";

function mapStateToProps(state) {
  return {
    server: state.server,
    logger: state.logger
  };
}

function mapDispatchToProps(dispatch) {
  return {
    serverActions: bindActionCreators(serverActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
