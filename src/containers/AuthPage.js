import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Auth from "../components/Auth/Auth";
import { actionCreators as authActions } from "../actions/auth";

function mapStateToProps(state) {
  return {
    server: state.server
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
