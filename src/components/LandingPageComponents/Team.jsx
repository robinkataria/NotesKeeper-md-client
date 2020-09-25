import React from 'react'

const developers = [
    {
        link:'https://github.com/robinkataria',
        src:'https://media-exp1.licdn.com/dms/image/C5603AQFhcK-HZTZ0xA/profile-displayphoto-shrink_400_400/0?e=1605139200&v=beta&t=mENzYdZGGhXMKf4KyUGR7ovgt4LO1l1Uzy_8ph7EQh8'
    },
    {
        link:'https://github.com/sharvan-sharma',
        src:'https://avatars0.githubusercontent.com/u/22548047?s=460&u=e7b878f436e600a29b3feaac7e70fff5a03c9a1f&v=4'
    }
    
]

export default function Team(){
    return (
        <div className='col-12 d-flex justify-content-center align-items-center' style={{minHeight:'60vh'}}>
            <div className='col-12 col-lg-8 col-md-10 d-flex flex-column align-items-center'>
                <h3 className='ff-mst fl bold'>Team</h3>
                <p className='text-muted'>Meet our team of Developers</p>
                <div className='d-flex flex-wrap justify-content-center my-4'>
                    {
                        developers.map((developer,index) =>{ 
                        return (
                            <a href={developer.link} key = {index}>
                                <img src={developer.src} style={{width:'100px'}} className='shadow img-fluid rounded-circle mx-4' />
                            </a>)
                        })
                    }
                </div>
            </div>
        </div>

    )
}