import React, { useRef, useState } from "react";
import Brand from "../../UtilComponents/Brand";
import TextField from "@material-ui/core/TextField";
import Fade from "@material-ui/core/Fade";
import { Link } from "react-router-dom";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import LinearProgress from "../../UtilComponents/LinearProgress";

function ForgotPasswordForm(props) {
    const email = useRef("");

    const [err, setErr] = useState({ exist: 0, msg: "" });
    const [progress, setprogress] = useState(false);
    const [message, setMessage] = useState(false);

    const submitForm = (e) => {
        setprogress(true);
        e.preventDefault();
        axios
            .post(
                "/forgotpwd",
                { email: email.current.value },
                { withCredentials: true }
            )
            .then((result) => {
                setprogress(false);
                let status = result.data.status;
                if (status === 200) {
                    setMessage(true);
                } else if (status === 422) {
                    setErr({
                        exist: 1,
                        msg: "Email is not Registered with us",
                    });
                } else if (status === 423) {
                    setErr({ exist: 1, msg: "Insufficent Data" });
                } else if (status === 500) {
                    setErr({ exist: 1, msg: "Server Error" });
                }
            })
            .catch((err) => {
                setprogress(false);
                setErr({ ...err, exist: 1, msg: "server error" });
            });
    };

    return (
        <Fade in={true}>
            <form onSubmit={submitForm}>
                <div className="mt-4 mb-5">
                    <Brand color="dark" />
                </div>

                {message ? (
                    <div className="form-group my-5">
                        <Alert>
                            <h5 className="text-break">
                                Password reset link has been sent to
                                <b> {email.current.value}</b>
                            </h5>
                            <p>
                                This email contains a password reset link and it
                                will expire within 10 minutes of generation. So
                                <strong> check it</strong> as soon as possible.
                            </p>
                        </Alert>
                    </div>
                ) : (
                    <>
                        <label className="h5 mb-4">
                            Enter your registered email
                        </label>

                        {progress ? (
                            <div className="mb-3">
                                <LinearProgress />
                            </div>
                        ) : (
                            <></>
                        )}

                        {err.exist === 1 ? (
                            <Alert severity="error" className="mb-3">
                                {err.msg}
                            </Alert>
                        ) : (
                            <></>
                        )}

                        <div className="form-group">
                            <TextField
                                fullWidth
                                inputRef={email}
                                id="email"
                                label="Email"
                                type="email"
                                variant="outlined"
                                required
                            />
                        </div>

                        <div className="form-group d-flex justify-content-between mt-3 mb-5">
                            <button
                                className="btn btn-outline-dark"
                                onClick={() => props.setswitch("login")}
                            >
                                Cancel
                            </button>

                            <button
                                className="btn btn-dark "
                                type="submit"
                                disabled={progress}
                            >
                                Reset password
                            </button>
                        </div>
                    </>
                )}

                <div className="mb-1 d-flex justify-content-center">
                    Don't have an account?&nbsp;
                    <Link to="/signup" className="text-decoration-none">
                        Sign up here
                    </Link>
                </div>
            </form>
        </Fade>
    );
}

export default ForgotPasswordForm;

// Reviewed 17-5
