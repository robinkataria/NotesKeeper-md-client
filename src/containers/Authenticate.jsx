import React from 'react'
import Login from '../components/AuthenticateComponents/Login'
import Signup from '../components/AuthenticateComponents/Signup'
import ForgotPassword from '../components/AuthenticateComponents/ForgotPassword'
import CopyRight from '../components/UtilComponents/Copyright'
import LinkIcons from '../components/UtilComponents/LinkIcons'


const Component = ({page}) => {
    switch(page){
        case 'login' : return <Login/>
        case 'signup' : return <Signup/>
        case 'forgotpassword' : return <ForgotPassword />
        default : return <></>
    }
}


export default function Authenticate({page}){
    return (
        <div className='d-flex'>
            <div className='bg-black col-xl-3 col-lg-4 col-md-5' style={{minHeight:'100vh'}}>

            </div>
            <div className='d-flex justify-content-center align-items-center col-12 col-xl-9 col-lg-8 col-md-7' style={{minHeight:'100vh'}}>
                <div className='col-12 col-md-10 col-lg-7 col-xl-4'>
                    <Component page={page} />
                </div>
            </div>
        </div>
        )
}