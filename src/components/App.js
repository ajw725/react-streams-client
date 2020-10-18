import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

const PageOne = () => {
  return (
    <div>
      <h2>Page One</h2>
      <Link to="/two">Go to page two</Link>
    </div>
  );
};

const PageTwo = () => {
  return (
    <div>
      <h2>Page Two</h2>
      <Link to="/">Go to page one</Link>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <>
          <Route path="/" exact component={PageOne} />
          <Route path="/two" component={PageTwo} />
        </>
      </BrowserRouter>
    </div>
  );
};

export default App;
