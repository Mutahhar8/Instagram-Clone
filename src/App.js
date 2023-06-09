import './App.css';
import LoginPage from './Components/LoginPage/LoginPage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SignupPage from './Components/SignupPage/SignupPage';
import NewFeedsPage from './Components/NewFeedsPage/NewFeedsPage';
import ProfilePage from '../src/Components/ProfilePage/ProfilePage'
import EditProfile from './Components/EditProfile/EditProfile';
import CreatePostPage from './Components/CreatePostPage/CreatePostPage';
import EditPost from './Components/EditPost/EditPost';
import SearchResult from './Components/SearchResult/SearchResult';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import CreateComment from './Components/CreateComment/CreateComment';
import ViewComment from './Components/ViewComment/ViewComment';
function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <LoginPage></LoginPage>
        </Route>
        <Route exact path='/signup'>
          <SignupPage></SignupPage>
        </Route>
        <Route exact path='/newfeeds' >
          <NewFeedsPage></NewFeedsPage>
        </Route>
        <Route exact path='/profile' >
          <ProfilePage></ProfilePage>
        </Route>
        <Route exact path='/editprofile' >
          <EditProfile></EditProfile>
        </Route>
        <Route exact path='/createpost' >
          <CreatePostPage></CreatePostPage>
        </Route>
        <Route exact path='/editpost/:id' >
          <EditPost></EditPost>
        </Route>
        <Route exact path='/searchword/:word' >
          <SearchResult></SearchResult>
        </Route>
        <Route exact path='/createcomment/:id' >
          <CreateComment></CreateComment>
        </Route>
        <Route exact path='/viewcomment/:id' >
          <ViewComment></ViewComment>
        </Route>

      </Switch>
      
    </div>
    </Router>
  );
}

export default App;


