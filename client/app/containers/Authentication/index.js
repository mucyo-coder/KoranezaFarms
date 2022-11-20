/**
 *
 * Authentication
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import actions from '../../actions';

export default function (ComposedComponent) {
  class Authentication extends React.PureComponent {
    render() {
      const { authenticated } = this.props;

      if (authenticated) {
        return <ComposedComponent {...this.props} />;
      } else {
        return <Redirect to='/login' />;
      }
    }
  }

  const mapStateToProps = state => {
    return {
      authenticated: state.authentication.authenticated
    };
  };

  return connect(mapStateToProps, actions)(Authentication);
}
