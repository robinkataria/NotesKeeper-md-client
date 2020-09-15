import React, {useState} from 'react';
import Fade from '@material-ui/core/Fade'
import {Link} from 'react-router-dom'
import PasswordComponent from './SignupComponent/PasswordComponent'
import utils from '../../utils'
import axios from 'axios'
import CircularProgress from '../UtilComponents/CircularProgress'
import Message from './Message';



function Signup(){

    const [state,setstate] = useState({
            data:{name:'',email:'',password:''},
            power:0,
            error:{exist:false,errorMessage:''},
            message:false,
            progress:false
    })

    const handleNameChange = (e) => setstate({...state,data:{...state.data,name:e.target.value}})

    const handlePasswordChange = (e) =>{
        const power = utils.passwordStrength(e.target.value)
        setstate({...state,power:power,data:{...state.data,password:e.target.value}})
    }

    const handleEmailChange = (e) => setstate({...state,data:{...state.data,email:e.target.value}})

    const submitForm = (e) => {
        setstate({...state,progress:true})
        axios.post('/register',state.data,{withCredentials:true})
        .then( res => {
            switch(res.data.status){
                case 200: setstate({...state,progress:false,message:true});break
                case 423: setstate({...state,progress:false,error:{exist:true,errorMessage:'User Already Exist'}});break
                case 500: setstate({...state,progress:false,error:{exist:true,errorMessage:'Something went wrong at our end'}});break
                case 401: setstate({...state,progress:false,error:{exist:true,errorMessage:'User Already Exist'}});break
                default:console.log('default signup exec')
            }
        }).catch(error => {
            setstate({...state,progress:false,error:{exist:true,errorMessage:'User Already Exist'}})
        })
        e.preventDefault()
    }


    return (<Fade in={true} >
            <form onSubmit={submitForm} className='col-12 shadow-lg p-4 rounded'>
                {
                    state.message?
                    <Message
                        message={'The Email contains a Account Verification link which is going to expire within 1 hour of generation.'}
                        title={'Account Verification Instruction has been sent to'}
                        email={state.data.email}
                    />:
                <div >
                    <label className='h5 ff-mst fl my-2 '> 
                            <span className='mr-1'>Sign up to </span>
                            <Link to='/' className='text-decoration-none text-dark fxl' ><b>N</b>otesKeeper.md</Link>
                    </label>
                    <div className='d-flex justify-content-center my-3'>
                            <a href='https://noteskeeper-md.herokuapp.com/crypt/oauth/login' className='btn shadow-sm btn-dark btn-block' >
                                <span className='fm mr-1'>Sign up with</span><span><b>C</b></span>ry<span><b>P</b></span>t
                            </a>
                        </div>
                    <p className='text-center my-2'>------------<span className='text-muted fm'> Or </span>--------------</p>
                        
                    <div className='form-group'>
                            <label className='bold ff-mst m-0'>Name</label>
                            <input className='form-control' id='name' type="name" onChange={handleNameChange} required value={state.data.name} />
                    </div>
                    <div className='form-group'>
                            <label className='bold ff-mst m-0'>Email Address</label>
                            <input className='form-control' id='email' type="email" onChange={handleEmailChange} required value={state.data.email} />
                    </div>
                    <PasswordComponent label='Password'  tip={true} power={state.power} handlePasswordChange={handlePasswordChange} password={state.data.password}/>
                     {
                        state.progress?
                        <CircularProgress size={30}/>:
                        <button className='btn btn-primary shadow' type='submit'>Create Account</button>
                    }
                </div>
            }
            </form>
        </Fade>)
}

export default Signup