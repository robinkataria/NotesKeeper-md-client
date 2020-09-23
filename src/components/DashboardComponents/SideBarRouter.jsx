import React from 'react'
import {Switch,Route,Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBookmark,faListAlt,faPlus} from '@fortawesome/free-solid-svg-icons'

const NotebookTodoSidebar = ({active,toggler})=>{
    return (
        <div className='sidebar-links-group'>
            <Link to='/' onClick={toggler} className={(active === 'notebooks')?'sidebar-links-item-active':'sidebar-links-item'} >
                <FontAwesomeIcon icon={faBookmark}/> 
                <span> Notesbooks</span>
            </Link>
            <Link to='/todos' onClick={toggler} className={(active === 'todos')?'sidebar-links-item-active':'sidebar-links-item'}>
                <FontAwesomeIcon icon={faListAlt}/> 
                <span> Todo Lists</span>
            </Link>
        </div>
    )
}

const NotesSidebar = ({active,notebook_id,toggler})=>{
    return (
        <div className='sidebar-links-group'>
            <Link to={'/readnotebook/'+notebook_id} onClick={toggler} className={(active === 'notes')?'sidebar-links-item-active':'sidebar-links-item'} >
                <FontAwesomeIcon icon={faBookmark}/> 
                <span> Notes</span>
            </Link>
            <Link to={'/newnote/'+notebook_id} onClick={toggler} className={(active === 'create-note')?'sidebar-links-item-active':'sidebar-links-item'} >
                <FontAwesomeIcon icon={faPlus}/> 
                <span> Create Note</span>
            </Link>
        </div>
    )
}

const TodosSidebar = ({todo_id,toggler})=>{
    return (
        <div className='sidebar-links-group'>
            <Link to={'/todos/readtodolist/'+todo_id} className='sidebar-links-item-active' onClick={toggler} >
                <FontAwesomeIcon icon={faListAlt}/> 
                <span> Tasks</span>
            </Link>
        </div>
    )
}

export default function SideBarRouter({toggler}){
    return (
        <Switch>
            <Route exact path ='/' component={()=> <NotebookTodoSidebar toggler={toggler} active='notebooks' />} />
            <Route exact path ='/todos' component={()=><NotebookTodoSidebar toggler={toggler} active='todos' />} />
            <Route exact path ='/readnotebook/:notebook_id' component={(prop)=>{
                            const notebook_id = prop.match.params.notebook_id
                            return <NotesSidebar toggler={toggler} active='notes' notebook_id={notebook_id} />
                        }} />
             <Route exact path ='/newnote/:notebook_id' component={(prop)=>{
                            const notebook_id = prop.match.params.notebook_id
                            return <NotesSidebar toggler={toggler} active='create-note' notebook_id={notebook_id} />
                        }} />
            <Route exact path = '/todos/readtodolist/:todo_id' component={(prop)=>{
                            const todo_id = prop.match.params.todo_id
                            return <TodosSidebar toggler={toggler} todo_id={todo_id} />
                        }} />
            <Route exact path = '/readnote/:notebook_id/:note_id' component={(prop)=>{
                            const {notebook_id,note_id} = prop.match.params
                            return <NotesSidebar toggler={toggler} notebook_id={notebook_id} />
                        }} />
        </Switch>
    )
}