import React from "react";

import Tutorial from "./Tutorial.component";

function Panel2() {
    return (
        <div className=" p-1 p-md-4 p-lg-4">
            <Tutorial
                heading="Easy to Create"
                imgLink="./images/edit.jpg"
                bgColor="bg-light"
            />
            <Tutorial
                heading="Checkout Changes Simaltaneously"
                imgLink="./images/preview.jpg"
                bgColor="bg-secondary"
            />
            <Tutorial
                heading="Easy To Display"
                imgLink="./images/display.jpg"
                bgColor="bg-light"
            />
        </div>
    );
}

export default Panel2;
