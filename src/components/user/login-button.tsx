import { FC } from "react";
import Button from "@mui/material/Button";
import { useAppContext } from "../../middleware/context-provider";

export const LogInButton: FC = () => {
  const dispatch = useAppContext()[1];

  const onLoginClick = () => {
    dispatch({ type: "LOGIN" });
  };

  return <Button onClick={onLoginClick}>Log in</Button>;
};
