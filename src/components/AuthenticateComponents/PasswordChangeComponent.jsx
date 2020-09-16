import React,{useState} from 'react'
import Fade from '@material-ui/core/Fade'
import axios from 'axios'
import PasswordForm from './SignupComponent/PasswordComponent'
import Alert from '@material-ui/lab/Alert'
import utils from '../../utils'
import CircularProgress from '../UtilComponents/CircularProgress'
import {Link} from 'react-router-dom'

export default function PasswordChangeComponent({setCurrentUser,token}){

    const [state,setstate] = useState({
        data:{password:'',confirmPassword:''},
        power:0,
        error:{exist:false,errorMessage:''},
        progress:false,
        success:false,
        match:true,
    })

    const handlePasswordChange = (e) =>{
        const power = utils.passwordStrength(e.target.value)
        setstate({...state,power:power,data:{...state.data,password:e.target.value}})
    }

    const handleConfirmPasswordChange = (e) =>{
        const tempPassword = e.target.value
        if(tempPassword === state.data.password.substring(0,tempPassword.length)){
            setstate({...state,match:true,data:{...state.data,confirmPassword:e.target.value}})
        }else{
            setstate({...state,match:false})
        }
    }

    const submitForm = (e) => {
        if (state.match){
            setstate({...state,progress:true})
            axios.post('/resetpassword',{token,password:state.data.password},{withCredentials:true})
            .then(res=>{
                let { status,type } = res.data
                console.log(type)
                switch(status){
                    case 200 :  setstate({...state,progress:false,success:true});break
                    case 500 :  setstate({...state,progress:false,error:{exist:true,errorMessage:'Something went wrong at our end!!!'}});break;
                    case 423 :  setstate({...state,progress:false,error:{exist:true,errorMessage:type}});break;
                    case 422 :  setstate({...state,progress:false,error:{exist:true,errorMessage:type}});break;
                    case 401 :  setstate({...state,progress:false,error:{exist:true,errorMessage:'Unauthorized'}});;break;
                    default : console.log('default Password change exec')
                }
            })
            .catch(error =>{ 
                setstate({...state,progress:false,error:{exist:true,errorMessage:'Something went wrong at our end!!!'}})
            })
        }
        e.preventDefault()
    }

    if (state.error.exist){
        return (
                <div className='form-group my-2'>
                    <Alert severity='error' variant='outlined'>
                        {state.error.errorMessage}
                    </Alert>
                </div>)
    }else if(state.success){
        return (
                <div className='form-group my-2'>
                    <Alert severity='success' variant='outlined'>
                        <span>Password updated successfully</span>
                    </Alert>
                </div>)
    }else{
        return (
            <Fade in={true}>
                <form onSubmit={submitForm} className='col-12 p-4 shadow-lg rounded'>
                    <label className='ff-mst fxl bold my-2 '>Update Password</label>
                    <PasswordForm 
                            key='pass'
                            tip={true} 
                            label='Password' 
                            power={state.power} 
                            handlePasswordChange={handlePasswordChange} 
                            password={state.data.password}
                    />
                    <PasswordForm 
                            key='cnfpass'
                            label='Confirm Password' 
                            handlePasswordChange={handleConfirmPasswordChange} 
                            password={state.data.confirmPassword}
                    />
                    {
                        state.match?<></>
                        :<div  className='my-2'>
                            <Fade in={true}>
                                <Alert variant='outlined' severity='error'>Password fields are not matching</Alert>
                            </Fade>
                        </div>
                    }
                    {
                        state.progress?
                        <CircularProgress size={30} />:
                        <button className='btn btn-primary shadow' type='submit' disbaled={state.progress | !state.match} >Create Password</button>
                    }
                    </form>
            </Fade>)
    }
}
