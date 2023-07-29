import { FC, useEffect, useRef } from "react";
import {Navigate } from "react-router-dom";
import { useAppContext } from "../../middleware/context-provider";
import { Button } from "@mui/material";

export const MapViewer: FC = () => {

    const [state, dispatch] = useAppContext();
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas && state.user) {
            dispatch({ type: "START_MAP", payload: canvas });
        }

        return () => {
            dispatch({ type: "REMOVE_MAP" });
        }

    }, []);

    /* if (state.user) {
       return <Navigate to="/map" />;

    }  */
    const onLogout = () => {
        dispatch({ type: "LOGOUT"});
    }
    return (
        <>
            <h1>MAP</h1>
            <Button onClick={onLogout}>Logout</Button>
            <div ref={canvasRef} className="full-screen"></div>
        </>
    );
}