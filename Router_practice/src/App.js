import { Redirect, Route, Switch } from "react-router-dom";
import AllQuote from "./pages/AllQuote";
import DetailsQuote from "./pages/DetailsQuote";
import NewQuote from "./pages/NewQuote";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/quotes"></Redirect>
      </Route>

      <Route path="/quotes" exact>
        <AllQuote />
      </Route>
      <Route path="/quotes/:Qid">
        <DetailsQuote />
      </Route>
      <Route path="/new-quote">
        <NewQuote />
      </Route>
    </Switch>
  );
}

export default App;

/** <Switch> means Activate one route at a time.
 *  <Redirect>  means Redirect User to some route.
 *  <Route> means we can define any route here.
 *  "exact" Keyword means match particular route exactly.
 *  <BrowserRouter> means to activate Router in our application. Wrap ROOT OR <APP/> component
 * using <BrowserRouter>.
 */
