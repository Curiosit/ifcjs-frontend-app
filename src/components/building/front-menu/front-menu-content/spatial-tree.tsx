import { Button, TextField, Box } from "@mui/material";
import { FC, useRef } from "react";
import { useAppContext } from "../../../../middleware/context-provider";
import "./front-menu-content.css";

export const SpatialTree: FC = () => {
        const [state, dispatch] = useAppContext();
      
       
        const onSpatialButton = () => {
            
            console.log("count");
        }
      
        return (
          <div>
            
            Work in progress
          </div>
        );
      };
      