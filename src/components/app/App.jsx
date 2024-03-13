import React from 'react';
import 'normalize.css';
import {
  BrowserRouter as Router,
  Routes, Route,
} from 'react-router-dom';
import NotFound from '../notFound/NotFound';
import Header from './header/Header';
import SignUp from './header/signup/SignUp';
import SignIn from './header/signin/SignIn';
import Content from './content/Content';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Content />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;
