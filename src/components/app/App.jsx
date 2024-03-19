/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import 'normalize.css';
import {
  BrowserRouter as Router,
  Routes, Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserProvider } from '../context/Context';
import NotFound from '../notFound/NotFound';
import Header from './header/Header';
import SignUp from './header/signup/SignUp';
import SignIn from './header/signin/SignIn';
import Content from './content/Content';
import ProfileEdit from './header/profileedit/ProfileEdit';
import CreatePost from './createpost/CreatePost';
import Nointernet from './nointernet/Nointernet';

const App = () => {
  const isConnected = useSelector((state) => state.network.isOnline);

  return (
    <>
      {isConnected ? (
        <Router>
          <UserProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Content />} />
              <Route path="articles/" element={<Content />} />
              <Route path="account/createpost" element={<CreatePost />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="account/profileedit" element={<ProfileEdit />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </UserProvider>
        </Router>
      ) : (
        <Nointernet />
      )}
    </>
  );
};

export default App;
