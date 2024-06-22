import React from 'react';
import Home from './Components/Home';
import { CardProvider } from './CardContext';

const App = () => (
  <CardProvider>
    <Home />
  </CardProvider>
);

export default App;
