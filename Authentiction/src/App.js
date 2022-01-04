import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./store/auth-context";

function App() {
  const auth = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!auth.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}

        <Route path="/profile">
          {auth.isLoggedIn && <UserProfile />}
          {!auth.isLoggedIn && <Redirect to="/auth" />}
        </Route>
        <Route path="*"></Route>
      </Switch>
    </Layout>
  );
}

export default App;
