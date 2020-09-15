import React,{useState,useRef} from 'react';
import Fade from '@material-ui/core/Fade'
import {Link} from 'react-router-dom'
import Alert from '@material-ui/lab/Alert'
import axios  from 'axios'
import {setCurrentUser} from '../../redux/user/user.actions'
import {connect} from 'react-redux'
import CircularProgress from '../UtilComponents/CircularProgress'
import history from '../../history'

function LoginForm(props){


    const email = useRef('')
    const password = useRef('')

    const [state,setstate] = useState({
        progress:false,
        error:{exist:false,errorMessage:''}
    })
    const submitForm = (e) => {
        setstate({...state,progress:true})
        axios.post('/login',{
            email:email.current.value,
            password:password.current.value
        },{withCredentials:true})
        .then(res=>{
            let status = res.data.status
            switch(status){
                case 200 : props.setCurrentUser(res.data);history.push('/');break;
                case 401 : setstate({...state,progress:false,error:{exist:true,errorMessage:'Invalid credentials'}})
                case 423 : setstate({...state,progress:false,error:{exist:true,errorMessage:'Validation error'}})
                case 422 : setstate({...state,progress:false,error:{exist:true,errorMessage:'Unverified User'}})
                case 500 : setstate({...state,progress:false,error:{exist:true,errorMessage:'Something went wrong at out end!!'}})
                default : console.log('login default exec')
            }
        })
        .catch(error =>{
            setstate({...state,progress:false,error:{exist:true,errorMessage:'Something went wrong at out end!!'}})
        })
        e.preventDefault()
    }

    return (<Fade in={true} >
                <form onSubmit={submitForm} className='col-12 shadow-lg p-4 rounded'>
                    <div>
                        <label className='h5 ff-mst fl my-2 '> 
                            <span className='mr-1'>Sign in to </span>
                            <Link to='/' className='text-decoration-none text-dark fxl' ><b>N</b>otesKeeper.md</Link>
                        </label>
                        <div className='d-flex justify-content-center my-3'>
                            <a href='https://noteskeeper-md.herokuapp.com/crypt/oauth/login' className='btn shadow-sm btn-dark btn-block' >
                                <span className='fm mr-1'>Sign in with</span><span><b>C</b></span>ry<span><b>P</b></span>t
                            </a>
                        </div>
                        <p className='text-center my-2'>------------<span className='text-muted fm'> Or </span>--------------</p>
                        <div className='form-group'>
                            <label className='bold ff-mst m-0'>Email Address</label>
                            <input className='form-control' id='email' type="email" required ref={email} />
                        </div>
                        <div className='form-group'>
                            <label  className='bold ff-mst m-0'>Password</label>
                            <input className='form-control' id='password' type="password" required ref={password} />
                        </div>
                        <div className = 'form-group d-flex justify-content-between my-2 '>
                            <Link to='/forgotpassword' className='px-0 text-decoration-none fm' >Forgot Password ?</Link>
                            {
                                (state.progress)?
                                <CircularProgress size={30}/>:
                                <button className='btn btn-primary shadow' type='submit' disabled={state.progress}>Sign in</button>
                            }
                        </div>
                        <div>
                            {(state.error.exist)?
                                <Alert severity='error' className='shadow-sm' variant='outlined'>{state.error.errorMessage}</Alert>:
                                <></>
                            }
                        </div>
                    </div>
                </form>
            </Fade>)
}


const mapDispatchToProps = dispatch=>({
    setCurrentUser:userobj=>dispatch(setCurrentUser(userobj))
})

export default connect(null,mapDispatchToProps)(LoginForm)