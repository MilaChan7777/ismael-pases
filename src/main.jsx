import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Cover from './pages/Cover.jsx';
import Admin from './pages/Admin.jsx';
import './style.css';
createRoot(document.getElementById('root')).render(
 <BrowserRouter><Routes>
  <Route path="/" element={<Navigate to="/i/demo" replace/>}/>
  <Route path="/i/:token" element={<Cover/>}/>
  <Route path="/admin" element={<Admin/>}/>
  <Route path="*" element={<main className="error-screen"><h1>El camino no llega hasta aquí 🌾</h1><a href="/i/demo">Ver demostración</a></main>}/>
 </Routes></BrowserRouter>
);
