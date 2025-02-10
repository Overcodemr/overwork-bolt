import React, { useContext, useState } from 'react';
    import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
    import { FirebaseAppContext } from '../context/FirebaseAppContext';

    function Login() {
      const { firebaseApp } = useContext(FirebaseAppContext);
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');

      const handleLogin = async () => {
        if (!firebaseApp) return;
        setError('');
        try {
          const auth = getAuth(firebaseApp);
          await signInWithEmailAndPassword(auth, email, password);
          // Redirect based on user type is handled in App.jsx
        } catch (error) {
          setError(error.message);
        }
      };

      return (
        <div className="form-container">
          <h2>Login</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      );
    }

    export default Login;
