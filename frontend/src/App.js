import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './Pages/Login/Login';
import ExpertSignup from './Pages/ExpertSignup/ExpertSignup';

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Login} />
        <Route path="/register/expert" component={ExpertSignup} />
      </div>
    </Router>
  );
};

export default App;
