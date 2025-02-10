import React, { useContext, useState } from 'react';
    import { FirebaseAppContext } from '../context/FirebaseAppContext';
    import Login from '../components/Login';
    import Signup from '../components/Signup';

    function HomePage() {
      const { user } = useContext(FirebaseAppContext);
      const [showLogin, setShowLogin] = useState(true);

      if (user) {
        return <div>Logged In!</div>;
      }

      return (
        <div className="container">
          <h1>Welcome to Overcode</h1>
          <p>{showLogin ? 'Login to continue' : 'Signup for an account'}</p>

          {showLogin ? <Login /> : <Signup />}

          <button className="secondary" onClick={() => setShowLogin(!showLogin)}>
            {showLogin ? 'Switch to Signup' : 'Switch to Login'}
          </button>
        </div>
      );
    }

    export default HomePage;
