import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  editStream(streamId) {
    // TODO
    console.log('editing stream', streamId);
  }

  renderStreamActions(stream) {
    if (!stream.userId || stream.userId !== this.props.userId) {
      return;
    }

    return (
      <div className="right floated content">
        <button className="ui button primary">Edit</button>
        <button className="ui button negative">Delete</button>
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
            {stream.title}
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
