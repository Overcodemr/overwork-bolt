import React, { useContext } from 'react';
    import { Routes, Route, NavLink } from 'react-router-dom';
    import { getAuth, signOut } from 'firebase/auth';
    import { FirebaseAppContext } from '../context/FirebaseAppContext';
    import TopNav from '../components/TopNav';
    import Sidebar from '../components/Sidebar';
    import AllApps from './AllApps';

    function DeveloperDashboard() {
      const { firebaseApp, userData } = useContext(FirebaseAppContext);
      const handleLogout = async () => {
        if (!firebaseApp) return;
        try {
          const auth = getAuth(firebaseApp);
          await signOut(auth);
        } catch (error) {
          console.error("Error signing out: ", error);
        }
      };

      return (
        <div className="dashboard-container">
          <TopNav userData={userData} handleLogout={handleLogout} />
          <Sidebar>
            <ul>
              <li><NavLink to="/" end>Dashboard</NavLink></li>
              <li><NavLink to="apps">All Apps</NavLink></li>
              <li><NavLink to="projects">All Projects</NavLink></li>
              <li><NavLink to="finance">Finance</NavLink></li>
              <li><NavLink to="contact">Contact Clients</NavLink></li>
            </ul>
          </Sidebar>
          <main className="main-content">
            <Routes>
              <Route path="apps" element={<AllApps />} />
              <Route path="projects" element={<div>Projects</div>} />
              <Route path="finance" element={<div>Finance</div>} />
              <Route path="contact" element={<div>Contact Clients</div>} />
              <Route path="/" element={<div>Dashboard Summary</div>} />
            </Routes>
          </main>
        </div>
      );
    }

    export default DeveloperDashboard;
