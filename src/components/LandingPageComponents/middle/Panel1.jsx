import React from  'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFile } from '@fortawesome/free-solid-svg-icons'

function Panel1(){
        return (
        <div className="p-1 p-md-4 p-lg-4">
            <div className="row m-0 d-flex justify-content-center align-items-center" style={{height:'80vh'}}>
                <div className="col-12 col-md-6 col-lg-6 d-flex flex-column align-items-center justify-content-center ">
                    <h1 className="display-4"><FontAwesomeIcon icon={faFile}/><b>N</b>otesKeeper<span style={{fontSize:'1.5rem'}}>.md</span></h1>
                    <p className="lead">Write in Markdown and Read in MarkUp </p>
                    <div className="m-0" >
                        <hr />
                        <p style={{textAlign:'center'}}>Create NoteBooks and Store your Notes inside them.</p>
                    </div>
                    <a className="btn btn-outline-secondary btn-lg" href="/login" role="button">Create Your NoteBook</a>
                </div>
            </div>
        </div>
        );
}

export default Panel1;