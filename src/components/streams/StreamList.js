import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../../history';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderStreamActions(stream) {
    if (!stream.userId || stream.userId !== this.props.userId) {
      return;
    }

    return (
      <div className="right floated content">
        <Link to={`/streams/${stream.id}/edit`} className="ui button primary">
          Edit Stream
        </Link>
        <Link
          to={`/streams/${stream.id}/delete`}
          className="ui button negative"
        >
          Delete
        </Link>
      </div>
    );
  }

  renderStreams() {
    return this.props.streams.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {this.renderStreamActions(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/streams/${stream.id}`} className="header">
              {stream.title}
            </Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  renderCreateButton() {
    if (!this.props.signedIn) {
      return;
    }

    console.log('signed in');
    return (
      <div style={{ textAlign: 'right' }}>
        <Link to="/streams/new" className="ui button primary">
          Create Stream
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h2>Stream List</h2>
        <div className="ui celled list">{this.renderStreams()}</div>
        {this.renderCreateButton()}
      </div>
    );
  }
}

const mapStateToProps = ({ streams, auth }) => {
  return { streams: Object.values(streams), ...auth };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
