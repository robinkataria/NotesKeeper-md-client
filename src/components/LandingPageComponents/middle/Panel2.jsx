import React from "react";

import PreviewImage from "./PreviewImage";

function Panel2() {
    return (

        <div id="slider"
            className="carousel slide mx-4 "
            data-ride="carousel"
            data-keyboard="true"
            data-interval="3000"
        >
            <div className="carousel-inner carousel-container">
                <div className="carousel-item active">
                    <PreviewImage
                        heading="Easy to Create"
                        imgLink="./images/edit.jpg"
                        className="d-block w-100"
                        bgColor="firstColorBg"
                    />
                </div>
                <div className="carousel-item">
                    <PreviewImage
                        heading="Checkout Changes Simultaneously"
                        imgLink="./images/preview.jpg"
                        className="d-block w-100"
                        bgColor="secondColorBg"
                    />
                </div>
                <div className="carousel-item">
                    <PreviewImage
                        heading="Easy to Display"
                        imgLink="./images/display.jpg"
                        className="d-block w-100"
                        bgColor="firstColorBg"
                    />
                </div>
            </div>

            <a className="carousel-control-prev" href="#slider" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            </a>
            <a className="carousel-control-next" href="#slider" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
            </a>

        </div>

    );
}

export default Panel2;
