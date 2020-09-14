import React,{useRef,useState} from 'react';
import Fade from '@material-ui/core/Fade'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'
import CircularProgress from '../UtilComponents/CircularProgress'
import Message from './Message'


function ForgotPasswordForm(props){

    const email = useRef('')

    const [state,setstate] = useState({
        progress:false,
        message:false,
        error:{exist:false,errorMessage:''}
    })


    const submitForm = (e)=>{
        setstate({...state,progress:true})
        axios.post('/forgotpwd',{email:email.current.value},{withCredentials:true})
        .then(result=>{
            let status = result.data.status
            switch(status){
                case 200: setstate({...state,message:true,progress:false});break;
                case 422: setstate({...state,progress:true,error:{exist:true,errorMessage:'Email is not registered with us.'}});break;
                case 423: setstate({...state,progress:true,error:{exist:true,errorMessage:'Insufficent data.'}});break;
                case 500: setstate({...state,progress:true,error:{exist:true,errorMessage:'Something went wrong at our end!!!'}});break;
                default:console.log('Forgot Password default exec')
            }
        }).catch( error =>{
            setstate({...state,progress:true,error:{exist:true,errorMessage:'Something went wrong at our end!!!'}})
        })
        e.preventDefault()
    }

return (    <Fade in={true} >
                <form onSubmit={submitForm} >
                    <div>
                        <label className='ff-mst fxl bold my-2 '> 
                            Forgot password ?
                        </label>
                        <p className='fm ff-mst'>Enter the email address you used when you joined and we’ll send you instructions to reset your password.</p>
                        {(state.message)?
                            <Message
                                message={'The Email contains a password reset link which is going to expire within 10 minutes of generation.'}
                                type={'Password Reset Instruction has been sent to'}
                                email={email.current.value} 
                            />:
                            <div>
                                <div className='form-group my-2'>
                                    <label  className='bold ff-mst  m-0'>Email Address</label>
                                    <input className='form-control' id='email' type='email' required ref={email}/>
                                </div>
                                <div className = 'form-group my-2'>
                                    {
                                        (state.progress)?
                                        <CircularProgress size={30} />:
                                        <button className='btn btn-primary shadow-sm' type='submit' disabled={state.progress}>Send Reset Instructions </button>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </form>
            </Fade>)
}


export default ForgotPasswordForm