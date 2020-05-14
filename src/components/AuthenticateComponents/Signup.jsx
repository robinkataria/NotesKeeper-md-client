import React from 'react';
import Brand from '../UtilComponents/Brand'
import Stepper from './SignupComponent/Stepper'
import Fade from '@material-ui/core/Fade'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function Signup(props){
return (    <Fade in={true} >
                <div className='border-bottom border-dark'>
                    <Brand color='dark' />
                    <label className='h4 mt-5 mb-3'>
                       <Link to='/' className='text-decoration-none text-dark' >
                           <FontAwesomeIcon icon={faChevronLeft}/>
                        </Link> 
                        <span> Register To NotesKeeper
                        </span>
                    </label>
                    <Stepper/>
                    <div className='mt-5 mb-2 d-flex justify-content-center'>
                        Already have an Account?<Link to='/login' className='text-decoration-none'>Signin here</Link>
                    </div>
                </div>
            </Fade>)
}

export default Signup