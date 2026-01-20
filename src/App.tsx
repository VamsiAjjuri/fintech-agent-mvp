import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Registry from './pages/Registry';
import Analysis from './pages/Analysis';
import About from './pages/About';
import Support from './pages/Support';
import { AIChatBot } from './components/AIChatBot'; // <--- Import the Chatbot

function App() {
  return (
    <>
      {/* 1. The Main Routing Logic */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registry" element={<Registry />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/support" element={<Support />} />
        
        {/* Redirect any unknown routes back to Login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* 2. The Floating Chatbot (Outside Routes so it appears everywhere) */}
      <AIChatBot /> 
    </>
  );
}

export default App;