import React from 'react';
import 'normalize.css';
import {
  BrowserRouter as Router,
  Routes, Route,
} from 'react-router-dom';
import { GlobalProvider, useGlobal } from '../context/GlobalContext';
import NotFound from '../notFound/NotFound';
import Header from './header/Header';
import SignUp from './header/signup/SignUp';
import SignIn from './header/signin/SignIn';
import Content from './content/Content';
import ProfileEdit from './header/profileedit/ProfileEdit';
import CreatePost from './createpost/CreatePost';
import Nointernet from './nointernet/Nointernet';
import SinglePage from './singlepage/SinglePage';
import { RegistrationProvider } from '../context/RegistrationContext';
import { LoginProvider } from '../context/LoginContext';

const AppContent = () => {
  const { isOnline } = useGlobal();

  return isOnline ? (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="articles/:slug" element={<SinglePage />} />
        <Route path="account/createpost" element={<CreatePost />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="account/profileedit" element={<ProfileEdit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  ) : (
    <Nointernet />
  );
};

const App = () => (
  <Router>
    <GlobalProvider>
      <RegistrationProvider>
        <LoginProvider>
          <AppContent />
        </LoginProvider>
      </RegistrationProvider>
    </GlobalProvider>
  </Router>
);

export default App;
