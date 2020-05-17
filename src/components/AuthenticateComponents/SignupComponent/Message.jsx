import React, { useEffect, useState } from "react";
import Alert from "@material-ui/lab/Alert";
import LinearProgress from "../../UtilComponents/LinearProgress";
import axios from "axios";

function Message(props) {
    const [upload, setupload] = useState({ flag: true, error: false, msg: "" });

    useEffect(() => {
        axios
            .post(
                "/register",
                {
                    ...props.data,
                },
                {
                    withCredentials: true,
                }
            )
            .then((result) => {
                let status = result.data.status;

                if (status === 200) {
                    setupload({ ...upload, flag: false });
                } else if (status === 401) {
                    setupload({
                        ...upload,
                        flag: false,
                        error: true,
                        msg: "User already exists!",
                    });
                } else if (status === 423) {
                    setupload({
                        ...upload,
                        flag: false,
                        error: true,
                        msg: "Insufficent Data Sent",
                    });
                } else if (status === 500) {
                    setupload({
                        ...upload,
                        flag: false,
                        error: true,
                        msg: "Something went wrong at our end",
                    });
                }
            })
            .catch((err) => {
                setupload({
                    ...upload,
                    flag: false,
                    error: true,
                    msg: "Something went wrong at our end",
                });
            });
    }, []);

    if (upload.flag) {
        return <LinearProgress />;
    } else if (upload.error) {
        return (
            <div className="d-flex justify-content-center">
                <Alert severity="error">{upload.msg}</Alert>
            </div>
        );
    } else {
        return (
            <div className="d-flex justify-content-center">
                <Alert severity="success">
                    <h5 className="text-break">
                        Verification mail has been sent to
                        <b> {props.data.email}</b>
                    </h5>
                    <p>
                        This email contains a verification link, and it will
                        expire within 1 hour of generation. So
                        <strong> check it</strong> as soon as possible.
                    </p>
                </Alert>
            </div>
        );
    }
}

export default Message;
