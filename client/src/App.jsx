import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import semua halaman dari pages
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import UserAccount from './pages/UserAccount';
import MyPostsPage from './pages/MyPostsPage';
import RegisterPage from './pages/RegisterPage';
import PostsPage from './pages/PostsPage';
import SingularPostPage from './pages/SingularPostPage';
import MyRepliesPage from './pages/MyRepliesPage';
import SuccessRegisterPage from './pages/SuccessRegisterPage';
import ChangePassword from './pages/ChangePassword';

const App = () => {
  // Routes
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<HomePage />} />
          <Route path='/login' exact element={<LoginPage />} />
          <Route path='/profilePage' exact element={<UserPage />} />
          <Route path='/profilePage/changePassword' exact element={<ChangePassword />} />
          <Route path='/profilePage/:username' exact element={<UserAccount />} />
          <Route path='/myPosts' exact element={<MyPostsPage />} />
          <Route path='/register' exact element={<RegisterPage />} />
          <Route path='/success' exact element={<SuccessRegisterPage />} />
          <Route path='/posts' exact element={<PostsPage />} />
          <Route path='/posts/:postID' exact element={<SingularPostPage />}/>
          <Route path='/myReplies' exact element={<MyRepliesPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;