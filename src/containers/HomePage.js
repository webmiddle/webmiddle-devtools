import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Home from "../components/Home/Home";
import { actionCreators as authActions } from "../actions/auth";
import { actionCreators as serverActions } from "../actions/server";

function mapStateToProps(state) {
  return {
    server: state.server
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    serverActions: bindActionCreators(serverActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
