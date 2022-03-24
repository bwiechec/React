import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import {ThreeDots} from "react-loader-spinner";
import "./spinner.css";

export const Spinner = (props) => {
    const { promiseInProgress } = usePromiseTracker();

    return (
        promiseInProgress && (
            <div className="spinner">
                <ThreeDots type="ThreeDots" color="#000000" height="100" width="100" />
            </div>
        )
    );
};

