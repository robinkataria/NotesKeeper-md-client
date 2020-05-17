import React from "react";

function Tutorial({ heading, bgColor, imgLink }) {
    const headingColor = bgColor === "bg-light" ? "text-secondary" : "text-light";

    return (
        <div
            className={`row d-flex justify-content-center align-items-center py-5 ${bgColor}`}
        >
            <div className="col-12 d-flex justify-content-center py-5">
                <p className={`h2 ${headingColor}`}>{heading}</p>
            </div>
            <img
                src={imgLink}
                alt="create component"
                className="img-fluid rounded"
                style={{ boxShadow: "2px 2px 10px grey", borderRadius: "10px" }}
            ></img>
        </div>
    );
}

export default Tutorial;
