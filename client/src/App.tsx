import React from 'react';
import { Header } from './components';

const App: React.FC = () => {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(Header)
  );
};

export default App;
