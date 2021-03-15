import {BrowserRouter, Switch, Route } from "react-router-dom"
import {AuthProvider} from "./context/auth/AuthContext"
import {NotificationsProvider} from "./context/notifications/NotificationsContext"
import PrivateRoute from "./components/PrivateRoute"
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth"
import Home from "./pages/Home";
import Profile from "./pages/Profile"
import Post from "./pages/Post";
import { FeedProvider } from "./context/feed/FeedContext";
import Explore from "./pages/Explore";
function App() {
  return (
    <AuthProvider>
      <NotificationsProvider>
        <FeedProvider>    
          <BrowserRouter>
            <Navbar />
            <Switch>
              <Route exact path="/auth" component={Auth} />
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute path="/users/:userId" component={Profile} />
              <PrivateRoute path="/posts/:postId" component={Post}/>
              <PrivateRoute path="/explore" component={Explore} />
            </Switch>
          </BrowserRouter>
        </FeedProvider> 
      </NotificationsProvider>
    </AuthProvider>
    
  );
}

export default App;
