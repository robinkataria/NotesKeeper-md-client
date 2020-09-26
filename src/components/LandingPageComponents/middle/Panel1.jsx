import React from  'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFile } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

export default function Panel1(){
     return(   
       <div className='col-12 header d-flex justify-content-center align-items-center' >
            <div className='col-12 col-md-10 col-lg-9 col-xl-9 d-flex align-items-center'>
                <div className='col-12 col-xl-4 col-lg-4 col-md-5'>
                    <h1 className='ff-mst'>
                        Manage all your notes in one place.
                    </h1>
                    <p className='text-muted'>
                        <span>Write in Markdown, </span>
                        <span>Read in Markup</span>
                    </p>
                    <Link to='/login' className='btn btn-dark rounded-0'>Create Notebook</Link>
                </div>
                <div className='d-none d-sm-none d-md-block col-xl-8 col-lg-8 col-md-7 '>
                    <img className='img-fluid rounded shadow ' src='./images/landing-product.jpg' alt='Notebooks Section Image' />
                </div>
            </div>
        </div>)
}

