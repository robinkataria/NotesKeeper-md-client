import React, {useState} from 'react'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton'

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const Indicator = ({power})=>{
    switch(power){
        case 1: return <span className='btn btn-danger rounded-pill fsm p-0 px-2 ff-mst'>Weak</span>
        case 2: return <span className='btn btn-warning rounded-pill fsm p-0 px-2 ff-mst'>Medium</span>
        case 3: return <span className='btn btn-info rounded-pill fm p-0 px-2 ff-mst'>Good</span>
        case 4: return <span className='btn btn-success rounded-pill fm p-0 px-2 ff-mst'>Strong</span>
        default: return <></>
    }
}


export default function PasswordComponent({password,handlePasswordChange,power = 0,tip = false,label = ''}){

    const [state,setstate] = useState({visible:false})

    return  (
        <>
            <div className='form-group'>
                <div className='bold ff-mst d-flex justify-content-between'>
                    <label>{label}  <Indicator power={power}/></label>
                    {tip?
                    <HtmlTooltip
                        arrow 
                        title={<div>
                                    <p>Tips to make your password strong</p>
                                    <ul>
                                        <li>Password must be long.</li>
                                        <li>Make your password a nonsense phrase.</li>
                                        <li>Include numbers, symbols, uppercase and lowercase letters.</li>
                                        <li>Avoid using obvious personal information.</li>
                                        <li>Do not reuse password.</li>
                                    </ul>
                                </div>}
                    >
                        <InfoOutlinedIcon/>
                    </HtmlTooltip>:<></>}
                </div>
                <div className='form-control d-flex justify-content-between'>
                    <input className='password col-10 col-lg-11 col-md-11 px-0'
                      
                      type={state.visible?'text':'password'} 
                      onChange={handlePasswordChange}  
                      required 
                      minLength={8}
                      maxLength={30}
                      value={password} 
                     />
                    <IconButton size='small' onClick={()=>setstate({...state,visible:!state.visible})}>
                        {state.visible?<VisibilityIcon/>:<VisibilityOffIcon/>}
                    </IconButton>
                </div>

            </div>
        </>
    )
}