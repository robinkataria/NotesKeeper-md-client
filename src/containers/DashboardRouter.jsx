import React from 'react';
import {Route,Redirect,Switch} from 'react-router-dom'
import Notebooks from '../components/DashboardComponents/Notebooks'
import Todos from '../components/DashboardComponents/Todos'
import Notes from '../components/DashboardComponents/Notes'
import EditPanel from '../components/DashboardComponents/EditPanel'
import DisplayPanel from '../components/DashboardComponents/DisplayPanel'
import TodoListPanel from '../components/DashboardComponents/TodoListPanel'

export default function DashboardRouter(){

    return (<Switch>
                        <Route exact path ='/' component={Notebooks} />
                        <Route exact path ='/todos' component={Todos} />
                        <Route exact path = '/todos/readtodolist/:todo_id' component={(prop)=>{
                            const todo_id = prop.match.params.todo_id
                            return <TodoListPanel todo_id={todo_id} />
                        }} />
                        <Route exact path ='/readnotebook/:notebook_id' component={(prop)=>{
                            const notebook_id = prop.match.params.notebook_id
                            return <Notes notebook_id={notebook_id} />
                        }} />
                        <Route exact path ='/newnote/:notebook_id' component={(prop)=>{
                            const notebook_id = prop.match.params.notebook_id
                            return <EditPanel notebook_id={notebook_id} mode='new' />
                        }} />
                        <Route exact path ='/editnote/:notebook_id/:note_id' component={(prop)=>{
                            const {notebook_id,note_id} = prop.match.params
                            return <EditPanel notebook_id={notebook_id} note_id={note_id} mode='edit' />
                        }} />
                        <Route exact path = '/readnote/:notebook_id/:note_id' component={(prop)=>{
                            const {notebook_id,note_id} = prop.match.params
                            return <DisplayPanel notebook_id={notebook_id} note_id={note_id} />
                        }} />
                        <Route>
                            <Redirect to = '/'/>
                        </Route>
                    </Switch>
    )
}



