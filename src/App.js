import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import DetailsPage from './Components/DetailsPage';
import StepContext from './Components/AddNewCase/StepContext';
import UpdateNewCase from './Components/UpdateExistingCase/UpdateNewCase';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:caseID" element={<DetailsPage />} />
        <Route path="/addCase" element={<StepContext/>} />
        <Route path="/updateCase" element={<UpdateNewCase/>} />
      </Routes>
    </Router>
  );
}

export default App;
