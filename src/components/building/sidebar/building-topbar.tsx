import { AppBar, Box, Button } from "@mui/material";
import { FC, useState } from "react";
import { useAppContext } from "../../../middleware/context-provider";
import { Navigate } from "react-router-dom";
import { getAppBar } from "./mui-utils";
import {Toolbar, IconButton, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
export const BuildingTopBar: FC<{
    open: boolean; 
    onOpen: () => void;
    width: number;
    }> = (props) => {
  
    const {open, onOpen, width } = props;
    const AppBar = getAppBar(width);

    return (
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={onOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Building viewer
            </Typography>
          </Toolbar>
        </AppBar>
      );
};
