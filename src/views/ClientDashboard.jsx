import React, { useContext } from 'react';
    import { Routes, Route, NavLink } from 'react-router-dom';
    import { getAuth, signOut } from 'firebase/auth';
    import { FirebaseAppContext } from '../context/FirebaseAppContext';
    import TopNav from '../components/TopNav';
    import Sidebar from '../components/Sidebar';
    import DashboardContent from '../components/DashboardContent';

    function ClientDashboard() {
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
              <li><NavLink to="apps">My Apps</NavLink></li>
              <li><NavLink to="projects">Projects</NavLink></li>
              <li><NavLink to="finance">Finance</NavLink></li>
              <li><NavLink to="settings">Settings</NavLink></li>
              <li><NavLink to="contact">Contact Us</NavLink></li>
            </ul>
          </Sidebar>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<DashboardContent />} />
              <Route path="apps" element={<div>Apps Content</div>} />
              <Route path="projects" element={<div>Projects Content</div>} />
              <Route path="finance" element={<div>Finance Content</div>} />
              <Route path="settings" element={<div>Settings Content</div>} />
              <Route path="contact" element={<div>Contact Us Content</div>} />
            </Routes>
          </main>
        </div>
      );
    }

    export default ClientDashboard;
