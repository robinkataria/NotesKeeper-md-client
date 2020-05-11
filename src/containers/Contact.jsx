import React from 'react';
import TextField from '@material-ui/core/TextField';
import BrandName  from '../components/UtilComponents/Brand'
import Fade from '@material-ui/core/Fade'

function Contact(){
return (
    <div className='d-flex justify-content-center align-items-center'>
        <div className = 'col-12 col-lg-6 col-md-8 col-xl-6 p-4'>
       <Fade in={true}>
           <form onSubmit={(e)=>e.preventDefault()}>
            <div>
                <BrandName/>
            </div>
            <div className='h3 mt-4 mb-2'>Let Us Evaluate</div>
            <div className='text-muted mb-4'>Leave us a message with your Query</div>
            <div className='form-group my-4'>
                <TextField
                    required
                    id="name"
                    label="Name"
                    placeholder='Enter Your Name'
                    variant="outlined"
                    defaultValue=''
                     fullWidth
                    />
            </div>
            <div className='form-group my-4'>
                <TextField
                    required
                     fullWidth
                    id="email"
                    label="Email"
                    defaultValue=""
                    placeholder='Enter Your Email'
                    variant="outlined"
                    />
            </div>
            <div className='form-group my-4'>
                <TextField
                    required
                     fullWidth
                    id="mobile"
                    label="Mobile Number"
                    placeholder='Enter Your Mobile Number'
                    defaultValue=""
                    variant="outlined"
                    />
            </div>
            <div className='form-group my-4'>
                <TextField
                    fullWidth
                    required
                    id="mail"
                    label="Tell Us About It"
                    placeholder='Write your query here'
                    defaultValue=""
                    variant="outlined"
                    rows='6'
                    multiline
                    />
            </div>
            <div className='form-group my-4 d-flex justify-content-end'>
                <button type='submit' className = 'btn btn-dark'>SEND</button>
            </div>
        </form>
        </Fade>
        </div>
    </div>
)
}

export default Contact