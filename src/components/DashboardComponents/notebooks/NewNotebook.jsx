import React,{useState,useRef} from 'react'
import Fade from '@material-ui/core/Fade'
import axios from 'axios'
import LinearProgress from '../../UtilComponents/LinearProgress'
import Alert from '@material-ui/lab/Alert'
import {setNotebooksArray} from '../../../redux/notebooks/notebooks.actions'
import {connect} from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import CancelIcon from '@material-ui/icons/Cancel'

function NewNotebook(props){

    const notebookName = useRef('')
    const notebookDescription = useRef('')

    const [progress,setprogress] = useState(false)

    const [err,setErr] = useState({exist:0,msg:''})

    const [rem,setrem] = useState({val:'',rem:200})
    const [success,setsuccess] = useState(false)

    const checkCount = ()=>{
        const desc = notebookDescription.current.value 
        if(desc.length < 200){
            setrem({val:notebookDescription.current.value,rem:200-desc.length})
        }else{
            setrem({val:rem.val,rem:0})
        }
    }


    const submitForm =(e)=>{
        e.preventDefault()
        setprogress(true)
            axios.post('/notesapi/createnotebook',{
                    name:notebookName.current.value,
                    description:notebookDescription.current.value || ''
            },{withCredentials:true})
            .then(result=>{
                setprogress(false)
                let status = result.data.status
                if(status === 200){
                    props.setNotebooksArray(result.data.notebooks)
                    setsuccess(true)
                }else if(status === 500){
                    setErr({exist:1,msg:'server error'})
                }else if(status === 422){
                    setErr({exist:1,msg:'NoteBook with this Name Aleready Exist'})
                }else if(status === 423){
                    setErr({exist:1,msg:'Insufficient data sent'})
                }else if(status === 401){
                    setErr({exist:1,msg:'Unauthorized'})
                }
            }).catch(err=>{
                setprogress(false)
                setErr({exist:1,msg:'server error'})
            })
    
    }

if( props.open == true) {
return(
    <Fade in={true}>
        <div className='sheild-panel p-2 d-flex flex-column justify-content-center align-items-center'>
               <form 
                    onSubmit={submitForm} 
                    className='col-12 col-md-8 col-lg-6 bg-white rounded d-flex flex-column p-4' 
                    >
                    <div className='d-flex justify-content-end p-0 text-muted'>
                        <IconButton color='inherit' size='small' disabled={progress} onClick={()=>props.setopen(false)}>
                            <CancelIcon />
                        </IconButton>
                    </div>
                   <div>
                        <div className='form-group my-2'>
                            {(progress)?<LinearProgress/>:<></>}
                        </div>
                        <p className='my-1 ff-mst bold'>Enter a Name for Your Notebook</p>
                        <p className='my-1 fsm ff-mst text-muted'>Name needs to be different from other Notebooks</p>
                        <div className='form-group my-2'>
                            <input className='form-control' id='nbname' ref={notebookName} required />
                        </div>
                        <div className='form-group my-2'>
                            <p className='my-1 ff-mst'>Description </p>
                            <p className='my-1 text-muted ff-mst fsm'>Remaining characters {rem.rem}/200</p>
                            <textarea 
                                className='form-control' 
                                rows='7' 
                                id='nbdesc' 
                                onChange={checkCount} 
                                value={rem.val} 
                                style={{resize:'none'}}
                                ref={notebookDescription} ></textarea>
                        </div>
                        <div className='form-group my-2'>
                            {(err.exist === 1)?<Alert severity='error'>{err.msg}</Alert>:<></>}
                        </div>
                         <div className='form-group my-2'>
                            {(success && err.exist === 0)?<Alert severity='success' variant='filled'>Notebook SuccessFully Created</Alert>:<></>}
                        </div>
                    </div>
                    <div className='d-flex justify-content-end my-2'>
                        <button className='btn btn-primary shadow ' disabled={progress || err.exist === 1} type='submit'>Create</button>
                    </div>
                </form>
        </div>
    </Fade>
)
}else return <></>

}

const mapDispatchToProps = dispatch =>({
    setNotebooksArray:array=>dispatch(setNotebooksArray(array))
})

export default connect(null,mapDispatchToProps)(NewNotebook)