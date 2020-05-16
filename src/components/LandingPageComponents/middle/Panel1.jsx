import React from  'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFile } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

function Panel1(){
        return (
        <div className="p-1 p-md-4 p-lg-4">
            <div className="row m-0 d-flex justify-content-center align-items-center" style={{height:'80vh'}}>
                <div className="col-12 col-md-6 col-lg-6 d-flex flex-column align-items-center justify-content-center ">
                    <h3><FontAwesomeIcon icon={faFile}/><b>N</b>otesKeeper<span className='fm'>.md</span></h3>
                    <div className="lead text-break text-center">
                        <span>Write in Markdown , </span>
                        <span>Read in MarkUp</span> 
                    </div>
                    <div className="m-0" >
                        <hr />
                        <p className='text-center'>Create NoteBooks and Store your Notes inside them.</p>
                    </div>
                    <Link className="btn btn-outline-secondary btn-lg" to="/login" role="button">Create Your NoteBook</Link>
                </div>
            </div>
        </div>
        );
}

export default Panel1;