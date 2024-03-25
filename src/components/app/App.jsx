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
import PrivateRoute from './privateRoute/PrivateRoute';
import PublicRoute from './publicRoute/PublicRoute';
import { UpdateUserDataProvider } from '../context/UserUpdate';
import { CreateAnArticleProvider } from '../context/CreateAnArticle';
import EditPost from './editPost/Editpost';

const AppContent = () => {
  const { isOnline } = useGlobal();

  return isOnline ? (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="articles/:slug" element={<SinglePage />} />
        <Route path="account/createpost" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
        <Route path="account/profileedit" element={<PrivateRoute><ProfileEdit /></PrivateRoute>} />
        <Route path="/articles/:slug/edit" element={<PrivateRoute><EditPost /></PrivateRoute>} />
        <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
        <Route path="/signin" element={<PublicRoute><SignIn /></PublicRoute>} />
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
          <UpdateUserDataProvider>
            <CreateAnArticleProvider>
              <AppContent />
            </CreateAnArticleProvider>
          </UpdateUserDataProvider>
        </LoginProvider>
      </RegistrationProvider>
    </GlobalProvider>
  </Router>
);

export default App;
