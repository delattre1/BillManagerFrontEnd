import React from "react";

import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import Home from './Pages/Home';
import Form from './Pages/Form';
import NotFoundPage from './Pages/NotFoundPage';
import FluxoCaixa from './Pages/FluxoCaixa';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/add" component={Form}/>
        <Route path="/fluxoCaixa" component={FluxoCaixa}/>
        <Route path="*" component={NotFoundPage}/>
      </Switch>
    </Router>
  )
}

export default App;
