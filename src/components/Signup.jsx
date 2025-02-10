import React, { useContext, useState } from 'react';
    import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
    import { FirebaseAppContext } from '../context/FirebaseAppContext';
    import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

    function Signup() {
      const { firebaseApp, db } = useContext(FirebaseAppContext);
      const [fullName, setFullName] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [company, setCompany] = useState('');
      const [contactNumber, setContactNumber] = useState('');
      const [userType, setUserType] = useState('client'); // Default to client
      const [error, setError] = useState('');

      const handleSignup = async () => {
        if (!firebaseApp || !db) return;
        setError('');
        try {
          const auth = getAuth(firebaseApp);
          const { user } = await createUserWithEmailAndPassword(auth, email, password);

          // Create user document in Firestore
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email,
            fullName,
            userType,
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp(),
            company,
            contactNumber,
          });

          // Redirect based on user type is handled in App.jsx
        } catch (error) {
          setError(error.message);
        }
      };

      return (
        <div className="form-container">
          <h2>Signup</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
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
          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Contact Number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
          <select value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="client">Client</option>
            <option value="developer">Developer</option>
          </select>
          <button onClick={handleSignup}>Signup</button>
        </div>
      );
    }

    export default Signup;
