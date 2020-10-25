import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import StreamList from './StreamList';
import StreamCreate from './StreamCreate';
import StreamEdit from './StreamEdit';
import StreamShow from './StreamShow';
import StreamDelete from './StreamDelete';

const App = () => {
  return (
    <div className="ui container">
      <BrowserRouter>
        <Header />
        <>
          <Route path="/" exact component={StreamList} />
          <Route path="/streams/new" component={StreamCreate} />
          <Route path="/streams/edit" component={StreamEdit} />
          <Route path="/streams/show" component={StreamShow} />
          <Route path="/streams/delete" component={StreamDelete} />
        </>
      </BrowserRouter>
    </div>
  );
};

export default App;
