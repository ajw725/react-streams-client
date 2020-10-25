import React from 'react';
import ENV from '../env.json';

class GoogleAuth extends React.Component {
  state = { signedIn: null };
  auth;

  componentDidMount() {
    window.gapi.load('client:auth2', this.handleApiLoaded);
  }

  handleApiLoaded = async () => {
    console.log('initializing Google OAuth2 client');
    await window.gapi.client.init({
      clientId: ENV.oauth_client_id,
      scope: 'email',
    });
    this.handleClientInitialized();
  };

  handleClientInitialized = () => {
    this.auth = window.gapi.auth2.getAuthInstance();
    this.setState({ signedIn: this.auth.isSignedIn.get() });
    this.auth.isSignedIn.listen(this.handleAuthChange);
  };

  handleAuthChange = () => {
    this.setState({ signedIn: this.auth.isSignedIn.get() });
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.signedIn) {
      return (
        <button
          className="ui red google button"
          onClick={() => this.auth.signOut()}
        >
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button
          className="ui red google button"
          onClick={() => this.auth.signIn()}
        >
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

export default GoogleAuth;
