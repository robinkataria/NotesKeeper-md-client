import React,{useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Checkbox from '@material-ui/core/Checkbox';
import TodoItemEditor  from './TodoItemEditor'
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import {connect} from 'react-redux'
import {setTodoList} from '../../../redux/todos/todos.action'
import axios from 'axios'
import CircularProgress from '../../UtilComponents/CircularProgress'
import Alert from '@material-ui/lab/Alert'


const info = 'p-2 bg-info'
const warning = 'p-2 bg-warning'
const white = 'p-2 bg-white'

function Task(props){

    const [open,setopen] = useState(false)
    const [err,setErr] = useState({exist:0,msg:''})
    const date = new Date(props.Time)
    const [progress,setprogress] = useState({flag:false,button:''})

    const markCompleted = ()=>{
        setprogress({flag:true,button:'complete'})
        if(!props.completed){
        axios.post('/todosapi/marktaskcompleted',{
            todo_id:props.todo_id,
            task_id:props.task_id
        },{withCredentials:true})
        .then(result=>{
            setprogress({flag:false,button:''})
            let status = result.data.status
            switch(status){
                case 200: props.setTodoList(result.data.todolist);break;
                case 500: setErr({exist:1,msg:'server error'});break;
                
                case 423: setErr({exist:1,msg:'insufficient data'});break;
                case 401: setErr({exist:1,msg:'unauthorized access'});break;
                default : return ''
            }

        }).catch(err=>{
            setprogress({flag:false,button:''})
            setErr({exist:1,msg:'server error'})
        })
    }
    }

    const deleteTask = ()=>{
        setprogress({flag:true,button:'delete'})
        axios.post('/todosapi/deleteitem',{
            todo_id:props.todo_id,
            task_id:props.task_id
        },{withCredentials:true})
        .then(result=>{
            setprogress({flag:false,button:''})
            let status = result.data.status
            switch(status){
                case 500: setErr({exist:1,msg:'server error'});break;
                case 200: props.setTodoList(result.data.todolist);break;
                case 423: setErr({exist:1,msg:'insufficient data'});break;
                case 401: setErr({exist:1,msg:'unauthorized access'});break;
                default : return ''
            }

        }).catch(err=>{
            setprogress({flag:false,button:''})
            setErr({exist:1,msg:'server error'})
        })
    }

    return (<>
                {(open)?<TodoItemEditor 
                    setopen={setopen} 
                    mode='edit' 
                    title={props.title}
                    description={props.description} 
                    Time={props.Time}
                    task_id={props.task_id}
                    todo_id={props.todo_id}
                     />
                :<></>}
            
                 <div className ='border border-dark rounded m-2 '>
                    <div className={(props.completed)?
                        'bg-info d-flex px-2 text-white justify-content-between align-items-center':
                        (date.getTime() > (new Date()).getTime())?
                        'bg-dark d-flex px-2 text-white justify-content-between align-items-center':
                        'bg-warning d-flex px-2 text-white justify-content-between align-items-center'}>
                        <FontAwesomeIcon icon={faThumbtack} />
                        <div className='text-white'>
                            <IconButton className='mr-1 text-white' onClick={()=>setopen(true)}>
                                <EditIcon/>
                            </IconButton>
                            <Checkbox className='text-white' key={props.keyvalue}  onChange={(e)=>{
                                if(e.target.checked){
                                    props.addTaskIdToDelArray(props.task_id,props.completed)
                                }else{
                                    props.remTaskIdFromDelArray(props.task_id,props.completed)
                                }
                            }} /> 
                        </div>
                    </div>
                    {(err.exist === 1)?<Alert severity='error' variant='filled'>{err.msg}</Alert>:<></>}
                    <div className={((props.completed)?info:(date.getTime() > (new Date()).getTime())?white:warning)}>
                        <div className='text-dark text-break'>
                            <span className='h5' >Title : </span>{props.title}
                        </div>
                        {(props.description === '')?<></>:<div className='text-dark text-break'>
                            <span className='h6' >Description : </span> 
                            <span className='fm'>
                                {props.description}
                            </span>
                        </div>}
                        {(props.completed)?<></>:<div className='p-1 my-1 rounded  text-break' style={{border:'1px dashed black'}}>
                            <p className='h6' >Dead Line</p> 
                            <p className='fm'>
                                {date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear()+' '+date.getHours()+':'+((date.getMinutes() <= 9)?'0'+date.getMinutes():date.getMinutes())}
                            </p>
                        </div>}
                        {(progress.flag && progress.button === 'complete')?<CircularProgress/>:
                                <>{(props.completed)?
                                    <label className='rounded text-white p-2 my-2 h4 mr-1'>Task Completed !!</label>:
                                    <button className='fm btn btn-success my-2 mr-1 rounded' disabled={progress.flag} onClick={markCompleted}>Mark as completed</button>
                                    }
                        </>}
                        {(progress && progress.button === 'delete')?<CircularProgress/>:
                        <button className='fm btn btn-danger my-1  rounded' disabled={progress.flag} onClick={deleteTask} >
                            Remove Task
                        </button>
                        }
                    </div>
                    
                </div>
            
            </>)
}

const mapDispatchToProps = dispatch=>({
    setTodoList:todolist=>dispatch(setTodoList(todolist))
})

export default connect(null,mapDispatchToProps)(Task)