import React,{useState} from 'react'
import Fade from '@material-ui/core/Fade'
import axios from 'axios'
import PasswordForm from './SignupComponent/PasswordComponent'
import {connect} from 'react-redux'
import {setCurrentUser} from '../../redux/user/user.actions'
import Alert from '@material-ui/lab/Alert'
import utils from '../../utils'
import CircularProgress from '../UtilComponents/CircularProgress'

function PasswordChangeComponent({email,setCurrentUser}){

    const [state,setstate] = useState({
        data:{password:'',confirmPassword:''},
        power:0,
        error:{exist:false,errorMessage:''},
        progress:false
    })

    const handlePasswordChange = (e) =>{
        const power = utils.passwordStrength(e.target.value)
        setstate({...state,power:power,data:{...state.data,password:e.target.value}})
    }

    const handleConfirmPasswordChange = (e) =>{
        const tempPassword = e.target.value
        if(tempPassword === state.data.password.substring(0,tempPassword.length)){
            setstate({...state,data:{...state.data,confirmPassword:e.target.value}})
        }else{

        }
    }

    const submitForm = (e) => {
        setstate({...state,progress:true})
        // axios.post('/changepassword',{email,password:state.data.password},{withCredentials:true})
        // .then(result=>{
        //     switch(result.data.status){
        //          case 200 :  setCurrentUser(result.data);break;
        //          case 500 :  setstate({...state,progress:false,error:{exist:true,erroMessage:'Something went wrong at our end!!!'}});break;
        //          case 423 :  setstate({...state,progress:false,error:{exist:true,erroMessage:'Validation Error'}});break;
        //          case 401 :  setstate({...state,progress:false,error:{exist:true,erroMessage:'Unauthorized'}});;break;
        //          default : console.log('default Password change exec')
        //     }
        // })
        // .catch(error => setstate({...state,progress:false,error:{exist:true,erroMessage:'Something went wrong at our end!!!'}}))
        e.preventDefault()
    }

    return (
            <Fade in={true}>
                <form onSubmit={submitForm} className='col-12 p-4 shadow-lg rounded'>
                    <label className='ff-mst fxl bold my-2 '>Update Password</label>
                    {state.error.exist?<div className='form-group my-2'><Alert severity='error' variant='filled'>{state.error.errorMessage}</Alert></div>:<></>}
                    <PasswordForm 
                            tip={true} 
                            label='Password' 
                            power={state.power} 
                            handlePasswordChange={handlePasswordChange} 
                            password={state.data.password}
                    />
                    <PasswordForm 
                            label='Confirm Password' 
                            handlePasswordChange={handleConfirmPasswordChange} 
                            password={state.data.confirmPassword}
                    />
                    {
                        state.progress?
                        <CircularProgress size={30} />:
                        <button className='btn btn-primary shadow' type='submit' disbaled={state.progress} >Create Password</button>
                    }
                    </form>
            </Fade>
    )
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: userObject => dispatch(setCurrentUser(userObject)),
})

export default connect(null,mapDispatchToProps)(PasswordChangeComponent)