import { Button, Card, CardContent } from "@mui/material";
import { FC } from "react";
import "./building-front-menu.css";
import CloseIcon from "@mui/icons-material/Close";
import { BuildingInfoMenu } from "./front-menu-content/building-info-menu";
import { useAppContext } from "../../../middleware/context-provider";
import { Navigate } from "react-router-dom";
import { FrontMenuMode } from "../types";
import { ModelListMenu } from "./front-menu-content/model-list-menu";
import { FloorplanMenu } from "./front-menu-content/floorplan-menu";
import { PropertiesMenu } from "./front-menu-content/properties-menu-content";
import { QuantityMenu } from "./front-menu-content/quantity";
import { SpatialTree } from "./front-menu-content/spatial-tree";

export const BuildingFrontMenu: FC<{
  mode: FrontMenuMode;
  open: boolean;
  onToggleMenu: (active: boolean) => void;
}> = ({ mode, open, onToggleMenu }) => {
  
  const [state,dispatch] = useAppContext();
  const {user} = state;
 
  if (!open) {
    return <></>;
  }
  const content = new Map<FrontMenuMode, any>();
  
  content.set("BuildingInfo", <BuildingInfoMenu onToggleMenu={onToggleMenu} />);
  content.set("ModelList", <ModelListMenu />);
  content.set("Properties", <PropertiesMenu />);
  content.set("Floorplans", <FloorplanMenu />);
  content.set("Quantity", <QuantityMenu />);
  content.set("SpatialTree", <SpatialTree />);

  const titles = {
    BuildingInfo: "Building Information",
    ModelList: "Model List",
    Properties: "Properties",
    Floorplans: "Floorplans",
    Quantity: "Quantity Takeoff",
    SpatialTree: "Spatial Tree",
  };

  const title = titles[mode];

  return (
    <Card className="front-menu">
      <CardContent>
        <div className="front-menu-header">
          <h2>{title}</h2>
          <Button onClick={() => onToggleMenu(false)}>
            <CloseIcon />
          </Button>
        </div>
        <div className="front-menu-content">{content.get(mode)}</div>
      </CardContent>
    </Card>
  );
};