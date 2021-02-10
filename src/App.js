import {BrowserRouter, Switch, Route } from "react-router-dom"
import Auth from "./pages/Auth"
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Auth} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
