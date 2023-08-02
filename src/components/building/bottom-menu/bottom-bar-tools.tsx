import { State } from "../../../middleware/state";
import { Action } from "../../../middleware/actions";
import { Tool } from "../../../core/map/types";

import CutIcon from "@mui/icons-material/ContentCut";
import RulerIcon from "@mui/icons-material/Straighten";
import ExplodeIcon from "@mui/icons-material/ImportExport";

export function getBottombarTools(
    state: State,
    dispatch: React.Dispatch<Action>,

): Tool[] 
    {
        return [
            {
                name: "Clipping planes",
                icon: <CutIcon />,
                action: () => {
                    console.log("Cutting");
                }
            },
            {
                name: "Measure",
                icon: <RulerIcon />,
                action: () => {
                    console.log("measurin");
                }
            },
            {
                name: "Explode",
                icon: <ExplodeIcon />,
                action: () => {
                    console.log("exploding");
                }
            }
        ]
    }
