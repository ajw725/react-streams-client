import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
  componentDidMount() {
    const streamId = this.props.match.params.id;
    this.props.fetchStream(streamId);
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading stream...</div>;
    }

    const { title, description } = this.props.stream;

    return (
      <div>
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}

const mapStateToProps = ({ streams }, ownProps) => {
  const streamId = ownProps.match.params.id;
  const stream = streams[streamId];
  return { ...ownProps, stream };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
