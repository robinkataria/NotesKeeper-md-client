import React,{useState} from 'react'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faList} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import CircularProgress from '../../UtilComponents/CircularProgress'
import Alert from '@material-ui/lab/Alert'
import {connect} from 'react-redux'
import {setTodosArray} from '../../../redux/todos/todos.action'
import Fade from '@material-ui/core/Fade'
import {Link} from 'react-router-dom'

function TodoList(props){

    const [progress,setprogress] = useState(false)
    const [error,seterror] =useState(false)
    const date = new Date(props.createdAt)

    const deleteList = ()=>{
        setprogress(false)
        axios.post('/todosapi/deletetodo',{
            id:props.todo_id
        },{WithCredentials:true})
        .then(result=>{
            setprogress(true)
            let status = result.data.status
            if(status === 500){
               seterror(true)
            }else if(status === 401){
                seterror(true)
            }else if(status === 200){
                props.setTodosArray(result.data.todos)
            }
        }).catch(err=>{
            setprogress(false)
            seterror(true)
        })  
    }
    
    if (error){
        return (
            <div className='d-flex justify-content-between shadow-sm col-12 my-2'>
                <Alert variant='filled' severity='error'>Error ocuured While Deleteing the list</Alert>
            </div>
        )
    }else{

        return (<Fade in={true}>
                    <div className='d-flex justify-content-between flex-wrap rounded border shadow-sm my-2'>
                        <div className='d-none d-md-flex d-lg-flex d-xl-flex bg-dark text-white col-1  justify-content-center align-items-center'>
                            <FontAwesomeIcon icon={faList} size='lg' />
                        </div>
                        <div className='col-lg-5 col-md-5 col-xl-5 col-12 ff-mst my-auto p-3'>
                            <Link to={'/todos/readtodolist/'+(props.todo_id || '')} className='text-decoration-none text-dark' >
                                {(props.name.length > 25)?props.name.substring(0,25)+'...':props.name}
                            </Link>
                        </div>
                        <div className='col-lg-4 col-md-4 col-xl-4 col-9 ff-mst my-auto p-3'>
                            <span>
                                {date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear()+' '+date.getHours()+':'+((date.getMinutes() <= 9)?'0'+date.getMinutes():date.getMinutes())}
                            </span>
                        </div>
                        
                        {(progress)?<CircularProgress/>:
                                        <div>
                                            <IconButton  onClick={deleteList}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                        }
                    </div>
                </Fade>
        )
    }
}


const mapDispatchToProps = dispatch=>({
setTodosArray : array=>dispatch(setTodosArray(array))
})

export default connect(null,mapDispatchToProps)(TodoList)