import { Link } from 'react-router-dom';
import React from 'react';

const Header = () => {
  return (
    <div className="ui sexcondary pointing menu">
      <Link to="/" className="item">
        Streamer
      </Link>
      <div className="right menu">
        <Link to="/" className="item">
          Streams
        </Link>
      </div>
    </div>
  );
};

export default Header;