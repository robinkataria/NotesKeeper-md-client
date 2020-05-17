import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

function Brand(props) {
    return (
        <Link to="/" className="text-decoration-none mb-2">
            <span
                className={
                    props.color === "dark" ? "fxl text-dark" : "fxl text-white"
                }
            >
                <FontAwesomeIcon
                    icon={faFile}
                    className={
                        props.color === "dark" ? "text-dark" : "text-white"
                    }
                />
                <b> N</b>otes<b>K</b>eeper
            </span>
            <span
                className={
                    props.color === "dark"
                        ? "fsm text-muted"
                        : "fsm text-white-50"
                }
            >
                .md
            </span>
        </Link>
    );
}

export default Brand;
