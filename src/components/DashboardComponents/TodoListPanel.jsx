import React,{useEffect,useState} from 'react'
import Fade from '@material-ui/core/Fade'
import {setTodoList} from '../../redux/todos/todos.action'
import axios from 'axios'
import {connect} from 'react-redux'
import Alert from '@material-ui/lab/Alert'
import PreLoader from '../UtilComponents/PreLoader'
import Navbar from './Navbar'
import Divider from '@material-ui/core/Divider'
import {FontAwesomeIcon} from  '@fortawesome/react-fontawesome'
import {faList} from '@fortawesome/free-solid-svg-icons'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import {Link} from 'react-router-dom'
import Searchbar from './Searchbar'
import TodoItemEditor from './todos/TodoItemEditor'
import Task from  './todos/Task'


function TodoListPanel(props){

    const [search,setsearch] = useState(false)
    const [open,setopen] = useState(false)
    const [state,setstate] = useState({loading:true,error:false,msg:''})
    const [effect,applyEffect] = useState(true)

    useEffect(()=>{
        axios.post('/todosapi/readtodo',{todo_id:props.todo_id},{withCredentials:true})
        .then(result=>{
            let status =result.data.status
            switch(status){
                case 500: setstate({...state,loading:false,error:true,msg:'server error'});break;
                case 401: setstate({...state,loading:false,error:true,msg:'Unauthorized Access'});break;
                case 423: setstate({...state,loading:false,error:true,msg:'Insufficient data'});break;
                case 200: setstate({...state,loading:false});props.setTodoList(result.data.todolist);break;
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
                    <Navbar type='none'/>
                    <Divider />
                     <div className='d-flex justify-content-center'>
                        <div className='col-12 col-md-10 col-lg-8 my-2'>
                            <div className='my-1 d-flex justify-content-between align-items-center'>
                                <Link to={'/todos/readtodolist/'+(props.todo_id || '')} className='my-auto text-decoration-none text-dark h6' onClick={()=>applyEffect(!effect)}>
                                      <FontAwesomeIcon icon={faList}/>  {props.todoList.name}
                                </Link>
                                <IconButton onClick={()=>setopen(true)}>
                                    <AddIcon/>
                                </IconButton>
                            </div>
                        
                            <Divider/>
                            {(open)?<TodoItemEditor todo_id={props.todo_id} mode='new' setopen={setopen}/>:<></>}
                            <Divider />
                                <Searchbar type='notebooks' setsearch={setsearch}/>
                            <Divider/>
                            <div className='d-flex flex-wrap' style={{minHeight:'55vh'}}>
                                        {
                                            (props.todoList.items.length === 0)?
                                            <>
                                                {
                                                    (search)?
                                                        <div className='col-12 p-0 my-2'><Alert severity='info' variant='filled'>No Result Found</Alert></div>:
                                                        <div className='col-12 p-0 my-2'><Alert severity='info'  variant='filled'>Create Your First Task</Alert></div>
                                                }
                                            </>:
                                            <>
                                                {
                                                    props.todoList.items.map(task=>{
                                                        return <Task title={task.title} 
                                                                description={task.description}
                                                                key={task._id} Time={task.Time} 
                                                                task_id={task._id} 
                                                                todo_id={props.todo_id}
                                                                completed={task.completed}
                                                                />
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