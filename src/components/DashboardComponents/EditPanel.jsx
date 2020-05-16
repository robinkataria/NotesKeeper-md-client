import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios';
import {connect} from 'react-redux'
import {setNote,setNotebook} from '../../redux/notebooks/notebooks.actions'
import PreLoader from '../UtilComponents/PreLoader'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Alert from '@material-ui/lab/Alert'
import Fade from '@material-ui/core/Fade'
import Divider from '@material-ui/core/Divider'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBookmark} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import Navbar from './Navbar'
import Showdown from 'showdown';
import ReactMde from 'react-mde';
import "react-mde/lib/styles/css/react-mde-all.css";
import "react-mde/lib/styles/css/react-mde.css";
import MdUpload from './editpanel/mdupload'
import history from '../../history'
import CircularProgress from '../UtilComponents/CircularProgress'


const Converter =  new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
});

function EditPanel(props){
    
    const name=useRef('')

    const message = useRef('')
    const [value, setValue] = useState('')
    const [selectedTab, setSelectedTab] = React.useState("write");
    const [state,setstate] = useState({loading:true,error:false,msg:''})
    const [err,seterror] = useState({name:{exist:0,msg:''},page:{exist:0,msg:''}})

    const [data,setdata] = useState({name:{value:'',rem:50},message:{value:'',rem:100}})
    const [Switch,setswitch] = useState('create')
    const [progress,setprogress] = useState(false)
    const [file,setFile] = useState(null)

    const findUrl = () =>{
       if(props.mode === 'edit'){
           return '/notesapi/readnote'
       }else{
           return '/notesapi/readnotebook'
       }
    }

    const generateResult = (dataobj)=>{
        if(props.mode === 'edit'){
             props.setNote(dataobj.note)
             setValue(dataobj.note.data)
             setdata({...data,name:{value:dataobj.note.name,rem:50}})
        }else{
             props.setNotebook(dataobj.notebook)
        }
    }

    useEffect(() => {
            axios.post(findUrl(),{
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
                    generateResult(result.data)
                    setstate({...state,loading:false})
                }
            }).catch(err=>{
                setstate({...state,loading:false,error:true,msg:'server error'})
            })
    },[]);
    //handling name input
    const handleNameChange = ()=>{
        if(name.current.value.length < 50){
            setdata({...data,name:{value:name.current.value,rem:500-message.current.value.length}})
        }else{
            setdata({...data,name:{value:data.name.value,rem:0}})
        }
    }
    //handling the commit input
    const handleCommitChange = ()=>{
        if(message.current.value.length < 100){
            setdata({...data,message:{value:message.current.value,rem:100-message.current.value.length}})
        }else{
            setdata({...data,message:{value:data.message.value,rem:0}})
        }
    }

    const noteUrl = ()=>{
        if(props.mode === 'edit'){
            return '/notesapi/editnote'
        }else{
            return '/notesapi/createnote'
        }
    }

    const uploadData = ()=>{
        
        if(file === null){
            seterror({...err,page:{exist:1,msg:'no file selected'}})
        }else{
        setprogress(true)
        let formdata = new FormData()
        formdata.append('name',name.current.value)
        formdata.append('type','file')
        formdata.append('notebook_id',props.notebook_id)
        formdata.append('message',(message.current.value || ''))
        formdata.append('data',file)
        axios.post('/notesapi/uploadnote',formdata,{withCredentials:true,headers:{'Content-Type':'multipart/form-data'}})
        .then(result=>{
            setprogress(false)
            let status = result.data.status
            if(status === 500){
                seterror({...err,page:{exist:1,msg:'server error'}})
            }else if(status === 423){
                seterror({...err,page:{exist:1,msg:'Insufficient data'}})
            }else if(status === 401){
                seterror({...err,page:{exist:1,msg:'Unauthorizes access'}})
            }else if(status === 422){
                seterror({...err,name:{exist:1,msg:'Name already exist'}})
            }else if(status === 200){
                props.setNote(result.data.note)
                history.push('/readnote/'+(props.notebook_id || '')+'/'+(result.data.note.id || ''))
            }
        }).catch(error=>{
            setprogress(false)
            seterror({...err,page:{exist:1,msg:'server error'}})
        })
        }
    }

    const bodyData=()=>{
        if(props.mode === 'edit'){
            return {
                note_id:props.note_id || '',
                name:name.current.value,
                data:value,
                notebook_id:props.notebook_id || '',
                message:message.current.value || '',
                onlydata:(props.note.name === name.current.value)?true:false
                }
        }else{
            return {
            name:name.current.value,
            type:'db',
            data:value,
            notebook_id:props.notebook_id,
            message:message.current.value || ''
            }
        }
    }

    //submit the Note
    const submitdata =()=>{

        setprogress(true)
        axios.post(noteUrl(),bodyData(),{withCredentials:true})
        .then(result=>{
            setprogress(false)
            let status = result.data.status
            if(status === 500){
                seterror({...err,page:{exist:1,msg:'server error'}})
            }else if(status === 423){
                seterror({...err,page:{exist:1,msg:'Insufficient data'}})
            }else if(status === 401){
                seterror({...err,page:{exist:1,msg:'Unauthorizes access'}})
            }else if(status === 422){
                seterror({...err,name:{exist:1,msg:'Name already exist'}})
            }else if(status === 200){
                props.setNote(result.data.note)
                history.push('/readnote/'+(props.notebook_id || '')+'/'+(result.data.note.id || ''))
            }
        }).catch(error=>{
            setprogress(false)
            seterror({...err,page:{exist:1,msg:'server error'}})
        })
    }
    //Reset
    const Reset = ()=>{
        setValue((props.mode === 'edit')?props.note.data || '':'')
        setdata({name:{value:(props.mode === 'edit')?(props.note.name || ''):'',rem:50},message:{value:'',rem:100}})
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
                    <Navbar type='none'/>
                    <Divider/>
                    <div className='d-flex justify-content-center'>
                        <div className='col-12 col-md-10 col-lg-8 my-2'>
                            <div className='my-3'>
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Link to={'/readnotebook/'+props.notebook_id} >
                                        <FontAwesomeIcon icon={faBookmark}/>{(props.mode === 'edit')?props.note.notebook_name:props.notebook.name}
                                    </Link>
                                    <div className='form-group my-2'>
                                        <input className='form-control' type='text' ref={name}  value={data.name.value} onChange={handleNameChange} />
                                        {(err.name.exist === 1)?
                                        <Fade in={true}>
                                            <Alert severity='error' className='my-2' variant='filled'>{err.name.msg}</Alert>
                                        </Fade>:<></>}
                                    </div>
                                </Breadcrumbs>
                            </div>
                            <Divider/>
                            <div className='d-flex my-3'>
                                    <button className={(Switch === 'create')?'btn btn-dark fm rounded mr-2':'btn btn-light fm rounded mr-2'}
                                    onClick={()=>setswitch('create')}>
                                        {(props.mode === 'edit')?'Edit':'Create'}
                                    </button>
                                    {(props.mode === 'edit')?<></>:
                                    <button className={(Switch === 'upload')?'btn btn-dark fm rounded':'btn btn-light fm rounded'}
                                        onClick={()=>setswitch('upload')} >
                                        Upload   
                                    </button>
                                    }
                            </div>
                            <Divider/>
                                {(Switch === 'create')?
                                <div style={{minHeight:'35vh'}}>
                                    <ReactMde
                                        value={value}
                                        onChange={setValue}
                                        selectedTab={selectedTab}
                                        onTabChange={()=>(selectedTab === 'write')?setSelectedTab('preview'):setSelectedTab('write')}
                                        generateMarkdownPreview={markdown =>
                                            Promise.resolve(Converter.makeHtml(markdown))
                                        }
                                    />
                                </div>:
                                <>
                                {
                                    (props.mode !== 'edit')?
                                        <div className='my-3' style={{minHeight:'15vh'}}>
                                            <MdUpload setFile={setFile}/>
                                        </div>
                                        :<></>
                                    }
                                </>
                                }
                            <Divider/>
                            <div className = 'form-group my-3'>
                                <label>Commit Message<small className='text-muted'> Remainig characters {data.message.rem}/100</small></label>
                                <input className='form-control' ref={message} type='text' onChange={handleCommitChange} value={data.message.value} />
                            </div>
                        
                            <Divider />
                            {(err.page.exist === 1)?<Alert severity='error' className='my-2' variant='filled'>{err.page.msg}</Alert>:<></>}
                            <div className = 'form-group my-3 d-flex justify-content-end'>
                                <button className='btn btn-outline-danger mr-1'  disabled={progress}  onClick={()=>history.push('/readnotebook/'+(props.notebook_id || ''))}>
                                    Cancel
                                </button>
                                <button className='btn btn-outline-info mx-1'  disabled={progress}  onClick={Reset} >
                                    Reset
                                </button>
                                {(progress)?<div className='ml-1'><CircularProgress/></div>:
                                <button className='btn btn-outline-success ml-1' onClick={()=>(Switch === 'create')?submitdata():uploadData()} disabled={progress} >
                                    Save
                                </button>}
                            </div>
                        </div>
                        </div>
                    </>
        </Fade>)
    }
    
}

const mapStateToProps = state=>({
    note:state.notebooks.note,
    notebook:state.notebooks.notebook
})

const mapDispatchToProps = dispatch=>({
setNote:note=>dispatch(setNote(note)),
setNotebook:notebook=>dispatch(setNotebook(notebook))
})

export default connect(mapStateToProps,mapDispatchToProps)(EditPanel)