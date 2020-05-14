import React from 'react';
import LinearProgress from './LinearProgress'

function PreLoader(){
    return (<div className='fullscreen d-flex justify-content-center align-items-center'>
                <div className='col-12 col-md-4 col-lg-4 col-xl-3 d-flex flex-column align-items-center'>
                    <img className='img-fluid my-2' src="/preloader.png" alt='preloader'></img>
                    <LinearProgress />
                </div>
            </div>)
}

export default PreLoader