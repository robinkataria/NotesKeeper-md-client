import React from 'react'
import {Switch,Route,Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBookmark,faListAlt,faPlus} from '@fortawesome/free-solid-svg-icons'

const NotebookTodoSidebar = ({active})=>{
    return (
        <div className='sidebar-links-group'>
            <Link to='/' className={(active === 'notebooks')?'sidebar-links-item-active':'sidebar-links-item'} >
                <FontAwesomeIcon icon={faBookmark}/> 
                <span> Notesbooks</span>
            </Link>
            <Link to='/todos' className={(active === 'todos')?'sidebar-links-item-active':'sidebar-links-item'}>
                <FontAwesomeIcon icon={faListAlt}/> 
                <span> Todo Lists</span>
            </Link>
        </div>
    )
}

const NotesSidebar = ({active,notebook_id})=>{
    return (
        <div className='sidebar-links-group'>
            <Link to={'/readnotebook/'+notebook_id} className={(active === 'notes')?'sidebar-links-item-active':'sidebar-links-item'} >
                <FontAwesomeIcon icon={faBookmark}/> 
                <span> Notes</span>
            </Link>
            <Link to={'/newnote/'+notebook_id} className={(active === 'notebooks')?'sidebar-links-item-active':'sidebar-links-item'} >
                <FontAwesomeIcon icon={faPlus}/> 
                <span> Create Note</span>
            </Link>
        </div>
    )
}

const TodosSidebar = ({todo_id})=>{
    return (
        <div className='sidebar-links-group'>
            <Link to={'/todos/readtodolist/'+todo_id} className='sidebar-links-item-active' >
                <FontAwesomeIcon icon={faListAlt}/> 
                <span> Tasks</span>
            </Link>
        </div>
    )
}

export default function SideBarRouter(){
    return (
        <Switch>
            <Route exact path ='/' component={()=> <NotebookTodoSidebar active='notebooks' />} />
            <Route exact path ='/todos' component={()=><NotebookTodoSidebar active='todos' />} />
            <Route exact path ='/readnotebook/:notebook_id' component={(prop)=>{
                            const notebook_id = prop.match.params.notebook_id
                            return <NotesSidebar active='notes' notebook_id={notebook_id} />
                        }} />
             <Route exact path ='/newnote/:notebook_id' component={(prop)=>{
                            const notebook_id = prop.match.params.notebook_id
                            return <NotesSidebar active='create-note' notebook_id={notebook_id} />
                        }} />
            <Route exact path = '/todos/readtodolist/:todo_id' component={(prop)=>{
                            const todo_id = prop.match.params.todo_id
                            return <TodosSidebar todo_id={todo_id} />
                        }} />
        </Switch>
    )
}