import React,{useRef} from 'react';
import Stepper from './SignupComponent/Stepper'
import Fade from '@material-ui/core/Fade'
import {Link} from 'react-router-dom'

function Signup(props){

    const name = useRef('')
    const email = useRef('')
    const password = useRef('')

    const submitForm = (e) => {
        e.preventDefault()
    }
    return (<Fade in={true} >
            <form onSubmit={submitForm} className='col-12'>
                <div >
                    <label className='h5 ff-mst fl my-4 '> 
                            <span className='mr-1'>Sign up to </span>
                            <Link to='/' className='text-decoration-none text-dark fxl' ><b>N</b>otesKeeper.md</Link>
                    </label>
                    <div className='form-group'>
                            <label className='bold ff-mst m-0'>Name</label>
                            <input className='form-control' id='name' type="name" required ref={name} />
                    </div>
                    <div className='form-group'>
                            <label className='bold ff-mst m-0'>Email Address</label>
                            <input className='form-control' id='email' type="email" required ref={email} />
                    </div>
                    <div className='form-group'>
                            <label  className='bold ff-mst m-0'>Password</label>
                            <input className='form-control' id='password' type="password" required ref={password} />
                    </div>
                    <button className='btn btn-primary shadow'>Create Account</button>
                </div>
            </form>
        </Fade>)
}

export default Signup