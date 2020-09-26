import React,{useState,useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBookmark} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import NewNotebook from './notebooks/NewNotebook'
import Alert from '@material-ui/lab/Alert'
import axios from 'axios'
import {connect} from 'react-redux'
import {setNotebooksArray} from '../../redux/notebooks/notebooks.actions'
import Notebook from './notebooks/Notebook'
import LinearProgress from '../UtilComponents/LinearProgress'
import Fade from '@material-ui/core/Fade'
import utils from '../../utils/index'
import AddButton from './AddButton'


const NotebookColumn = ({column}) => {
    return column.map(notebook=>{
            return <Notebook 
                    name={notebook.name} 
                    description={notebook.description}
                    key={notebook._id} 
                    createdAt={notebook.createdAt} 
                    notebook_id={notebook._id} 
                    />
            })
}

const NotebooksDisplay = ({notebooksArray}) =>{
    return notebooksArray.map((column,index)=>{
            return (<div className='col-12 col-lg-3 col-md-3 col-xl-3 p-2' style={{minHeight:'auto'}} key={index}>
                        <NotebookColumn column ={column} />
                    </div>)
            })
}

const DisplayArea = ({loading,error,notebooksArray}) => {
    if (loading) return <LinearProgress />
    else if (error.exist) {
        return (<div className='col-12 p-2 my-2'>
                    <Alert severity='error' className='col-12 my-2' variant='filled'>{error.msg}</Alert>
                </div>)
    } else if (notebooksArray.length === 0){
        return (<div className='col-12 p-2 my-2'>
                    <Alert severity='info' variant='filled'>No Notebook</Alert>
                </div>)
    } else {
        return <NotebooksDisplay notebooksArray={utils.createColumns(notebooksArray)} />
    }
}


function Notebooks(props){

    const [open,setopen] = useState(false)
    const [state,setstate] = useState({loading:true,error:false,msg:''})
    const [reset,setreset] = useState(true)
    
    useEffect(()=>{
        axios.get('/notesapi/readallnotebooks',{withCredentials:true})
        .then(res=>{
            switch(res.data.status){
                case 200: {
                    setstate({loading:false,error:false,msg:''})
                    props.setNotebooksArray(res.data.notebooks)
                    break;
                }
                case 500: setstate({loading:false,error:true,msg:'server error'});break;
                case 401: setstate({loading:false,error:true,msg:'Unauthorized'});break;
                default: console.log('Notesbook component Default exec');
            }
        }).catch(err=>{
            setstate({loading:false,error:true,msg:'server error'})
        })
    },[reset,])

    return (
        <Fade in={true}>
            <>
            <NewNotebook open={open} setopen={setopen}/>
            <AddButton setopen={setopen}/>
            <div className='col-12 my-2'>
                <div className='p-2'>
                    <Link to='/' className='h4 text-decoration-none text-dark ff-mst' onClick={()=>setreset(!reset)}>
                        <FontAwesomeIcon icon={faBookmark}/> Notebooks
                    </Link>
                </div>
                <div className='d-flex flex-wrap' style={{minHeight:'55vh'}}>
                    <DisplayArea 
                        loading ={state.loading}
                        error = {{exist:state.error,msg:state.msg}}
                        notebooksArray = {props.notebooksArray}
                    />
                </div>
            </div>
            </>
        </Fade>
    )
}

const mapStateToProps = state=>({
    notebooksArray:state.notebooks.notebooksArray
})

const mapDispatchToProps = dispatch => ({
    setNotebooksArray:array=>dispatch(setNotebooksArray(array))
})

export default connect(mapStateToProps,mapDispatchToProps)(Notebooks)