import React from 'react';
    import ReactDOM from 'react-dom/client';
    import App from './App';
    import './index.css';
    import { BrowserRouter as Router } from 'react-router-dom';
    import { FirebaseAppProvider } from './context/FirebaseAppContext';

    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <Router>
          <FirebaseAppProvider>
            <App />
          </FirebaseAppProvider>
        </Router>
      </React.StrictMode>,
    );
