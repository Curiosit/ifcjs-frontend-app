import { Button } from "@mui/material";
import { FC } from "react";
import { useAppContext } from "../../middleware/context-provider";
import { Navigate } from "react-router-dom";

export const BuildingViewer: FC = () => {

  const[state, dispatch] = useAppContext();
  const {building} = state;
  const onClose = () => {
    dispatch({type:"CLOSE_BUILDING"});

  }
  if (!building) {
    return <Navigate to={"/map"} />;
  }
  return (
  <>
  
  <div className="front-button-container">
  <Button  onClick={onClose} variant="contained">
        Map
  </Button>
  </div>
  </>
  );
};
