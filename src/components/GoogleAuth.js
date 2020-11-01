import React from 'react';
import { connect } from 'react-redux';

import ENV from '../env.json';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  auth;

  componentDidMount() {
    window.gapi.load('client:auth2', this.onApiLoaded);
  }

  onApiLoaded = async () => {
    console.log('initializing Google OAuth2 client');
    await window.gapi.client.init({
      clientId: ENV.oauth_client_id,
      scope: 'email',
    });
    this.onClientInitialized();
  };

  onClientInitialized = () => {
    this.auth = window.gapi.auth2.getAuthInstance();
    this.auth.isSignedIn.listen(this.onAuthChange);
    this.onAuthChange(this.auth.isSignedIn.get());
  };

  onAuthChange = (signedIn) => {
    if (signedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.signedIn === null) {
      return null;
    } else if (this.props.signedIn) {
      return (
        <button className="ui red google button" onClick={this.onSignOutClick}>
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui red google button" onClick={this.onSignInClick}>
          <i className="google icon" />
          Sign In
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = ({ auth }) => {
  return { signedIn: auth.signedIn, userId: auth.userId };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
