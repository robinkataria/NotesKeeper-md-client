import React,{useState} from 'react';

import LoginForm from './LoginComponent/LoginForm'
import ForgotPasswordForm from './LoginComponent/ForgotPasswordForm'

function Login(){

    const [Switch,setswitch] = useState('login')

    return (
            <div className='col-12 border-bottom pb-2 border-dark'>
                {(Switch === 'login')?<LoginForm setswitch={setswitch}/>:<ForgotPasswordForm setswitch={setswitch}/>}
            </div>
        )
}

export default Login