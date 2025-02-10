import React, { createContext, useState, useEffect } from 'react';
    import { initializeApp } from 'firebase/app';
    import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
    import { getFirestore, doc, getDoc } from 'firebase/firestore';

    const firebaseConfig = {
      apiKey: "AIzaSyCmezG-Mcl94IV3w1gxDt-6OHI9R6fGh2Y",
      authDomain: "overcode-27f56.firebaseapp.com",
      databaseURL: "https://overcode-27f56-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "overcode-27f56",
      storageBucket: "overcode-27f56.appspot.com",
      messagingSenderId: "200629257352",
      appId: "1:200629257352:web:1e1dd5c8ba7bc8e1bb0b3d",
      measurementId: "G-E5HQQEYFJ7"
    };

    export const FirebaseAppContext = createContext(null);

    export const FirebaseAppProvider = ({ children }) => {
      const [firebaseApp, setFirebaseApp] = useState(null);
      const [loading, setLoading] = useState(true);
      const [user, setUser] = useState(null);
      const [db, setDb] = useState(null);
      const [userData, setUserData] = useState(null);
      const [redirectTo, setRedirectTo] = useState(null);

      useEffect(() => {
        const app = initializeApp(firebaseConfig);
        setFirebaseApp(app);

        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          setUser(currentUser);
          if (currentUser) {
            // Fetch user data from Firestore
            try {
              const firestore = getFirestore(app);
              setDb(firestore);
              const userDocRef = doc(firestore, "users", currentUser.uid);
              const userDocSnap = await getDoc(userDocRef);

              if (userDocSnap.exists()) {
                setUserData(userDocSnap.data());
                setRedirectTo(`/${userDocSnap.data().userType}`); // Set redirect path
              } else {
                console.log("No such document!");
                // Handle missing user document
                await signOut(auth);
                setRedirectTo('/'); // Set redirect path to home/login
              }
            } catch (error) {
              console.error("Error in onAuthStateChanged:", error);
            }
          } else {
            setUserData(null);
            setRedirectTo('/'); // Set redirect path to home/login on logout
          }
          setLoading(false);
        });

        return () => unsubscribe();
      }, []);

      if (loading) {
        return <div>Loading...</div>;
      }

      return (
        <FirebaseAppContext.Provider value={{ firebaseApp, user, db, userData, setRedirectTo }}>
          {children}
        </FirebaseAppContext.Provider>
      );
    };
