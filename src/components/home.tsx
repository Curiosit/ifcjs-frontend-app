import { FC } from "react";
import { useAppContext } from "../middleware/context-provider";
import { Navigate } from "react-router-dom";
import { LogInButton } from "./user/login-button";

export const Dashboard: FC = () => {
  const [state] = useAppContext();

  return (state.user ? <Navigate to="/map" /> :
    <div>
      <div className="front-button-container">
        <LogInButton />
      </div>
      <div className="front-overlay">
        <div><img src="favicon.png" alt="" /></div>
        <div>React + IFC.js = Web BIM Viewer</div>
        <div></div>
      </div>
    </div>
  );

};

