import React from "react";
import PropTypes from "prop-types";
import { Route, Link as RouterLink } from "react-router-dom";
import cn from "classnames";

const Link = ({ children, to, activeOnlyWhenExact, className, disabled }) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match }) => (
      <div className={cn(className, { active: match, disabled })}>
        <RouterLink to={to}>
          {typeof children === "function" ? children({ match }) : children}
        </RouterLink>
      </div>
    )}
  />
);

Link.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  to: PropTypes.string.isRequired,
  activeOnlyWhenExact: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool
};

Link.defaultProps = {
  activeOnlyWhenExact: false,
  className: "",
  disabled: false
};

export default Link;
