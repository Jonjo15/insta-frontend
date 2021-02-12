import {BrowserRouter, Switch, Route } from "react-router-dom"
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth"
import Home from "./pages/Home";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
