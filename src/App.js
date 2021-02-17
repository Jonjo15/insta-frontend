import {BrowserRouter, Switch, Route } from "react-router-dom"
import {AuthProvider} from "./context/auth/AuthContext"
import {NotificationsProvider} from "./context/notifications/NotificationsContext"
import PrivateRoute from "./components/PrivateRoute"
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth"
import Home from "./pages/Home";
import Profile from "./pages/Profile"
import User from "./pages/User"
import Post from "./pages/Post";
function App() {
  return (
    <AuthProvider>
      <NotificationsProvider>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/auth" component={Auth} />
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute path="/users/:userId" component={User} />
            <PrivateRoute path="/posts/:postId" component={Post}/>
          </Switch>
        </BrowserRouter>
      </NotificationsProvider>
    </AuthProvider>
    
  );
}

export default App;
