import React from 'react';
import { connect } from 'react-redux';
import history from '../../history';
import Modal from '../Modal';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {
  componentDidMount() {
    const streamId = this.props.match.params.id;
    this.props.fetchStream(streamId);
  }

  modalContent() {
    if (!this.props.stream) {
      return 'Are you sure you want to delete this stream?';
    }

    return `Are you sure you want to delete stream "${this.props.stream.title}"?`;
  }

  deleteStream = () => {
    const streamId = this.props.match.params.id;
    this.props.deleteStream(streamId);
  };

  renderActions() {
    return (
      <>
        <button className="ui button" onClick={() => history.push('/')}>
          Cancel
        </button>
        <button className="ui button negative" onClick={this.deleteStream}>
          Delete
        </button>
      </>
    );
  }

  render() {
    return (
      <div>
        <h2>Delete Stream</h2>
        <Modal
          title="Delete Stream"
          body={this.modalContent()}
          actions={this.renderActions()}
          onDismiss={() => history.push('/')}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ streams }, ownProps) => {
  const streamId = ownProps.match.params.id;
  const stream = streams[streamId];
  return { ...ownProps, stream };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
