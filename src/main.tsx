import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <--- The Missing Piece
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>  {/* <--- This enables navigation for the whole app */}
      <App />
    </BrowserRouter>
  </StrictMode>
);