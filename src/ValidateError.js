import React from 'react';
import PropTypes from 'prop-types';

const ValidateError = function(props) {
   return <div>{props.message}</div>
}

ValidateError.propTypes = {
  message: PropTypes.string,
}

export default ValidateError;