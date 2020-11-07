import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from '../history';

import Header from './Header';
import StreamList from './streams/StreamList';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamShow from './streams/StreamShow';
import StreamDelete from './streams/StreamDelete';

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <Header />
        <>
          <Route path="/" exact component={StreamList} />
          <Route path="/streams/new" exact component={StreamCreate} />
          <Route path="/streams/:id/edit" exact component={StreamEdit} />
          <Route path="/streams/:id/show" exact component={StreamShow} />
          <Route path="/streams/:id/delete" exact component={StreamDelete} />
        </>
      </Router>
    </div>
  );
};

export default App;
