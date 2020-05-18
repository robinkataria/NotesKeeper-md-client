import React from 'react';
import Brand from '../UtilComponents/Brand'
import NavLinkList from './nav/NavLinkList'
import ProfileMenu from './nav/ProfileMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg mx-4">
            <Brand color='dark' />

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <FontAwesomeIcon icon={faBars} />
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {(props.type !== 'none') ? <NavLinkList type={props.type} /> : <div className='mx-auto' />}

                <ProfileMenu />
            </div>
        </nav>
    )
}

export default Navbar