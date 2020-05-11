import React from 'react';
import CopyRight from '../components/UtilComponents/Copyright'
import LinkIcons from '../components/UtilComponents/LinkIcons'
import {Route,Redirect,Switch} from 'react-router-dom'
import {Fade,Divider} from '@material-ui/core'


function Dashboard(){

    return (
        <div >
                    
                    <Divider/>
                    <Switch>
                    <Route exact path ='/' component={()=>{
                        return <></>
                    }} />
                    <Route exact path ='/devconsole' component={()=>{
                        return (<Fade in={true}><></></Fade>)
                    }}/>
                    <Route exact path ='/devconsole/newproject' component={()=>{
                        return (<Fade in={true}><></></Fade>)
                    }} />
                    <Route exact path ='/devconsole/credentials/edit' component={(prop)=>{
                        
                        return <></>
                    }} />
                    
                    <Route>
                        <Redirect to = '/'/>
                    </Route>
                </Switch>
                <div className='d-flex justify-content-between p-4 border-top broder-gray'>
                        <LinkIcons/>
                        <CopyRight />
                </div>
                    
        </div>
    )
}

export default Dashboard;
