import React from 'react';
import Brand  from '../UtilComponents/Brand'
import NavLinkList from './nav/NavLinkList'
import NavAuthlinks from './nav/NavAuthlinks'
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
            <NavLinkList/>
            <NavAuthlinks/>
        </div>
    </nav>)
}