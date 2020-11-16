import React from 'react';
import PropTypes from 'prop-types';

const ValidateError = function(props) {
   return <div className='error-message'>{props.message}</div>
}

ValidateError.propTypes = {
  message: PropTypes.string,
}

export default ValidateError;