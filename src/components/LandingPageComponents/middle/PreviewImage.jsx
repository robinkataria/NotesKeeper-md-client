import React from "react";

import "./PreviewImage.styles.css"

function PreviewImage({ heading, bgColor, imgLink }) {
    const headingColor = bgColor === "firstColorBg" ? "secondColor" : "firstColor";

    return (
        <div className={`row d-flex justify-content-center align-items-center py-5 ${bgColor}`} >
            <div className="col-12 d-flex justify-content-center pt-2 pb-5">
                <p className={`h2 ${headingColor}`}>{heading}</p>
            </div>

            <img
                src={imgLink}
                alt="tutorial preview"
                className={`img-fluid image-styles `}
            />
        </div>
    );
}

export default PreviewImage;