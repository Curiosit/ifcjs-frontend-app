import { FC } from "react";
import { Button } from "@mui/material";
import { useAppContext } from "../../middleware/context-provider";
import {Navigate } from "react-router-dom";
export const LoginForm: FC = () => {

    const [state, dispatch] = useAppContext();
    const onLogin = () => {
        console.log("login");
        dispatch({type: "LOGIN"});
    };

    const onLogout = () => {
        dispatch({ type: "LOGOUT"});
    }
    /* if (state.user) {
        return <Navigate to="/login" />;
 
    }; */
    return (
    state.user ? 
        (
        <p>
            {state.user?.displayName}
            <Button onClick ={onLogout}>Logout</Button>
        </p>
        ) 
        : (<Button onClick ={onLogin}>Login</Button>)
    );
};