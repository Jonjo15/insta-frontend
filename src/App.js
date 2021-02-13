import {BrowserRouter, Switch, Route } from "react-router-dom"
import {AuthProvider} from "./context/auth/AuthContext"
import PrivateRoute from "./components/PrivateRoute"
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth"
import Home from "./pages/Home";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/auth" component={Auth} />
          <PrivateRoute exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
    
  );
}

export default App;
