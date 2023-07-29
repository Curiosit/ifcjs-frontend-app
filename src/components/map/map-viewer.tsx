import { FC, useRef, useEffect } from "react";
import { LogOutButton } from "../user/logout-button";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../../middleware/context-provider";

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
    };
  }, []);

  if (!state.user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="full-screen" ref={canvasRef} />
      <LogOutButton />
      
    </>
  );
};
