import React, { useState, useEffect } from 'react';
import Navbar from '../DashboardComponents/Navbar'
import Divider from '@material-ui/core/Divider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faListAlt } from '@fortawesome/free-solid-svg-icons'
import Searchbar from './Searchbar'
import { Link } from 'react-router-dom'
import TodoList from './todos/todolist'
import Alert from '@material-ui/lab/Alert'
import axios from 'axios'
import { connect } from 'react-redux'
import { setTodosArray } from '../../redux/todos/todos.action'
import LinearProgress from '../UtilComponents/LinearProgress'
import Fade from '@material-ui/core/Fade'
import NewTodo from './todos/NewTodo'


function Todos(props) {

    const [open, setopen] = useState(false)

    const [state, setstate] = useState({ loading: true, error: false, msg: '' })
    const [search, setsearch] = useState(false)

    const [reset, setreset] = useState(true)

    useEffect(() => {
        axios.get('/todosapi/readalltodos', { withCredentials: true })
            .then(result => {
                let status = result.data.status
                if (status === 500) {
                    setstate({ loading: false, error: true, msg: 'server error' })
                } else if (status === 401) {
                    setstate({ loading: false, error: true, msg: 'Unauthorized' })
                } else if (status === 200) {
                    setstate({ loading: false, error: false, msg: '' })
                    props.setTodosArray(result.data.todos)
                }
            })
            .catch(err => {
                setstate({ loading: false, error: true, msg: 'server error' })
            })
    }, [reset,])

    return (
        <Fade in={true}>
            <>
                <Navbar type='todos' />
                <Divider />
                {(open) ? <NewTodo setopen={setopen} /> : <></>}
                <div className='d-flex justify-content-center'>
                    <div className='col-12 col-md-10 col-lg-8 my-2'>
                        <div className='d-flex align-items-center my-3'>
                            <Link to='/todos' className='h3 mr-auto text-decoration-none text-dark ' onClick={() => setreset(!reset)}>
                                <FontAwesomeIcon icon={faListAlt} /> Todo Lists
                            </Link>

                            <Searchbar type='todos' placeholder="Search your list" setsearch={setsearch} />

                            <button className='btn btn-dark ml-3' onClick={() => setopen(true)}>
                                <FontAwesomeIcon icon={faPlus} /> New Todo
                            </button>
                        </div>

                        <Divider />
                        <br />

                        <div className='my-2' style={{ minHeight: '50vh' }}>
                            {(state.loading) ? <LinearProgress /> : <>
                                {(state.error) ? <Alert severity='error' className='col-12 my-2' variant='filled'>{state.msg}</Alert> : <>
                                    {
                                        (props.todosArray.length === 0) ?
                                            <>
                                                {
                                                    (search) ?
                                                        <div className='col-12 p-0 my-2'><Alert severity='info' className='col-12 my-2' variant='filled'>No Result Found</Alert></div> :
                                                        <div className='col-12 p-0 my-2'><Alert severity='info' className='col-12 my-2' variant='filled'>Create Your First Todo List</Alert></div>
                                                }
                                            </> :
                                            <>
                                                {
                                                    props.todosArray.map(todo => {
                                                        return <TodoList createdAt={todo.createdAt} name={todo.name} key={todo._id} todo_id={todo._id} />
                                                    })
                                                }
                                            </>
                                    }
                                </>}
                            </>}

                        </div>
                    </div>
                </div>
            </>
        </Fade>
    )
}

const mapStateToProps = state => ({
    todosArray: state.todos.todosArray
})

const mapDispatchToProps = dispatch => ({
    setTodosArray: array => dispatch(setTodosArray(array))
})

export default connect(mapStateToProps, mapDispatchToProps)(Todos)