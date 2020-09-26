import React,{useState,useRef} from 'react'
import Fade from '@material-ui/core/Fade'
import axios from 'axios'
import LinearProgress from '../../UtilComponents/LinearProgress'
import Alert from '@material-ui/lab/Alert'
import {setTodosArray} from '../../../redux/todos/todos.action'
import {connect} from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import CancelIcon from '@material-ui/icons/Cancel'

function NewTodo(props){

    const todoName = useRef('')

    const [progress,setprogress] = useState(false)

    const [err,setErr] = useState({exist:0,msg:''})

    const [success,setsuccess] = useState(false)


    const submitForm =(e)=>{
        e.preventDefault()
        setprogress(true)
            axios.post('/todosapi/createtodo',{
                    name:todoName.current.value,
            },{withCredentials:true})
            .then(result=>{
                setprogress(false)
                console.log(result.data)
                let status = result.data.status
                if(status === 200){
                    props.setTodosArray(result.data.todos)
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

    if (props.open){

return(
    <Fade in={true}>
        <div className='sheild-panel p-2 d-flex justify-content-center align-items-center'>
               <form 
                    onSubmit={submitForm} 
                    className = 'col-12 col-md-6 col-lg-6 bg-white rounded p-4 d-flex flex-column justify-content-between' 
                    style={{minHeight:'60vh'}}>
                   
                   <div>
                       <div className='d-flex justify-content-end p-0 text-muted'>
                            <IconButton color='inherit' size='small' disabled={progress} onClick={()=>props.setopen(false)}>
                                <CancelIcon />
                            </IconButton>
                        </div>
                        <div className='form-group my-2'>
                            {(progress)?<LinearProgress/>:<></>}
                        </div>
                        <p className='my-1 ff-mst bold'>Enter a Name for Your Todo List</p>
                        <p className='my-1 fsm ff-mst text-muted'>Name needs to be different from other Todo Lists</p>
                        <div className='form-group my-2'>
                            <input className='form-control' id='tdname'  ref={todoName} required />
                        </div>
                        <div className='form-group my-2'>
                            {(err.exist === 1)?<Alert severity='error'>{err.msg}</Alert>:<></>}
                        </div>
                         <div className='form-group my-2'>
                            {(success && err.exist === 0)?<Alert severity='success' variant='filled'>Todo List SuccessFully Created</Alert>:<></>}
                        </div>
                    </div>
                    <div className='d-flex justify-content-end my-2'>
                        <button className='btn btn-primary shadow' disabled={progress || err.exist === 1} type='submit'>Create</button>
                    </div>
                </form>
        </div>
    </Fade>
)
    }else return <></>

}

const mapDispatchToProps = dispatch =>({
    setTodosArray:array=>dispatch(setTodosArray(array))
})

export default connect(null,mapDispatchToProps)(NewTodo)