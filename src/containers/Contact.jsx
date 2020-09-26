import React from 'react'
import ContactForm from '../components/ContactComponents/ContactForm'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton'
import {Link} from 'react-router-dom'

export default function Contact({page}){
    return (
        <div className='d-flex justify-content-end'>
            <div className='d-md-flex d-lg-flex d-xl-flex d-none position-fixed bg-black p-0 col-xl-4 col-lg-5 col-md-5 justify-content-center align-items-center' style={{minHeight:'100vh',top:0,left:0}}>
                <div className='col-12 col-lg-10 col-md-11 d-flex flex-column justify-content-between' style={{minHeight:'80vh'}}>
                    <div>
                        <Link to='/' className='text-decoration-none text-white ff-mst my-4'><h3><b>N</b>oteskeeper.md</h3></Link>
                        <p className='h5 ff-mst text-white-50 my-4'>Taking notes helps to resolve future queries.</p>
                    </div>
                    <p className='py-2 text-white-50 m-0 fm mbl'>
                        Powered by  
                        <a href='https://inquiryscuttle.web.app' className='text-decoration-none text-white ml-2'>
                            <b>I</b>nquiry <b>S</b>cuttle
                        </a>
                    </p>
                </div>
            </div>
            <div className=' bg-white col-12 col-xl-8 col-lg-7 col-md-7' style={{minHeight:'100vh'}}>
                <div className='col-12 d-flex justify-content-between align-items-center' style={{minHeight:'10vh'}}>
                    <Link to='/' className='mr-2'>
                        <IconButton>
                            <ArrowBackIcon/>
                        </IconButton>
                    </Link>
                </div>
                <div className='col-12 p-2 d-flex justify-content-center align-items-center' style={{minHeight:'80vh'}} >
                    <div className='col-12 col-md-10 col-lg-8 col-xl-6 p-0' >
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
        )
}