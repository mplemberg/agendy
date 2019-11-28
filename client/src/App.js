import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import User from "./components/users/User";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import NotFound from "./components/pages/NotFound";

import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";
import history from "./history";

//Agendas
import AgendaEditor from "./components/agendas/AgendaEditor";
import AgendaViewer from "./components/agendas/AgendaViewer";
import AgendasState from "./context/agendas/AgendasState";
//import "./App.css";
import "./App.scss";
const App = () => {
  return (
    <GithubState>
      <AlertState>
        <AgendasState>
          <Router history={history}>
            <div className='App'>
              <Navbar />
              <div className='container'>
                <div className='row'>
                  <div className='col'>
                    <Alert alert={alert} />
                    <Switch>
                      <Route exact path='/' component={Home} />
                      <Route exact path='/about' component={About} />
                      <Route exact path='/user/:login' component={User} />
                      <Route
                        exact
                        path='/agenda/edit/:editCode'
                        component={AgendaEditor}
                      />
                      <Route
                        exact
                        path='/agenda/view/:viewCode'
                        component={AgendaViewer}
                      />
                      <Route
                        exact
                        path='/agenda/new'
                        component={AgendaEditor}
                      />
                      <Route component={NotFound} />
                    </Switch>
                  </div>
                </div>
              </div>
            </div>
          </Router>
        </AgendasState>
      </AlertState>
    </GithubState>
  );
};

export default App;
