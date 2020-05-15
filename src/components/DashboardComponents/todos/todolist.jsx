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
    
    return (<Fade in={true}>
            <>
                <div className='d-flex justify-content-between border border-gray mb-2'>
                                <div className='bg-dark text-white col-1 d-flex justify-content-center align-items-center'>
                                    <FontAwesomeIcon icon={faList} size='lg' />
                                </div>
                                <Link to={'/todos/readtodolist/'+(props.todo_id || '')} className='h6 my-auto text-dark p-1 col-5 px-2' >
                                    {(props.name.length > 12)?props.name.substring(0,12)+'...':props.name}
                                </Link>
                                <label className='my-auto p-1 col-4 px-2'>
                                    {date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear()+' '+date.getHours()+':'+((date.getMinutes() <= 9)?'0'+date.getMinutes():date.getMinutes())}
                                </label>
                                {(progress)?<CircularProgress/>:
                                    <IconButton onClick={deleteList}>
                                        <DeleteIcon />
                                    </IconButton>
                                }
                </div>
                {
                    (error)?<div className='d-flex justify-content-between border border-gray mb-2'>
                        <Alert variant='filled' severity='error'>Error ocuured While Deleteing the list</Alert>
                        </div>:<></>
                }
                </>
            </Fade>
    )
}


const mapDispatchToProps = dispatch=>({
setTodosArray : array=>dispatch(setTodosArray(array))
})

export default connect(null,mapDispatchToProps)(TodoList)