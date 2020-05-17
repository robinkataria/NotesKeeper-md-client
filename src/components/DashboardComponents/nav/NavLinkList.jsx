import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function NavLinkList(props) {
    const [state, setstate] = useState(props.type);
    let active = "text-decoration-none rounded-pill btn btn-dark fm px-2 ";
    let inactive =
        "text-decoraton-none rounded-pill btn btn-outline-dark fm px-2";
    return (
        <div className="navbar-nav mx-auto ">
            <ul className="d-flex rounded-pill list-unstyled p-1 bg-light">
                <li className="nav-item mr-1 my-1">
                    <Link
                        className={state === "notebooks" ? active : inactive}
                        onClick={() => setstate("notebooks")}
                        to="/"
                    >
                        Notebooks
                    </Link>
                </li>
                <li className="nav-item ml-1 my-1">
                    <Link
                        className={state === "todos" ? active : inactive}
                        onClick={() => setstate("todos")}
                        to="/todos"
                    >
                        ToDos
                    </Link>
                </li>
            </ul>
        </div>
    );
}
