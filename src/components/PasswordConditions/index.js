import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CheckIcon from "@material-ui/icons/Check";
import DotIcon from "@material-ui/icons/FiberManualRecordSharp";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  passwordErrorClass: {
    "& .MuiListItem-gutters": {
      padding: "0px",
    },
    "& .MuiListItemIcon-root": {
      color: "#586877",
      minWidth: "20px",
      "& .MuiSvgIcon-root": {
        color: "#586877",
        fontSize: "x-small",
      },
    },
    "& .MuiListItemText-root": {
      color: "#586877",
      fontSize: "16px",
    },
  },
  passwordSuccessClass: {
    "& .MuiListItem-gutters": {
      padding: "0px",
    },
    "& .MuiListItemIcon-root ": {
      color: "#02BF86",
      minWidth: "20px",
      "& .MuiSvgIcon-root": {
        color: "#02BF86",
        fontSize: "medium",
      },
    },
    "& .MuiListItemText-root": {
      color: "#02BF86",
      fontSize: "16px",
    },
  },
}));

function PasswordConditions(props) {
  const classes = useStyles();
  const { conditions } = props;
  return (
    <div>
      <List className={classes.passwordErrorClass}>
        <ListItemText primary="Passwords should have:" />

        <ListItem
          className={
            conditions && conditions.passwordCondition1
              ? classes.passwordSuccessClass
              : classes.passwordErrorClass
          }
        >
          <ListItemIcon>
            {conditions && conditions.passwordCondition1 ? (
              <CheckIcon />
            ) : (
              <DotIcon />
            )}
          </ListItemIcon>
          <ListItemText primary="Atleast 8 characters" />
        </ListItem>

        <ListItem
          className={
            conditions && conditions.passwordCondition2
              ? classes.passwordSuccessClass
              : classes.passwordErrorClass
          }
        >
          <ListItemIcon>
            {conditions && conditions.passwordCondition2 ? (
              <CheckIcon />
            ) : (
              <DotIcon />
            )}
          </ListItemIcon>
          <ListItemText primary="Digits (0-9), Upper Case (A-Z) and Lower Case (a-z)" />
        </ListItem>

        <ListItem
          className={
            conditions && conditions.passwordCondition3
              ? classes.passwordSuccessClass
              : classes.passwordErrorClass
          }
        >
          <ListItemIcon>
            {conditions && conditions.passwordCondition3 ? (
              <CheckIcon />
            ) : (
              <DotIcon />
            )}
          </ListItemIcon>
          <ListItemText primary="Atleast one special character (*, &,!...)" />
        </ListItem>
      </List>
    </div>
  );
}

export default PasswordConditions;
