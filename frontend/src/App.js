import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import ExpertSignup from './Pages/ExpertSignup/ExpertSignup';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register/expert" element={<ExpertSignup />} />
      </Routes>
  );
};

export default App;
