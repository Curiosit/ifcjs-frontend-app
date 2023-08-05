import { State } from "../../../middleware/state";
import { Action } from "../../../middleware/actions";
import { Tool } from "../../../core/map/types";

import CutIcon from "@mui/icons-material/ContentCut";
import RulerIcon from "@mui/icons-material/Straighten";
import ExplodeIcon from "@mui/icons-material/ImportExport";

export function getBottombarTools(): Tool[] {
  const tools = [
    {
      name: "Clipping planes",
      icon: <CutIcon />,
      active: false,
      action: (dispatch: any) => {
        const tool = findTool("Clipping planes");
        deactivateAllTools(dispatch, "Clipping planes");
        tool.active = !tool.active;
        dispatch({ type: "TOGGLE_CLIPPER", payload: tool.active });
      },
    },
    {
      name: "Dimensions",
      icon: <RulerIcon />,
      active: false,
      action: (dispatch: any) => {
        const tool = findTool("Dimensions");
        deactivateAllTools(dispatch, "Dimensions");
        console.log(tool);
                tool.active = !tool.active;
                console.log(tool);
        dispatch({ type: "TOGGLE_DIMENSIONS", payload: tool.active });
      },
    },
    {
      name: "Explosion",
      icon: <ExplodeIcon />,
      active: false,
      action: (dispatch: any) => {
        const tool = findTool("Explosion");
        deactivateAllTools(dispatch, "Explosion");
        console.log(tool);
        tool.active = !tool.active;
        console.log(tool);
        dispatch({ type: "EXPLODE_MODEL", payload: tool.active });
      },
    },
  ];

  const findTool = (name: string) => {
    const tool = tools.find((tool) => tool.name === name);
    if (!tool) throw new Error("Tool not found!");
    return tool;
  };

  const deactivateAllTools = (dispatch: any, name: string) => {
    console.log(dispatch);
    console.log(name);
    for (const tool of tools) {
      console.log(tool.active);
      if (tool.active && tool.name !== name) {
        console.log(dispatch);
        tool.action(dispatch);
      }
    }
  };

  return tools;
}
