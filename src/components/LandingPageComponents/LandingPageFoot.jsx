import React from 'react'
import CopyRight from '../UtilComponents/Copyright'
import LinkIcons from '../UtilComponents/LinkIcons'

export default function LandingPageFoot(){
    return (
        <div className='d-flex justify-content-between mx-4 my-5'>
            <LinkIcons />
            <CopyRight/>
        </div>
    )
}