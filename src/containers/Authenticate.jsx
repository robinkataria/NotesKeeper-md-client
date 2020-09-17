import React from 'react'
import Login from '../components/AuthenticateComponents/Login'
import Signup from '../components/AuthenticateComponents/Signup'
import ForgotPassword from '../components/AuthenticateComponents/ForgotPassword'
import PasswordChangeComponent from '../components/AuthenticateComponents/PasswordChangeComponent'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton'
import {Link} from 'react-router-dom'


const Component = ({page,token}) => {
    switch(page){
        case 'login' : return <Login/>
        case 'signup' : return <Signup/>
        case 'forgotpassword' : return <ForgotPassword />
        case 'reset': return <PasswordChangeComponent token={token}/>
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
        },
        'reset':{
            links:['/','/login'],
            messages:["Remeber the password ?",'Signin']
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

const taglines = { 'login' :'Redifining notes taking.',
                    'signup':'Register your notes with us.',
                    'forgotpassword':"We don't forgot your notes.",
                    'reset':'Updating notes is even easier than reseting a password.'
                }

export default function Authenticate({page,token}){
    return (
        <div className='d-flex justify-content-end'>
            <div className='d-md-flex d-lg-flex  d-xl-flex d-none position-fixed bg-black p-0 col-xl-4 col-lg-5 col-md-6 justify-content-center align-items-center' style={{minHeight:'100vh',top:0,left:0}}>
                <div className='col-12 col-lg-10 col-md-11' style={{minHeight:'80vh'}}>
                    <Link to='/' className='text-decoration-none text-white ff-mst my-4'><h3><b>N</b>oteskeeper.md</h3></Link>
                    <p className='h5 ff-mst text-white-50 my-4'>{taglines[page]}</p>
                </div>
            </div>
            <div className='bg-white col-12 col-xl-8 col-lg-7 col-md-6' style={{minHeight:'100vh'}}>
                <div className='col-12 d-flex justify-content-between align-items-center' style={{minHeight:'10vh'}}>
                    <NavLink page={page}/>
                </div>
                <div className='col-12 p-2 d-flex justify-content-center align-items-center' style={{minHeight:'80vh'}} >
                    <div className='col-12 col-md-10 col-lg-8 col-xl-6 p-0' >
                        <Component page={page} token={token} />
                    </div>
                </div>
            </div>
        </div>
        )
}