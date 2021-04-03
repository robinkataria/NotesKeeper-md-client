import axios from 'axios';
import React, { useEffect, useState } from 'react';

const OWNER = "robinkataria";
const REPOSITORY_NAME = "NotesKeeper.md-FRONTEND";
const GITHUB_REPOSITORY_CONTRIBUTORS_URL = `https://api.github.com/repos/${OWNER}/${REPOSITORY_NAME}/contributors`;
const DEPENDABOT_LOGIN = 'dependabot[bot]'

export default function Team(){
    const [contributors, setContributors] = useState([]);

    useEffect(() => {
        axios.get(GITHUB_REPOSITORY_CONTRIBUTORS_URL, {
            withCredentials:false
        })
        .then((response) => { 
            let contributors = [];
            response.data.forEach(contributor => {
                if (contributor["login"] !== DEPENDABOT_LOGIN) {
                    contributors.push({
                        login: contributor["login"],
                        src: contributor["avatar_url"],
                        link: contributor["html_url"]
                    });
                }
            });
            setContributors(contributors);
        })
        .catch(() => {})
    }, [])

    if (contributors.length === 0) {
        return <></>
    }

    return (
        <div className='col-12 d-flex justify-content-center align-items-center' style={{minHeight:'60vh'}}>
            <div className='col-12 col-lg-8 col-md-10 d-flex flex-column align-items-center'>
                <h3 className='ff-mst fl bold'>Team</h3>
                <p className='text-muted'>Meet our Contributors</p>
                <div className='d-flex flex-wrap justify-content-center my-4'>
                    {
                        contributors.map((contributor,index) =>{ 
                        return (
                            <a href={contributor.link} key = {index}>
                                <img src={contributor.src} alt={contributor.login} style={{width:'100px'}} className='shadow img-fluid rounded-circle mx-4' />
                            </a>)
                        })
                    }
                </div>
            </div>
        </div>
    )
}