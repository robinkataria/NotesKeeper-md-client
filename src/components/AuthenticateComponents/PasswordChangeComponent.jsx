import React,{useState} from 'react'
import CopyRight from '../UtilComponents/Copyright'
import LinkIcons from '../UtilComponents/LinkIcons'
import Fade from '@material-ui/core/Fade'
import {Link} from 'react-router-dom'
import Brand from '../UtilComponents/Brand'
import axios from 'axios'
import LinearProgress from '../UtilComponents/LinearProgress'
import {connect} from 'react-redux'
import {setCurrentUser} from '../../redux/user/user.actions'
import Alert from '@material-ui/lab/Alert'

const PasswordForm = () => <div/>

function PasswordChangeComponent(props){
    const [err,seterr] =useState({exist:0,msg:''})
    const [progress,setprogress] = useState(false)

    const setdata = (obj)=>{
        setprogress(true)
        axios.post('/changepassword',obj,{withCredentials:true})
        .then(result=>{
            setprogress(false)
            switch(result.data.status){
                 case 200 :  props.setCurrentUser(result.data);break;
                 case 500 :  seterr({exist:1,msg:'server error'});break;
                 case 423 :  seterr({exist:1,msg:'Insufficient data'});break;
                 case 401 :  seterr({exist:1,msg:'unauthorized'});break;
                 default : return ''
            }
        })
        .catch(err=>{
            setprogress(false)
            seterr({exist:1,msg:'server error'})
        })
    }

    return (
         <div className='bg-dark'>
            <div className='fullscreen-2 d-flex flex-column align-items-center justify-content-center'>
                <div className='col-12 col-md-6 col-lg-4 col-xl-4 py-4 rounded bg-white shadow-lg my-4'>
                   <Fade in={true}>
                    <div className='col-12 border-bottom pb-2 border-dark'>
                        <Brand color='dark' />
                        {(err.exist === 1)?<div className='form-group my-2'><Alert severity='error' variant='filled'>{err.msg}</Alert></div>:<></>}
                        {(progress)?
                        <div className='d-flex flex-column align-items-center justify-content-center my-5'>
                            <img src='/preloader.png' className='img-fluid' alt=''></img>
                            <LinearProgress/>
                        </div>:
                        <div className='my-3'>
                            <PasswordForm data={{email:props.email}} setdata={setdata} />
                        </div>
                        }   
                        <div className='mt-5 mb-2 d-flex justify-content-center'>
                            Don't have an Account?<Link to='/signup' className='text-decoration-none'>Signup here</Link>
                        </div>
                    </div>
                    </Fade>
                     <div className='d-flex justify-content-between mt-2'>
                        <LinkIcons />
                        <CopyRight/>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: userObject => dispatch(setCurrentUser(userObject)),
})

export default connect(null,mapDispatchToProps)(PasswordChangeComponent)