import React from 'react';
import ReactDOM from 'react-dom/client';
import { MotionConfig, MotionGlobalConfig } from 'framer-motion';

// Dev aid: open http://localhost:5173/?static to render every section in its final state.
if (import.meta.env.DEV && new URLSearchParams(location.search).has('static')) {
  MotionGlobalConfig.skipAnimations = true;
}
import './styles/global.css';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* reducedMotion="user" respects the OS "reduce motion" setting */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </React.StrictMode>
);
