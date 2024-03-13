import React from 'react';
import 'normalize.css';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import Header from './header/Header';
import Content from './content/Content';
import Footer from './footer/Footer';

const App = () => (
  <Router>
    <Header />
    <Content />
    <Footer />
  </Router>
);

export default App;
