
import Back from './Back/Back';
import Front from './Front/Front';
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './Back/Login';

function App() {
  return (
    <div>
      <Router>
        <Route path="/" component={Front} exact />
        <Route path="/home" component={Front} />
        <Route path="/admin" component={Back} />
        <Route path="/login" component={Login} />
      </Router>
    </div>
  );
}

export default App;
