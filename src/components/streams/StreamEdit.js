import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, updateStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
  componentDidMount() {
    const streamId = this.props.match.params.id;
    this.props.fetchStream(streamId);
  }

  onSubmit = (formData) => {
    this.props.updateStream(this.props.stream.id, formData);
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading stream...</div>;
    }

    return (
      <div>
        <h3>Edit Stream: {this.props.stream.title}</h3>
        <StreamForm
          initialValues={_.pick(this.props.stream, 'title', 'description')}
          onSubmit={this.onSubmit}
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

export default connect(mapStateToProps, { fetchStream, updateStream })(
  StreamEdit
);
