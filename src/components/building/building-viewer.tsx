import { Box, Button} from "@mui/material";
import { CssBaseline } from "@mui/material";
import { FC, useState } from "react";
import { useAppContext } from "../../middleware/context-provider";
import { Navigate } from "react-router-dom";
import { BuildingTopBar } from "./sidebar/building-topbar";
import { BuildingDrawer } from "./sidebar/building-drawer";
import { BuildingViewport } from "./viewport/building-viewport";
import { getDrawerHeader } from "./sidebar/mui-utils";
import { BuildingFrontMenu} from "./front-menu/building-front-menu";
import { FrontMenuMode } from "./types";
import { BuildingBottomMenu } from "./bottom-menu/building-bottom-menu";
export const BuildingViewer: FC = () => {
  const [sideOpen, setSideOpen] = useState(false);
  const [frontOpen, setFrontOpen] = useState(false);
  const [frontMenuMode, setFrontMenuMode] = useState<FrontMenuMode>("BuildingInfo");
  const [width] = useState(240);

  const [state, dispatch] = useAppContext();
  const [{ user, building }] = useAppContext();

  const DrawerHeader = getDrawerHeader();


  const onClose = () => {
    dispatch({ type: "CLOSE_BUILDING" });




  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (!building) {
    return <Navigate to={"/map"} />;
  }

  const toggleDrawer = (active: boolean) => {
    setSideOpen(active);
  }

  const toggleFrontMenu = (active: boolean, mode?: FrontMenuMode) => {
    if(mode) {
      setFrontMenuMode(mode);

    }
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
      onToggleMenu={toggleFrontMenu}
      />

      <Box component="main" sx={{flexGrow: 1, p:3 }}>
        <DrawerHeader/>
        <BuildingFrontMenu onToggleMenu={() => toggleFrontMenu(false)}
        open={frontOpen}
        mode={frontMenuMode}
        
        />

        <BuildingBottomMenu />
        <BuildingViewport />

        
      </Box>
      </Box>
    </>
  );
};
