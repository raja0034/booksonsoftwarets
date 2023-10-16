import React from "react";
import { Home } from "./pages/home/Home";
import { Media } from "./pages/media/Media";
import { OurStory } from "./pages/our-story/OurStory";
import { Store } from "./pages/store/Store";
import { Auth } from "./pages/auth/Auth";
import Admin from "./pages/admin/Admin";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ApolloProvider } from "./context/ApolloProvider";
import { AuthProvider } from "./context/AuthProvider";
import { useAppInit } from "./useAppInit";

function AppRouter() {
  const { loading } = useAppInit();
  return (
    <div id="wrapper">
      <Router>
        <Header />
        {loading ? (
          <p>Reticulating splines...</p>
        ) : (
          <Switch>
            <Route path="/media">
              <Media />
            </Route>
            <Route path="/our-story">
              <OurStory />
            </Route>
            <Route path="/store">
              <Store />
            </Route>
            <Route path="/auth">
              <Auth />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        )}
        <Footer />
      </Router>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ApolloProvider>
        <AppRouter />
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
