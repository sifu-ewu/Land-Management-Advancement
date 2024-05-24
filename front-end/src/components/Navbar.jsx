import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import emblem from '../images/govt.png';

const Navbar = (props) => {
    const [isActive, setActive] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <nav className="bg-[#e1f4f3] shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <NavLink to='/'>
                            <img src={emblem} alt="emblem" className="emblem" />
                        </NavLink>
                        <h3>{props.isAdmin ? "Admin" : "Decentralized Land Management"}</h3>
                    </div>
                    <div className={(windowWidth >= 768 || isActive) ? "hidden md:flex" : ""}>
                        <ul className="flex items-center">
                            {(props.isAdmin) ?
                                <>
                                    <li className={isActive ? "active nav-item" : "nav-item"}>
                                        <NavLink className="nav-link" exact activeClassName="active" to="/admin/">Register Land<span className="sr-only">(current)</span></NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" exact activeClassName="active" to="/admin/explore">Explore</NavLink>
                                    </li>
                                </>
                                :
                                <>
                                    <li className={isActive ? "active nav-item" : "nav-item"}>
                                        <NavLink className="nav-link" exact activeClassName="active" to="/userprofile/">Profile<span className="sr-only">(current)</span></NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" exact activeClassName="active" to="/userprofile/property">Lands</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" exact activeClassName="active" to="/userprofile/requests">Requests</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" exact activeClassName="active" to="/userprofile/requested">Requested</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" exact activeClassName="active" to="/userprofile/landownership">Land Ownership History</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" exact activeClassName="active" to="/userprofile/explore">Explore</NavLink>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                    <div className="md:hidden">
                        <button className="navbar-toggler" type="button" onClick={() => setActive(!isActive)}>
                            <span className={isActive ? "hidden" : "block"}>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </span>
                            <span className={!isActive ? "hidden" : "block"}>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div className={(isActive) ? "block" : "hidden"}>
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="md:flex justify-end h-16">
                        <ul className="flex items-center">
                            {(props.isAdmin) ?
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" exact activeClassName="active" to="/admin/">Register Land</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" exact activeClassName="active" to="/admin/explore">Explore</NavLink>
                                    </li>
                                </>
                                :
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" exact activeClassName="active" to="/userprofile/">Profile</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" exact activeClassName="active" to="/userprofile/property">Lands</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" exact activeClassName="active" to="/userprofile/requests">Requests</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" exact activeClassName="active" to="/userprofile/requested">Requested</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" exact activeClassName="active" to="/userprofile/landownership">Land Ownership History</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" exact activeClassName="active" to="/userprofile/explore">Explore</NavLink>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
