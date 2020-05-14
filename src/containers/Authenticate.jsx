import React from 'react'
import Login from '../components/AuthenticateComponents/Login'
import Signup from '../components/AuthenticateComponents/Signup'
import CopyRight from '../components/UtilComponents/Copyright'
import LinkIcons from '../components/UtilComponents/LinkIcons'

function Authenticate(props){
    return (
        <div className='bg-dark'>
            <div className='fullscreen-2 d-flex flex-column align-items-center justify-content-center'>
                <div className='col-12 col-md-6 col-lg-4 col-xl-4 py-4 rounded bg-white shadow-lg my-4'>
                    {(props.page === 'login')?<Login transaction_id={props.transaction_id}/>:<Signup transaction_id={props.transaction_id}/>}
                    <div className='d-flex justify-content-between mt-2'>
                        <LinkIcons />
                        <CopyRight/>
                    </div>
                </div>
            </div>
        </div>
        )
}

export default Authenticate