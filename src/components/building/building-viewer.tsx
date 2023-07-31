import { Box, Button} from "@mui/material";
import { CssBaseline } from "@mui/material";
import { FC, useState } from "react";
import { useAppContext } from "../../middleware/context-provider";
import { Navigate } from "react-router-dom";
import { BuildingTopBar } from "./building-topbar";
import { BuildingDrawer } from "./building-drawer";
import { getDrawerHeader } from "./mui-utils";
import { BuildingFrontMenu } from "./front-menu/building-front-menu";
export const BuildingViewer: FC = () => {
  const [sideOpen, setSideOpen] = useState(false);
  const [frontOpen, setFrontOpen] = useState(false);
  const [width] = useState(240);

  const [state, dispatch] = useAppContext();
  const [{ user, building }] = useAppContext();

  const DrawerHeader = getDrawerHeader();


  const onClose = () => {
    dispatch({ type: "CLOSE_BUILDING" });




  }
  if (!building) {
    return <Navigate to={"/map"} />;
  }

  const toggleDrawer = (active: boolean) => {
    setSideOpen(active);
  }

  const toggleFrontMenu = (active: boolean) => {
    setFrontOpen(active);
  }
  return (
    <>
      <Box sx={{display: "flex"}}>
        <CssBaseline></CssBaseline>
      <BuildingTopBar width={width} open={sideOpen} onOpen={() => toggleDrawer(true)}/>
      
      <BuildingDrawer
      width={width}
      open={sideOpen}
      onClose={() => toggleDrawer(false)}
      onToggleMenu={() => toggleFrontMenu(true)}
      />

      <Box component="main" sx={{flexGrow: 1, p:3 }}>
        <DrawerHeader/>
        <BuildingFrontMenu onToggleMenu={() => toggleFrontMenu(false)}
        open={frontOpen}
        mode="BuildingInfo"
        
        />

        
      </Box>
      </Box>
    </>
  );
};
