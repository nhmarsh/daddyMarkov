import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Root from './containers/Root';

const App = () => (
  <BrowserRouter>
    <main className="container">
      <Root />
    </main>
  </BrowserRouter>
);

export default App;
