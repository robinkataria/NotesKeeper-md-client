import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

function LinkIcons() {
    return (
        <a
            href="https://github.com/robinkataria/NotesKeeper-md"
            className="text-decoration-none text-muted ml-2"
            target="_blank"
        >
            <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
            <span className="text-muted"> /robinkataria</span>
        </a>
    );
}

export default LinkIcons;
