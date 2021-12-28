import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AllQuote from "./pages/AllQuote";
import DetailsQuote from "./pages/DetailsQuote";
import F404 from "./pages/F404";
import NewQuote from "./pages/NewQuote";

function App() {
  return (
    <Layout>
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
        <Route path="*">
          <F404 />
        </Route>
      </Switch>
    </Layout>
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
