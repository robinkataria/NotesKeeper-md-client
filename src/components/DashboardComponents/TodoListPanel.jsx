import React,{useEffect,useState} from 'react'
import Fade from '@material-ui/core/Fade'
import {setTodoList} from '../../redux/todos/todos.action'
import axios from 'axios'
import {connect} from 'react-redux'
import Alert from '@material-ui/lab/Alert'
import PreLoader from '../UtilComponents/PreLoader'
import {FontAwesomeIcon} from  '@fortawesome/react-fontawesome'
import {faList, faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import CancelIcon from '@material-ui/icons/Cancel'
import {Link} from 'react-router-dom'
import TodoItemEditor from './todos/TodoItemEditor'
import Task from  './todos/Task'
import Badge from '@material-ui/core/Badge'
import CircularProgress from '../UtilComponents/CircularProgress'
import utils from '../../utils'
import AddButton from './AddButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';






function TodoListPanel(props){

    const [open,setopen] = useState(false)
    const [state,setstate] = useState({loading:true,error:false,msg:''})
    const [effect,applyEffect] = useState(true)

    const [delarray,setDelArray] = useState({delete_array:[],completed:0})
    const [update,setupdate] = useState(true)
    const [progress,setprogress] = useState({flag:false,button:''})
    const [err,seterr] = useState({exist:0,msg:''})

    

    const addTaskIdToDelArray = (id,c)=>{
        let arr = delarray.delete_array
        arr.push(id)
        setDelArray({delete_array:arr,completed:((c)?delarray.completed+1:delarray.completed)})
    }

    const remTaskIdFromDelArray = (id,c)=>{
        const arr = delarray.delete_array.filter(task_id=>{
            if(task_id !== id){
                return task_id
            }
        })
        setDelArray({delete_array:arr,completed:((c)?delarray.completed-1:delarray.completed)})
    }

    const delUrl=(type)=>(type === 'some')?'/todosapi/deletemultipleitems':'/todosapi/deleteallitems'

    const deleteTasks = (type)=>{
        setprogress({flag:true,button:((type === 'some')?'some':'all')})
        axios.post(delUrl(type),{
            todo_id:props.todo_id,
            delete_array:delarray.delete_array,
            completed:delarray.completed
        },{withCredentials:true})
        .then(result=>{
            setprogress({flag:false,button:''})
            switch(result.data.status){
                case 200 : props.setTodoList(result.data.todolist);
                           setDelArray({delete_array:[],completed:0})
                           setupdate(!update);
                           break;
                case 423 : seterr({exist:1,msg:'Insufficient data'});break;
                case 401 : seterr({exist:1,msg:'unauthorized access'});break;
                case 500 : seterr({exist:1,msg:'server error'});break;
                default : return ''
            }
        })
        .catch(err=>{
             setprogress({flag:false,button:''})
            seterr({exist:1,msg:'server error'})
            
        })
    }


    useEffect(()=>{
        axios.post('/todosapi/readtodo',{todo_id:props.todo_id},{withCredentials:true})
        .then(result=>{
            let status =result.data.status
            switch(status){
                case 500: setstate({...state,loading:false,error:true,msg:'server error'});break;
                case 401: setstate({...state,loading:false,error:true,msg:'Unauthorized Access'});break;
                case 423: setstate({...state,loading:false,error:true,msg:'Insufficient data'});break;
                case 200: setstate({...state,loading:false});props.setTodoList(result.data.todolist);break;
                default : return ''
            }
        })
        .catch(err=>{
            setstate({...state,loading:false,error:true,msg:'server error'})
        })
    },[effect,])

    if(state.loading){
        return <PreLoader />
    }else if(state.error){
        return (<div className='d-flex fullscreen  justify-content-center align-items-center'>
                    <Alert severity='error' variant='filled'>{state.msg}</Alert>
                </div>)
    }else{
        return (<Fade in = {true} >
                    <>
                    <AddButton setopen={setopen}/>
                    {(open)?<TodoItemEditor todo_id={props.todo_id} mode='new' setopen={setopen}/>:<></>}
                     <div className='d-flex justify-content-center'>
                        <div className='col-12 my-2'>
                            <div className='my-1 d-flex justify-content-between align-items-center'>
                                <div className='d-flex align-items-center'>
                                    <Link to='/todos' className='text-decoration-none text-dark mr-2' >
                                        <IconButton>
                                            <ArrowBackIcon/>
                                        </IconButton>
                                    </Link>
                                    <Link to={'/todos/readtodolist/'+(props.todo_id || '')} className='fxl text-decoration-none text-dark ff-mst' onClick={()=>applyEffect(!effect)}>
                                        {props.todoList.name}
                                    </Link>
                                </div>
                                <div className='d-flex justify-content-center align-items-center' >
                                    {(progress.flag && progress.button === 'all')?
                                        <CircularProgress/>:
                                        <>
                                        {props.todoList.items.length === 0 ? <></>:
                                            <button className='mr-1 fm btn btn-danger' disabled={progress.flag} onClick={()=>deleteTasks('all')}>
                                                Delete All Tasks
                                            </button>
                                        }
                                        </>
                                    }
                                   {(delarray.delete_array.length === 0)?<></>:
                                   <>
                                    {
                                        (progress.flag && progress.button === 'some')?
                                            <CircularProgress/>:
                                            <IconButton className='mr-1' disabled={progress.flag} onClick={()=>deleteTasks('some')}>
                                                <Badge badgeContent={delarray.delete_array.length} color="secondary">
                                                    <DeleteIcon/>
                                                </Badge>
                                            </IconButton>
                                        }
                                    <IconButton className='mr-1' disabled={progress.flag} onClick={()=>{setDelArray({delete_array:[],completed:0});setupdate(!update)}}>
                                            <CancelIcon/>
                                    </IconButton>
                                    </>
                                    }
                                    
                                </div>
                            </div>
                            {(err.exist === 1)?<Alert severity='error' className='col-12 p-0 my-2' variant='filled'>{err.msg}</Alert>:<></>}
                            <div className='d-flex flex-wrap' style={{minHeight:'55vh'}}>
                                        {
                                            (props.todoList.items.length === 0)?
                                            <div className='col-12 p-0 my-2'><Alert severity='info' variant='filled'>No Result Found</Alert></div>:
                                            <>
                                                {
                                                    utils.createColumns(props.todoList.items).map((column,index)=>{
                                                       return (<div className='col-12 col-lg-3 col-md-3 col-xl-3 p-2' style={{minHeight:'auto'}} key={index}>
                                                                {
                                                                        column.map(task=>{
                                                                            return <Task 
                                                                                title={task.title} 
                                                                                description={task.description}
                                                                                key={task._id} 
                                                                                Time={task.Time} 
                                                                                task_id={task._id} 
                                                                                todo_id={props.todo_id}
                                                                                completed={task.completed}
                                                                                addTaskIdToDelArray={addTaskIdToDelArray}
                                                                                remTaskIdFromDelArray={remTaskIdFromDelArray}
                                                                                keyvalue={update}
                                                                                />
                                                                        })
                                                                    }
                                                                </div>)
                                                    })
                                                }
                                            </>
                                        }
            
                            </div>
                        </div>
                    </div>
                    </>
                </Fade>) 
    }
 
   
}

const mapStateToProps = state=>({
    todoList:state.todos.todoList
})

const mapDispatchToProps = dispatch=>({
    setTodoList:todolist=>dispatch(setTodoList(todolist))
})

export default connect(mapStateToProps,mapDispatchToProps)(TodoListPanel)