import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import DetailsPage from './Components/DetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:caseID" element={<DetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
