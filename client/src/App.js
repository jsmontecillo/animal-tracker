import React from 'react';
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import IndividualsForm from './components/pages/addindividuals';
import SightingsForm from './components/pages/addsightings';
import Layout from "./components/pages/layout";

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="/add-individuals" element={<IndividualsForm/>} />
            <Route path="/add-sighting" element={<SightingsForm/>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
