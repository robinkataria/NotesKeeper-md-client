import React from 'react'
import Login from '../components/AuthenticateComponents/Login'
import Signup from '../components/AuthenticateComponents/Signup'
import ForgotPassword from '../components/AuthenticateComponents/ForgotPassword'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton'
import {Link} from 'react-router-dom'


const Component = ({page}) => {
    switch(page){
        case 'login' : return <Login/>
        case 'signup' : return <Signup/>
        case 'forgotpassword' : return <ForgotPassword />
        default : return <></>
    }
}

const navLinkData = {
        'login':{
            links:['/','/signup'],
            messages:["Don't have an Account ?",'Signup']
        },
        'signup':{
            links:['/','/login'],
            messages:["Already have an Account ?",'Signin']
        },
        'forgotpassword':{
            links:['/login','/signup'],
            messages:["Don't have an Account ?",'Signup']
        }
}

const NavLink = ({page}) => {


    const {links,messages} = navLinkData[page]
    return (<>
                <Link to={links[0]} className='mr-2'>
                    <IconButton>
                        <ArrowBackIcon/>
                    </IconButton>
                </Link> 
                <div className='d-flex flex-wrap'>
                    <span className='mr-1'>{messages[0]}</span>
                    <Link to={links[1]} className='text-decoration-none '> {messages[1]} here</Link>
                </div>
            </>)
}


export default function Authenticate({page}){
    return (
        <div className='d-flex'>
            <div className='bg-black p-0 col-xl-4 col-lg-5 col-md-6' style={{minHeight:'100vh'}}>

            </div>
            <div className='d-flex flex-column align-items-center col-12 col-xl-8 col-lg-7 col-md-6' style={{minHeight:'100vh'}}>
                <div className='col-12 d-flex justify-content-between align-items-center' style={{minHeight:'10vh'}}>
                    <NavLink page={page}/>
                </div>
                <div className='col-12 col-lg-8 col-xl-6 d-flex align-items-center justify-content-center' style={{minHeight:'90vh'}}>
                    <Component page={page} />
                </div>
            </div>
        </div>
        )
}