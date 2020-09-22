import React from 'react';
import {Switch,Route} from 'react-router-dom'
import Searchbar from './Searchbar';


export default function SearchbarRouter(){
    return (
        <Switch>
            <Route exact path ='/' component={()=> <Searchbar type='notebooks' setsearch={(v)=>{}}/>} />
            <Route exact path ='/todos' component={()=> <Searchbar type='todos' setsearch={(v)=>{}}/>} />
            <Route exact path ='/readnotebook/:notebook_id' component={(prop)=>{
                            const notebook_id = prop.match.params.notebook_id
                            return <Searchbar type='notes' setsearch={(v)=>{}} notebook_id={notebook_id} />
                        }} />
            <Route exact path = '/todos/readtodolist/:todo_id' component={(prop)=>{
                            const todo_id = prop.match.params.todo_id
                            return <Searchbar type='todolist' todo_id={todo_id} setsearch={(v)=>{}}/>
                        }} />
        </Switch>
    )
}