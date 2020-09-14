import React from 'react'
import Alert from '@material-ui/lab/Alert'

export default function Message({email,title,message}){
    return (
        <div className='form-group my-2'>
            <Alert severity='info' variant='outlined'>
                <p className='text-break ff-mst'>{title}</p>
                <h5><b> {email} </b></h5>
                <p className='fm ff-mst'>
                    <span>
                        {message}
                    </span>
                    <strong className='text-nowrap'> - Check it out</strong>
                </p>
            </Alert>
        </div>
    )
}

