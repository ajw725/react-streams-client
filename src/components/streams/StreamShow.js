import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const streamId = this.props.match.params.id;
    this.props.fetchStream(streamId);
    this.initializePlayer();
  }

  componentDidUpdate() {
    this.initializePlayer();
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.destroy();
    }
  }

  initializePlayer() {
    if (this.player || !this.props.stream) {
      return;
    }

    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${this.props.stream.id}.flv`,
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
    // this.player.play();
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading stream...</div>;
    }

    const { title, description } = this.props.stream;

    return (
      <div>
        <video ref={this.videoRef} style={{ width: '100%' }} controls />
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
