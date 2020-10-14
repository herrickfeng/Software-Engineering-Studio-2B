import React, { useState, Fragment } from "react";
import clsx from "clsx";
import { Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Box from "@material-ui/core/Box";
import { Divider, ListItemIcon, ListSubheader } from "@material-ui/core";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
//import { AuthContext } from "../../context/auth";
const drawerWidth = 240;
const history = createBrowserHistory();

const styles = theme => ({
	root: {
    flexGrow: 1
  },
	flex: {
	  flex: 1
	},
	drawerPaper: {
	  position: "relative",
	  width: drawerWidth
	},
	menuButton: {
	  marginLeft: -12,
	  marginRight: 20
  },
  signOut:{
    color: "red"
  },
	toolbarMargin: theme.mixins.toolbar,
	aboveDrawer: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    color: "white",
    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
	  zIndex: theme.zIndex.drawer + 1
	}
  });
    
//Teacher tool bar
const MyToolbar = withStyles(styles)(({ classes, title, onMenuClick }) => (
  <Fragment>
    <AppBar className={classes.aboveDrawer}>
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography 
        variant="h5" 
        color="inherit" 
        className={classes.flex}>
          FAST W13 - Teacher
        </Typography>
      </Toolbar>
    </AppBar>
    <div className={classes.toolbarMargin} />
  </Fragment>
));
//Teacher drawer
const MyDrawer = withStyles(styles)(
  ({ classes, variant, open, onClose, onItemClick }) => (
    <Box>
      <Drawer
        variant={variant}
        open={open}
        onClose={onClose}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div
          className={clsx({
            [classes.toolbarMargin]: variant === "persistent"
          })}
        />
        <List>
          <ListItem>
            <ListItemIcon>
              <AccountBoxIcon fontSize="large"/>
            </ListItemIcon>
            <ListItemText primary="Teacher Directory" />
          </ListItem>
          <Divider/>
          <ListItem
            button
            component={Link}
            to="/teacher/subjectList"
            onClick={onItemClick("SubjectList")}
          >
            <ListItemText>Staff Dashboard</ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/upload"
            onClick={onItemClick("UploadPage")}
          >
            <ListItemText>Upload</ListItemText>
          </ListItem>
          <ListItem 
          button 
          component={Link}
          to="/teacher/subjectList/classList"
          onClick={onItemClick("ClassList")}>
            <ListItemText>Class List</ListItemText>
          </ListItem>

        
          <ListItem 
          button 
          component={Link}
          to="/teacher/profile"
          onClick={onItemClick("TeacherProfile")}>
            <ListItemText>Teacher Profile</ListItemText>
          </ListItem>
          <Divider/>
          

          <ListItem
          button
          component={Link}
          to="/signout"
          onClick={onItemClick("/signout")}
          className={classes.signOut}
          >
          <ListItemText>Sign Out</ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <Link to="/teacher/subjectList" />
        <Link to="/teacher/subjectList" />
        <Link to="/studnet/attendance" />
        <Link to="/signout" />
      </main>
    </Box>
  )
);

function AppBarInteraction({ classes, variant }) {
  const [drawer, setDrawer] = useState(false);
  // const [title, setTitle] = useState("Home");

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const onItemClick = title => () => {
    // setTitle(title);
    setDrawer(variant === "temporary" ? false : drawer);
    setDrawer(!drawer);
  };

  return (
    <div className={classes.root}>
      <MyToolbar 
      onMenuClick={toggleDrawer} />
      <MyDrawer
        open={drawer}
        onClose={toggleDrawer}
        onItemClick={onItemClick}
        variant={variant}
      />
    </div>
  );
}

export default withStyles(styles)(AppBarInteraction);