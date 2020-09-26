import React,{useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Checkbox from '@material-ui/core/Checkbox';
import TodoItemEditor  from './TodoItemEditor'
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
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
            
                 <div className='d-flex flex-column shadow ' >
                    <div className={(props.completed)?
                        'bg-info d-flex flex-wrap px-2  justify-content-between align-items-center':
                        (date.getTime() > (new Date()).getTime())?
                        'bg-light d-flex flex-wrap px-2 justify-content-between align-items-center':
                        'bg-warning d-flex flex-wrap px-2 justify-content-between align-items-center'}>
                        <div>
                            <FontAwesomeIcon icon={faThumbtack} />
                        </div>
                        <div className='text-white'>
                            <IconButton size='small' className='mr-1' onClick={()=>setopen(true)}>
                                <EditIcon/>
                            </IconButton>
                            {(progress && progress.button === 'delete')?<CircularProgress/>:
                            <IconButton size='small' className='mr-1' disabled={progress.flag} onClick={deleteTask} >
                                <DeleteIcon/>
                            </IconButton>
                            }
                            <Checkbox key={props.keyvalue} size='small'  onChange={(e)=>{
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
                        <div className='text-break ff-mst fl text-capitalize my-2'>
                            {props.title}
                        </div>
                        {(props.description === '')?<></>:
                        <div className='text-dark text-break ff-mst fm'> 
                            <span className='fm'>
                                {props.description}
                            </span>
                        </div>}
                        {(props.completed)?<></>:<div className='p-1 my-2 rounded  text-break' style={{border:'1px dashed black'}}>
                            <span className='ff-mst' >Dead Line </span> 
                            <span className='ff-mst fm'>
                                {date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear()+' '+date.getHours()+':'+((date.getMinutes() <= 9)?'0'+date.getMinutes():date.getMinutes())}
                            </span>
                        </div>}
                        <div >
                            {(progress.flag && progress.button === 'complete')?<CircularProgress/>:
                                    <>{(props.completed)?
                                        <p className='my-2 btn btn-dark ff-mst'>Task Completed !!</p>:
                                        <button className='fm btn btn-success my-2  rounded' disabled={progress.flag} onClick={markCompleted}>Mark as completed</button>
                                        }
                            </>}
                        </div>
                    </div>
                    
                </div>
            
            </>)
}

const mapDispatchToProps = dispatch=>({
    setTodoList:todolist=>dispatch(setTodoList(todolist))
})

export default connect(null,mapDispatchToProps)(Task)