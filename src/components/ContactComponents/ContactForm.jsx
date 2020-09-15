import React,{useState} from 'react';
import Fade from '@material-ui/core/Fade'
import axios from 'axios'
import isEmail from '../../utils/validations/isEmail'
import Tooltip from '@material-ui/core/Tooltip'
import ErrorIcon from '@material-ui/icons/Error'
import Alert from '@material-ui/lab/Alert'
import CircularProgress from '@material-ui/core/CircularProgress'
import SendIcon from '@material-ui/icons/Send';


const validateName = (name)=>{
    if(name.length < 3 || name.includes(' ')){
        return false
    }else{
        return true
    }
}

function Contact(){

    const [state,setstate] = useState({
        error:{
            name:{exist:false,msg:''},
            email:{exist:false,msg:''},
            server:{exist:false,msg:''}
        },
        success:{exist:false,msg:''},
        name:'',
        email:'',
        message:{val:'',rem:500,open:false},
        progress:false
    })

    const submitForm = (e)=>{
        e.preventDefault()
        if(!isEmail(state.email)){
            setstate({...state,error:{...state.error,email:{exist:true,msg:'Invalid Email address'}}})
        }else if(!validateName(state.name.split(' ')[0])){
            setstate({...state,error:{...state.error,name:{exist:true,msg:'Name must contain atleast 3 characters without space in starting.'}}})
        }else{
            setstate({...state,progress:true})
            const data = {
                form_client_id:'5efc6a98b3b91100048c09bf-5f002dfce546b90004d76a64-1593866208216-inquiry-scuttle-form',
                inquiry:{
                    name:{
                        firstname:state.name.split(' ')[0],
                        middlename:'',
                        lastname:''
                    },
                    email:state.email,
                    message:state.message.val
                }
            }
            axios.post('https://inquiry-scuttle.herokuapp.com/clientapi/create/inquiry?form_type=csa',data)
            .then(result =>{
                switch(result.data.status){
                    case 200:{
                        setstate({
                            progress:false,
                            error:{
                               name:{exist:false,msg:''},
                                email:{exist:false,msg:''},
                                server:{exist:false,msg:''} 
                            },
                            success:{exist:true,msg:'Successfully recieved your message. We will get back to you as soon as We can.'},
                            message:{val:'',rem:500,open:false},
                            name:'',
                            email:''
                        });
                        break;
                    }
                    case 423:setstate({...state,progress:false,error:{...state.error,server:{exist:true,msg:`data validation error type: ${result.data.type}`}}});break
                    case 422:setstate({...state,progress:false,error:{...state.error,server:{exist:true,msg:`Page Under Maintenance`}}});break;
                    case 500:setstate({...state,progress:false,error:{...state.error,server:{exist:true,msg:'something went wrong at scuttle end.'}}});break;
                    default:console.log('contact page default exec')
                }
            }).catch(err=>{
                setstate({...state,progress:false,error:{...state.error,server:{exist:true,msg:'something went wrong at scuttle end.'}}})
            })
        }
    }

    const clearError = (type) => {
        switch(type){
            case 'name':setstate({...state,error:{...state.error,name:{exist:false,msg:''}}});break;
            case 'email':setstate({...state,error:{...state.error,name:{exist:false,msg:''}}});break;
            case 'server':setstate({...state,error:{
                    name:{exist:false,msg:''},
                    email:{exist:false,msg:''},
                    server:{exist:false,msg:''}
            }});break;
            default : console.log('def exec')
        }
    }

    const handleMessageChange = (e)=>{
        const m = e.target.value
        if(m.length <= 500){
            if(m.length === 0 ){
                setstate({...state,message:{val:'',rem:500,open:false}})
            }else{
                setstate({...state,message:{val:m,rem:500-m.length,open:true}})
            }
        }
    }

return (
    <Fade in={true}>
        <div className = 'p-4 shadow-lg bg-white rounded'>
           <form onSubmit={submitForm}>
            <label className='h3 my-2'>Let Us Evaluate</label>
            <label className='my-2 ff-mst text-muted'>Leave us a message with your Query</label>
            <div className='form-group my-2 d-flex align-items-center'>
                <input 
                    required
                    id="name"
                    className='form-control'
                    placeholder='Name'
                    value={state.name}
                    onChange={(e)=>setstate({...state,name:e.target.value})}
                    onFocus={()=>clearError('name')}
                />
                {
                    (state.error.name.exist)?
                    <Tooltip title={state.error.name.msg} arrow>
                        <ErrorIcon className='text-warning'/>
                    </Tooltip>:<></>
                }
            </div>
            <div className='form-group my-4 d-flex align-items-center'>
                <input
                    required
                    className='form-control'
                    id="email"
                    placeholder='Email'
                    value={state.email}
                    onChange={(e)=>setstate({...state,email:e.target.value})}
                    onFocus={()=>clearError('email')}
                    />
                {
                    (state.error.email.exist)?
                    <Tooltip title={state.error.email.msg} arrow>
                        <ErrorIcon className='text-warning'/>
                    </Tooltip>:<></>
                }
            </div>
            {
                (state.message.rem !== 500)?
                <p className='text-muted' style={{fontSize:'0.8rem'}}>Remaining Characters {state.message.rem}/500</p>
                :<></>
            }
             <div className='form-group  mb-4'>
                <textarea
                    required
                    className='form-control'
                    placeholder='Write your query here'
                    value={state.message.val}
                    onChange={handleMessageChange}
                    rows='4'
                    />
            </div>
            <div className='form-group my-4 d-flex justify-content-end'>
                {
                    (state.progress)?
                    <CircularProgress size={30}/>:
                    <div className='d-flex align-items-center'>
                        {(state.error.server.exist)?
                        <Tooltip arrow title = {state.error.msg}>
                            <ErrorIcon className='text-warning' />
                        </Tooltip>
                        :<></>
                        }
                        <button 
                        type='submit' 
                        onFocus={()=>clearError('server')}
                        disabled={state.progress} 
                        className = 'btn btn-dark'>
                          <SendIcon className='text-white'/>  SEND
                        </button>
                    </div>
                }
            </div>
            {
                (state.success.exist)?
                <div className='form-group my-4'>
                    <Alert variant='outlined' type='success'>{state.success.msg}</Alert>
                </div>
                :<></>
            }
        </form>
      </div>
    </Fade>
)
}

export default Contact