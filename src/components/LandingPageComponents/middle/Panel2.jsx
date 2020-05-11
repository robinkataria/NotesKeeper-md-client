import React from  'react';
import Createarea1 from './Createarea1';
import Createarea2 from './Createarea2';
import Createarea3 from './Createarea3';


function Panel2(){
        return (
        <div className=" p-1 p-md-4 p-lg-4">
            <Createarea1 />
            <Createarea2 />
            <Createarea3 />
        </div>
        );
}

export default Panel2;