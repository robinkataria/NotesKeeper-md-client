import React,{useState,useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faListAlt} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import TodoList from './todos/todolist'
import Alert from '@material-ui/lab/Alert'
import axios from 'axios'
import {connect} from 'react-redux'
import {setTodosArray} from '../../redux/todos/todos.action'
import LinearProgress from '../UtilComponents/LinearProgress'
import Fade from '@material-ui/core/Fade'
import NewTodo from './todos/NewTodo'
import AddButton from './AddButton'


const DisplayArea = ({loading,error,todosArray}) => {
    if (loading) return <LinearProgress />
    else if (error.exist) {
        return (<div className='col-12 p-2 my-2'>
                    <Alert severity='error' className='col-12 my-2' variant='filled'>{error.msg}</Alert>
                </div>)
    } else if (todosArray.length === 0){
        return (<div className='col-12 p-2 my-2'>
                    <Alert severity='info' variant='filled'>No TodoList</Alert>
                </div>)
    } else {
        return todosArray.map( todo =>{
            return <TodoList createdAt={todo.createdAt} name={todo.name} key={todo._id} todo_id={todo._id} />
            })
    }
}

function Todos(props){

    const [open,setopen] = useState(false)

    const [state,setstate] = useState({loading:true,error:false,msg:''})

    const [reset,setreset] = useState(true)

   useEffect(()=>{
       axios.get('/todosapi/readalltodos',{withCredentials:true})
       .then(result=>{
            let status = result.data.status
            if(status === 500){
                setstate({loading:false,error:true,msg:'server error'})
            }else if(status === 401){
                setstate({loading:false,error:true,msg:'Unauthorized'})
            }else if(status === 200){
                setstate({loading:false,error:false,msg:''})
                props.setTodosArray(result.data.todos)
            }
       })
       .catch(err=>{
             setstate({loading:false,error:true,msg:'server error'})
       })
   },[reset,])

    return (
        <Fade in={true}>
            <>
                 <NewTodo open={open} setopen={setopen} />
                 <AddButton setopen={setopen}/>
                 <div className='d-flex justify-content-center'>
                <div className='col-12 my-2'>
                    <div className='p-2'>
                        <Link to='/' className='h4 text-decoration-none text-dark ff-mst' onClick={()=>setreset(!reset)}>
                            <FontAwesomeIcon icon={faListAlt}/> Todo lists
                        </Link>
                    </div>
                   
                    <div className='my-2' style={{minHeight:'50vh'}}>
                        <DisplayArea 
                            loading ={state.loading}
                            error = {{exist:state.error,msg:state.msg}}
                            todosArray = {props.todosArray}
                        />
                    </div>
                </div>
             </div>
            </>
        </Fade>
    )
}

const mapStateToProps = state=>({
    todosArray:state.todos.todosArray
})

const mapDispatchToProps = dispatch => ({
    setTodosArray:array=>dispatch(setTodosArray(array))
})

export default connect(mapStateToProps,mapDispatchToProps)(Todos)