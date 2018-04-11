import React from "react";
import PropTypes from 'prop-types';
import {
  Route,
  Link as RouterLink
} from "react-router-dom";

const Link = ({ children, to, activeOnlyWhenExact, className }) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match }) => (
      <div className={className + (match ? " active" : "")}>
        <RouterLink to={to}>{typeof children === 'function' ? children({ match }) : children}</RouterLink>
      </div>
    )}
  />
);

Link.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  to: PropTypes.string.isRequired,
  activeOnlyWhenExact: PropTypes.bool,
  className: PropTypes.string,
};

Link.defaultProps = {
  activeOnlyWhenExact: false,
  className: '',
};

export default Link;
