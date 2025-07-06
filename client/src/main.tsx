import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Analytics } from "@vercel/analytics/next"

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/doc/:id" element={<App />} />
    </Routes>
    <Analytics />
  </BrowserRouter>
)
