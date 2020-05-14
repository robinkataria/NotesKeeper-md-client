import React,{useState,useRef} from 'react'
import {connect}  from 'react-redux'
import {setTodoList} from '../../../redux/todos/todos.action'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'
import Fade from '@material-ui/core/Fade'
import CircularProgress from '../../UtilComponents/CircularProgress'


function NewTodoItem(props){

    const taskTitle = useRef('')
    const taskDescription = useRef('')
    const taskDate = useRef('')

    const [progress,setprogress] = useState(false)
    const [err,setErr] = useState({exist:0,msg:''})
    const [rem,setrem] = useState({val:'',rem:200})
    const [success,setsuccess] = useState(false)

    const checkCount = ()=>{
        const desc = taskDescription.current.value 
        if(desc.length < 200){
            setrem({val:taskDescription.current.value,rem:200-desc.length})
        }else{
            setrem({val:rem.val,rem:0})
        }
    }

   

    const submitForm =(e)=>{
        e.preventDefault()
        setprogress(true)
            axios.post('/todosapi/createitem',{
                todo_id:props.todo_id,
                title:taskTitle.curret.value,
                description:taskDescription.current.value || '',
                Time:taskDate.current.value
            },{withCredentials:true})
            .then(result=>{
                setprogress(false)
                let status = result.data.status
                if(status === 200){
                    props.setTodoList(result.data.todolist)
                    setsuccess(true)
                }else if(status === 500){
                    setErr({exist:1,msg:'server error'})
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
return (<>
<Fade in={true}>
        <div className='col-12 sheild-panel d-flex justify-content-center align-items-center'>
            <div className='col-12 col-md-6 col-lg-6 bg-white rounded py-2' >
               <form onSubmit={submitForm} className = 'd-flex justify-content-between flex-column ' style={{height:'60vh'}}>
                   <div>
                        <label className='h5 my-2'>Enter Task Title</label>
                        <div className='form-group my-2'>
                            <input className='form-control' id='title' ref={taskTitle} required />
                        </div>
                        <div className='form-group my-2'>
                            <label className='fm my-auto'>Description <small>remaining characters {rem.rem}/200</small></label>
                            <input className='form-control' id='desc' onChange={checkCount} value={rem.val} ref={taskDescription} />
                        </div>
                        <div className='form-group my-2'>
                            <label className='fm my-auto'>Set Time</label>
                            <input className='form-control' id='date' type='datetime-local' ref={taskDate} min={new Date()} />
                        </div>
                        <div className='form-group my-2'>
                            {(err.exist === 1)?<Alert severity='error'>{err.msg}</Alert>:<></>}
                        </div>
                         <div className='form-group my-2'>
                            {(success && err.exist === 0)?<Alert severity='success' variant='filled'>Task SuccessFully Created</Alert>:<></>}
                        </div>
                    </div>
                    <div className='d-flex justify-content-end my-2'>
                        <button className='btn btn-outline-danger mr-2' disabled={progress} onClick={()=>props.setopen(false)}>Cancel</button>
                        {(progress)?<CircularProgress/>:
                        <button className='btn btn-outline-success' disabled={progress || err.exist === 1} type='submit'>Create</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    </Fade>
    </>)
}

const mapDispatchToProps = dispatch=>({
setTodoList:todolist=>dispatch(setTodoList(todolist))
})



export default connect(null,mapDispatchToProps)(NewTodoItem)