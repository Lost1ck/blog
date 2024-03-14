import React from 'react';
import 'normalize.css';
import {
  BrowserRouter as Router,
  Routes, Route,
} from 'react-router-dom';
import { UserProvider } from '../context/Context';
import NotFound from '../notFound/NotFound';
import Header from './header/Header';
import SignUp from './header/signup/SignUp';
import SignIn from './header/signin/SignIn';
import Content from './content/Content';
import ProfileEdit from './header/profileedit/ProfileEdit';
import Post from './posts/Post';

const App = () => (
  <Router>
    <UserProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profileedit" element={<ProfileEdit />} />
        <Route path="/Post" element={<Post />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserProvider>
  </Router>
);

export default App;
