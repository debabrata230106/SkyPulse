import { React, StrictMode } from 'react'
import { ReactDOM, createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import ErrorPage from './error.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
)
