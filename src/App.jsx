import React, { useContext, useEffect } from 'react';
    import { Route, Routes, useNavigate } from 'react-router-dom';
    import HomePage from './views/HomePage';
    import ClientDashboard from './views/ClientDashboard';
    import DeveloperDashboard from './views/DeveloperDashboard';
    import { FirebaseAppContext } from './context/FirebaseAppContext';

    function NavigationEffect() {
      const { redirectTo } = useContext(FirebaseAppContext);
      const navigate = useNavigate();

      useEffect(() => {
        if (redirectTo) {
          navigate(redirectTo);
        }
      }, [redirectTo, navigate]);

      return null; // This component doesn't render anything
    }

    function App() {
      return (
        <>
          <NavigationEffect />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/client/*" element={<ClientDashboard />} />
            <Route path="/developer/*" element={<DeveloperDashboard />} />
          </Routes>
        </>
      );
    }

    export default App;
