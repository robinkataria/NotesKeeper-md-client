import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLinkedin,faGithub} from '@fortawesome/free-brands-svg-icons'
import { faGlobe, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import  {Link} from 'react-router-dom'

const Developer = (props) => {
    return (<div>
                <span className='text-white-50'>{props.name}</span>
                <ul className='list-inline'>
                    {
                        props.links.map((link,index) => {
                            return (<li key={index} className='list-inline-item my-1 '>
                                        <a className='text-decoration-none text-muted' href={link.href}><FontAwesomeIcon icon={link.icon} /></a>
                                    </li>)
                        })
                    }
                </ul>
    </div>)
}

const developersArray = [
    {
        name:'Robin Kataria',
        links:[
            {href:'https://github.com/robinkataria',icon:faGithub},
            {href:'https://www.linkedin.com/in/robinkataria/',icon:faLinkedin}
        ]
    },
    {
        name:'Sharvan Sharma',
        links:[
            {href:'https://github.com/sharvan-sharma',icon:faGithub},
            {href:'https://www.linkedin.com/in/sharvan-sharma-b65452178/',icon:faLinkedin},
            {href:'https://codetosolve.vercel.app',icon:faGlobe}
        ]
    }
]

export default function LandingPageFoot(){
    const year = (new Date()).getFullYear()
    return (
        <div className='d-flex flex-column align-items-center bg-black col-12 p-4'>
            <div className='d-flex justify-content-center col-12 col-md-10 col-lg-9 border-bottom border-gray my-4 '>
                <div className='col-12 d-flex flex-column align-items-center py-4 mb-4'>
                    <h3 className='ff-mst text-white my-2 text-center'>Start taking notes with Noteskeeper.md</h3>
                    <div className='text-center text-white-50 my-2 col-12 col-lg-10 col-md-11 fm'>
                        Taking notes with Noteskeeper is super easy. 
                        You can create multiple notebooks to seprate your notes.
                        Todolists in Noteskeeper allow you to create, manage and track your daily tasks.
                    </div>
                    <Link to='/login' className='btn btn-light rounded-0 fm ff-mst my-2'>Create Notebook</Link>
                </div>
            </div>
            <div className='d-flex flex-wrap-reverse col-12 col-md-10 col-lg-9 my-4'>
                <div className='col-12 col-md-3 col-lg-3 my-2'>
                    <p className='m-0 text-white'><b>N</b>oteskeeper.md</p>
                    <p className='m-0 text-white-50 fm'>&copy; {year}</p>
                </div>
                <div className='col-12 col-md-3 col-lg-3 my-2'>
                    <p className='text-white m-0'>Developers</p>
                    <ul className='list-unstyled fm my-1'>
                        {
                            developersArray.map((developer,index) => {
                                return <li className='text-white-50' key={index}><Developer name={developer.name} links={developer.links} /></li>
                            })
                        }
                    </ul>
                </div>
                <div className='col-12 col-md-3 col-lg-3  my-2'>
                    <p className='text-white m-0'>Links</p>
                    <ul className='list-unstyled my-1 fm'>
                        <li className='my-1'><Link to='/about' className='text-decoration-none text-white-50'>About us</Link></li>
                        <li className='my-1'><Link to='/contact' className='text-decoration-none text-white-50 '>Contact</Link></li>
                    </ul>
                </div>
                <div className='col-12 col-md-3 col-lg-3 my-2'>
                    <a href='mailto:noteskeeper.md.service@gmail.com' className='text-decoration-none text-white' >
                        <FontAwesomeIcon icon={faEnvelope} /> 
                        <span className='text-white-50 fm'>  noteskeeper.md.service@gmail.com </span>
                    </a>
                </div>
            </div>
        </div>
    )
}