import { State } from "../../../middleware/state";
import { Action } from "../../../middleware/actions";
import { Tool } from "../../../core/map/types";

import CutIcon from "@mui/icons-material/ContentCut";
import RulerIcon from "@mui/icons-material/Straighten";
import ExplodeIcon from "@mui/icons-material/ImportExport";

export function getBottombarTools (): Tool[] {
    const tools = [
        {
            name: "Clipping planes",
            active: false,
            icon: <CutIcon />,
            action: () => {
                console.log("Cutting");
            }
        },
        {
            name: "Measure",
            active: false,
            icon: <RulerIcon />,
            action: () => {
                console.log("measurin");
            }
        },
        {
            name: "Explode",
            active: false,
            icon: <ExplodeIcon />,

            action: (dispatch: any) => {
                console.log("EXPLODE");
                const tool = tools.find((tool) => tool.name === "Explosion");
                if (tool) {
                    tool.active = !tool.active;
                    dispatch({ type: "EXPLODE_MODEL", payload: tool.active });
                }
            }
        }
    ];
    const findTool = (name: string) => {
        const tool = tools.find((tool) => tool.name === name);
        if (!tool) throw new Error("Tool not found!");
        return tool;
      };
    
      const deactivateAllTools = (dispatch: any, name: string) => {
        for (const tool of tools) {
          if (tool.active && tool.name !== name) {
            tool.action(dispatch);
          }
        }
      };
    
      return tools;
}
