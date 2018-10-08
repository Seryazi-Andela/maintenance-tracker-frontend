import React from "react";
import PropTypes from "prop-types";

const wrapper = props => {
  const { children } = props;
  return <div>{children}</div>;
};

wrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default wrapper;
