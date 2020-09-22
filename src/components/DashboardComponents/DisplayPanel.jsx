import React,{useEffect,useState} from 'react'
import {connect} from 'react-redux'
import {setNote} from '../../redux/notebooks/notebooks.actions'
import PreLoader from '../UtilComponents/PreLoader'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Alert from '@material-ui/lab/Alert'
import Fade from '@material-ui/core/Fade'
import Divider from '@material-ui/core/Divider'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBookmark,faCode} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import Prism from 'prismjs';
import { CircularProgress } from '@material-ui/core';
import history from '../../history'
import axios from 'axios'
import ReactMarkdown from 'react-markdown';
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

function DisplayPanel(props){

    const [state,setstate] = useState({loading:true,error:false,msg:''})
    const [progress,setprogress] = useState(false)
    const [err,seterror] = useState({exist:0,msg:''})

    useEffect(()=>{
        axios.post('/notesapi/readnote',{
            notebook_id:props.notebook_id || '',
            note_id:props.note_id || ''
        },{withCredentials:true})
        .then(result=>{
            let status = result.data.status
            if(status === 500){
                    setstate({...state,loading:false,error:true,msg:'server error'})
                }else if(status === 423){
                    setstate({...state,loading:false,error:true,msg:'Insufficent data'})
                }else if(status === 401){
                    setstate({...state,loading:false,error:true,msg:'unauthorized_access'})
                }else if(status === 200){
                    setstate({...state,loading:false})
                    props.setNote(result.data.note)
                    Prism.highlightAll();
                }
        }).catch(err=>{
            setstate({...state,loading:false,error:true,msg:'server error'})
        })
    },[])

    const deleteNote = ()=>{
        setprogress(true)
        axios.post('/notesapi/deletenote',{
            note_id:props.note_id || '',
            notebook_id:props.notebook_id || ''
        },{withCredentials:true})
        .then(result=>{
            setprogress(false)
            let status = result.data.status
            if(status === 500){
                seterror({...err,exist:1,msg:'sever error'}) 
            }else if(status === 401){
                seterror({...err,exist:1,msg:'unauthorized access'})
            }else if(status === 423){
                seterror({...err,exist:1,msg:'Insufficient data'})
            }else if(status === 200){
                history.push('/readnotebook/'+(props.notebook_id || ''))
            }
        })
        .catch(err=>{
            setprogress(false)
            seterror({...err,exist:1,msg:'sever error'})
        })
    }

    if(state.loading){
        return <PreLoader/>
    }else if(state.error){
        return (<div className='fullscreen justify-content-center align-items-center d-flex'>
                     <Alert severity='error' variant='filled' >{state.msg}</Alert>
                </div>)
    }else{
        return (<Fade in={true}>
                    <>
                    <div className='d-flex justify-content-center'>
                        <div className='col-12 my-2'>
                            <div className='my-3'>
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Link to={'/readnotebook/'+(props.notebook_id || '')} >
                                        <FontAwesomeIcon icon={faBookmark}/> {props.note.notebook_name || ''}
                                    </Link>
                                    <label className='my-auto text-dark'>
                                        <FontAwesomeIcon icon={faCode}/> {props.note.name || ''}
                                    </label>
                                </Breadcrumbs>
                            </div>
                            <div className="d-flex  flex-row justify-content-between p-2 fm  border bg-light rounded-top align-items-center">
                                <div>
                                    <ul className="list-inline m-0">
                                        <li className="list-inline-item" >{Buffer.byteLength(props.note.data,'utf-8')} bytes</li>
                                    </ul>
                                </div>
                                <div>
                                    <IconButton onClick={()=>history.push('/editnote/'+(props.notebook_id || '')+'/'+(props.note_id || ''))}
                                        className="mr-1" >
                                            <EditIcon/>
                                    </IconButton>
                                    {(progress)?<div className='ml-1'><CircularProgress/></div>:
                                    <IconButton className=" mx-1" disabled={progress} onClick={deleteNote}>
                                        <DeleteIcon/>
                                    </IconButton>
                                    }
                                </div>
                            </div>
                            {(err.exist === 1)?<Alert severity='error' variant='filled'>{err.msg}</Alert>:<></>}
                            <Fade in={true}>
                                <div className=" p-4 m-0 fm border rounded-bottom " style={{minHeight:'70vh'}}>
                                    <ReactMarkdown source={props.note.data} />
                                </div>
                            </Fade>
                        </div>
                    </div>
                    </>
                </Fade>)
    }
}

const mapStateToProps = state=>({
    note:state.notebooks.note
})

const mapDispatchToProps = dispatch =>({
    setNote:note=>dispatch(setNote(note))
})

export default connect(mapStateToProps,mapDispatchToProps)(DisplayPanel)