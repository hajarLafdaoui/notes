import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowRight, faPlus, faTimes, faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import add from '../assets/images/add.png';
import trash from '../assets/images/trash.png';
import folder from '../assets/images/folder.png';


const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [subDropdownOpen, setSubDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleSubDropdown = () => {
        setSubDropdownOpen(!subDropdownOpen);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                <div className="container-fluid">
                    <div className="d-flex justify-content-between w-100">
                        <div className="d-flex align-items-center">
                            <a className="navbar-brand ms-3" href="#">MindPad</a>
                        </div>

                        <div className="mx-3 d-flex align-items-center search-container">
                            <input
                                className="form-control search-input"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <FontAwesomeIcon icon={faSearch} size="lg" className="search-icon" />
                        </div>

                        <div className="sec-center  p-0 m-0">
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
                                <a href="#">Logout <FontAwesomeIcon icon={faArrowRight} /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {/*  */}
            <div className="left-side">
            <div className="add">
                    <img src={folder} alt="Add Icon" />
                    <p>All Notes</p>
                </div>
                <div className="add">
                    <img src={add} alt="Add Icon" />
                    <p>Add New</p>
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
