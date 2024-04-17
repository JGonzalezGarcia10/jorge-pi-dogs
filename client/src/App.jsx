import React from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import Detail from "./components/Detail";
import Form from './components/Form';
import './App.css'


function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();


  return (
    <div className="App">
      <Routes>
            <Route exact path="/" element= {<LandingPage/>} />
            <Route exact path="/home" element= {<HomePage/>} />
            <Route path="/dogs/:id" element={<Detail />} />
            <Route path="/form" element={<Form />} />


      </Routes>
    </div>
  );
}

export default App
