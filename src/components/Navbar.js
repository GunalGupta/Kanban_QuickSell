import React, { useState, useEffect, useRef } from 'react';
import '../css/Navbar.css';

const Navbar = ({ grouping, sorting, onGroupingChange, onSortingChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectClick = (e) => {
    e.stopPropagation(); // Prevent dropdown from closing when clicking select
  };

  return (
    <nav className="navbar">
      <div className="display-button-container" ref={dropdownRef}>
        <button 
          className="display-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className="fas fa-sliders-h"></i>
          <span>Display</span>
          <span className="arrow">{isOpen ? '▼' : '▼'}</span>
        </button>
        {isOpen && (
          <div className="dropdown">
            <div className="dropdown-item">
              <span>Grouping</span>
              <select 
                value={grouping}
                onChange={(e) => onGroupingChange(e.target.value)}
                onClick={handleSelectClick}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="dropdown-item">
              <span>Ordering</span>
              <select 
                value={sorting}
                onChange={(e) => onSortingChange(e.target.value)}
                onClick={handleSelectClick}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;