import React, { useState } from 'react';

    function AllApps() {
      const [isModalOpen, setIsModalOpen] = useState(false);

      const handleOpenModal = () => {
        setIsModalOpen(true);
      };

      const handleCloseModal = () => {
        setIsModalOpen(false);
      };

      return (
        <div>
          <h2>All Apps</h2>
          <button onClick={handleOpenModal}>Create New App</button>

          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <h3>Create New App</h3>
                {/* Basic form structure - to be expanded later */}
                <input type="text" placeholder="App Name" />
                <button onClick={handleCloseModal}>Close</button>
              </div>
            </div>
          )}
        </div>
      );
    }

    export default AllApps;
