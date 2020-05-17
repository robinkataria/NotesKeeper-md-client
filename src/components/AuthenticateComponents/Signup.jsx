import React from "react";
import Brand from "../UtilComponents/Brand";
import Stepper from "./SignupComponent/Stepper";
import Fade from "@material-ui/core/Fade";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

function Signup(props) {
    return (
        <Fade in={true}>
            <div className="border-bottom border-dark">
                <label className="h4 my-4 mx-3">
                    <Link to="/" className="text-decoration-none text-dark">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Link>

                    <span className="ml-3">
                        Register on&nbsp; <Brand color="dark" />
                    </span>
                </label>

                <Stepper />

                <div className="my-5 d-flex justify-content-center">
                    Already have an account?&nbsp;
                    <Link to="/login" className="text-decoration-none">
                        Sign in here
                    </Link>
                </div>
            </div>
        </Fade>
    );
}

export default Signup;

// Reviewed 18-5
