import {BrowserRouter, Route, Switch} from 'react-router-dom';

// Import semua halaman dari pages
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import MyPostsPage from './pages/MyPostsPage';
import RegisterPage from './pages/RegisterPage';
import PostsPage from './pages/PostsPage';
import SingularPostPage from './pages/SingularPostPage';
import MyRepliesPage from './pages/MyRepliesPage';
import SuccessRegisterPage from './pages/SuccessRegisterPage';

const App = () => {
  // Routes
  return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/profilePage' component={UserPage} />
          <Route exact path='/myPosts' component={MyPostsPage} />
          <Route exact path='/register' component={RegisterPage} />
          <Route exact path='/success' component={SuccessRegisterPage} />
          <Route exact path='/posts' component={PostsPage} />
          <Route exact path='/posts/:postID' component={SingularPostPage}/>
          <Route exact path='/myReplies' component={MyRepliesPage} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;