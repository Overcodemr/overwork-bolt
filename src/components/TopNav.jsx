import React from 'react';

    function TopNav({ userData, handleLogout }) {
      return (
        <div className="top-nav">
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="user-info">
            {userData && <span>Welcome, {userData.fullName}</span>}
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      );
    }

    export default TopNav;
