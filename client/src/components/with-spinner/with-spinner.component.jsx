import React from 'react'

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';


// This is HOC (Higher Order Comopnent) - it takes a component and returns a component
const WithSpinner = WrappedComponent => {

  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (<WrappedComponent {...otherProps} />);
  }

  return Spinner;
}

export default WithSpinner; 
