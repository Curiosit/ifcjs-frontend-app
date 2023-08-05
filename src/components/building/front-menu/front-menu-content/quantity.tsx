import { Button, TextField, Box } from "@mui/material";
import { FC, useRef } from "react";
import { useAppContext } from "../../../../middleware/context-provider";
import "./front-menu-content.css";


export const QuantityMenu: FC = () => {
    const [state, dispatch] = useAppContext();
  
   
    const onQuantityButton = () => {
        console.log("count");
    }
  
    return (
      <div>
        Work in progress
      </div>
    );
  };
  