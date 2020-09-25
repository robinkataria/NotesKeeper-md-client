import React from 'react';
import Brand  from '../UtilComponents/Brand'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default function LandingPageNav(){
    return (
    <nav className="navbar navbar-expand-lg col-12 position-fixed p-lg-4 p-md-4 nav-top bg-white">
        <Brand color='dark'/>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto text-dark">
                <li className="nav-item mr-4 ">
                    <Link className="nav-link text-secondary" to="/login">Dashboard</Link>
                </li>
                <li className="nav-item mr-4 ">
                    <Link className="nav-link text-secondary" to="/contact">Contact</Link>
                </li>
                <li className="nav-item mr-4 ">
                    <Link className="btn btn-light rounded px-4 fm" to='/login'>Sign in</Link>
                </li>
                <li className="nav-item mr-4 ">
                    <Link className="btn btn-dark  rounded px-4 fm" to='/signup'>Register</Link>
                </li>
            </ul>
        </div>
    </nav>)
}