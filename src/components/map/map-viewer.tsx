import { FC, useRef, useEffect, useState } from "react";
import { LogOutButton } from "../user/logout-button";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../../middleware/context-provider";
import { Button } from "@mui/material";
import "./map.css";
import "./../front.css";
export const MapViewer: FC = () => {
  const [state, dispatch] = useAppContext();
  const containerRef = useRef(null);
  const { user, building } = state;
  const [isCreating, setIsCreating] = useState(false);

  const onToggleCreate = () => {
    setIsCreating(!isCreating);
  }

  const onCreate = () => {
    if (isCreating) {
      dispatch({ type: "ADD_BUILDING", payload: user });
      setIsCreating(false);
    }
  }

  useEffect(() => {
    const container = containerRef.current;
    if (container && user) {
      dispatch({ type: "START_MAP", payload: {container, user} });  
    }

    
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (building) {
    const url = `/building?=${building.id}`;
    return <Navigate to={url}/>
  }

  return (
    <>
      <div onContextMenu={onCreate} className="full-screen" ref={containerRef} />
      {isCreating &&
        (
          <div className="overlay">
            <p>Right click to create a new Building, or </p>
            <Button onClick={onToggleCreate}>cancel</Button>
          </div>
        )}
        <div className="front-button-container">
      <Button onClick={onToggleCreate} variant="contained">Create Building</Button>
      <LogOutButton />
      </div>
    </>
  );
};
