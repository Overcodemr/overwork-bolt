import React from 'react';
    import { NavLink } from 'react-router-dom';

    function Sidebar({ children }) {
      return (
        <div className="sidebar">
          {children}
        </div>
      );
    }
    export default Sidebar;
