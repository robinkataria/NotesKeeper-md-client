import React,{useState,useEffect} from 'react';
import Navbar from '../DashboardComponents/Navbar'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBookmark,faPlus} from '@fortawesome/free-solid-svg-icons'
import Divider from '@material-ui/core/Divider'
import {Link} from 'react-router-dom'
import Searchbar from './Searchbar'
import NewNotebook from './notebooks/NewNotebook'
import Alert from '@material-ui/lab/Alert'
import axios from 'axios'
import {connect} from 'react-redux'
import {setNotebooksArray} from '../../redux/notebooks/notebooks.actions'
import Notebook from './notebooks/Notebook'
import LinearProgress from '../UtilComponents/LinearProgress'
import Fade from '@material-ui/core/Fade'
import utils from '../../utils/index'

function Notebooks(props){

    const [open,setopen] = useState(false)

    const [state,setstate] = useState({loading:true,error:false,msg:''})

    const [search,setsearch] = useState(false)
    const [reset,setreset] = useState(true)
    
    useEffect(()=>{
        axios.get('/notesapi/readallnotebooks',{withCredentials:true})
        .then(result=>{
            let status = result.data.status
            if(status === 500){
                setstate({loading:false,error:true,msg:'server error'})
            }else if(status === 401){
                setstate({loading:false,error:true,msg:'Unauthorized'})
            }else if(status === 200){
                setstate({loading:false,error:false,msg:''})
                props.setNotebooksArray(result.data.notebooks)
            }
        }).catch(err=>{
            setstate({loading:false,error:true,msg:'server error'})
        })
    },[reset,])

    return (
        <Fade in={true}>
            <>
            <Navbar type='notebooks'/>
            <Divider/>
            <div className='d-flex justify-content-center'>
                <div className='col-12 col-md-10 col-lg-8 my-2'>
                    <div className='d-flex justify-content-between align-items-center my-3'>
                        <Link to='/' className='h3 my-auto text-decoration-none text-dark' onClick={()=>setreset(!reset)}>
                            <FontAwesomeIcon icon={faBookmark}/> Notebooks
                        </Link>
                        <button className='btn btn-dark' onClick={()=>setopen(true)}>
                            <FontAwesomeIcon icon={faPlus}/> New Notebook
                        </button>
                    </div>
                    {(open)?<NewNotebook setopen={setopen}/>:<></>}
                    <Divider />
                        <Searchbar type='notebooks' setsearch={setsearch}/>
                    <Divider/>
                    <div className='d-flex flex-wrap' style={{minHeight:'55vh'}}>
                        {(state.loading)?<LinearProgress/>:<>
                            {(state.error)?<Alert severity='error' className='col-12 my-2' variant='filled'>{state.msg}</Alert>:
                            <>
                                {
                                    (props.notebooksArray.length === 0)?
                                    <>
                                        {
                                            (search)?
                                                  <div className='col-12 p-0 my-2'><Alert severity='info' variant='filled'>No Result Found</Alert></div>:
                                                  <div className='col-12 p-0 my-2'><Alert severity='info'  variant='filled'>Create Your First Notebook</Alert></div>
                                        }
                                    </>:
                                    <>
                                        {
                                             utils.createColumns(props.notebooksArray).map((column,index)=>{
                                                       return (<div className='col-12 col-lg-3 col-md-3 col-xl-3 p-2' style={{minHeight:'auto'}} key={index}>
                                                                { column.map(notebook=>{
                                                                        return <Notebook name={notebook.name} description={notebook.description}
                                                                        key={notebook._id} createdAt={notebook.createdAt} notebook_id={notebook._id} />
                                                                    })
                                                                }
                                                                </div>)
                                                        })
                                        }
                                    </>
                                }
                            </>
                            }
                        </>}
                    </div>
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