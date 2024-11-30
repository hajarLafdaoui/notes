import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPlus, faTimes, faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import add from '../assets/images/add.png';
import trash from '../assets/images/trash.png';
import folder from '../assets/images/folder.png';

const Navbar = ({ setView, setSearchQuery, setIsConected }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [subDropdownOpen, setSubDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference for the dropdown

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSubDropdown = () => {
    setSubDropdownOpen(!subDropdownOpen);
  };

  const logout = () => {
    localStorage.removeItem("data");
    localStorage.removeItem("token");
    setIsConected(false);
  };

  // Close dropdown if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <div className="d-flex justify-content-between w-100">
            <div className="d-flex align-items-center logo-container">
              <a className="navbar-brand ms-3" href="#">MindPad</a>
            </div>

            <div className="mx-3 d-flex align-items-center search-container">
              <input
                className="form-control search-input"
                type="search"
                placeholder="Search for title"
                aria-label="Search"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FontAwesomeIcon icon={faSearch} size="lg" className="search-icon" />
            </div>

            <div className="sec-center p-0 m-0" ref={dropdownRef}> {/* Add ref to dropdown container */}
              <input
                className="dropdown"
                type="checkbox"
                id="dropdown"
                name="dropdown"
                checked={dropdownOpen}
                onChange={toggleDropdown}
              />
              <label className="for-dropdown" htmlFor="dropdown">
                <FontAwesomeIcon icon={dropdownOpen ? faTimes : faBars} />
              </label>
              <div className={`section-dropdown ${dropdownOpen ? 'show' : ''}`}>
                <input
                  className="dropdown-sub"
                  type="checkbox"
                  id="dropdown-sub"
                  name="dropdown-sub"
                  checked={subDropdownOpen}
                  onChange={toggleSubDropdown}
                />
                <label className="for-dropdown-sub" htmlFor="dropdown-sub">
                  Profil
                  <FontAwesomeIcon icon={subDropdownOpen ? faTimes : faPlus} />
                </label>
                <div className={`section-dropdown-sub ${subDropdownOpen ? 'show' : ''}`}>
                  <a href="#">See Profile <FontAwesomeIcon icon={faArrowRight} /></a>
                  <a href="#">Update Password <FontAwesomeIcon icon={faArrowRight} /></a>
                </div>
                <a href="#" onClick={logout}>Logout <FontAwesomeIcon icon={faArrowRight} /></a>
                <div className="leftItems">
                  <a href="#" onClick={() => setView('allNotes')}>All Notes <FontAwesomeIcon icon={faArrowRight} /></a>
                  <a href="#" onClick={() => setView('create')}>Create Note <FontAwesomeIcon icon={faArrowRight} /></a>
                  <a href="#">Trash <FontAwesomeIcon icon={faArrowRight} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Left-side navigation */}
      <div className="left-side">
        <div className="add" onClick={() => setView('allNotes')}>
          <img src={folder} alt="Folder Icon" />
          <p>All Notes</p>
        </div>
        <div className="add" onClick={() => setView('create')}>
          <img src={add} alt="Add Icon" />
          <p>Create Note</p>
        </div>
        <div className="add">
          <img src={trash} alt="Trash Icon" />
          <p>Trash</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
