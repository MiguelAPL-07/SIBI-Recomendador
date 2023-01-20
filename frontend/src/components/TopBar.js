import { Button, Grid, Box, Toolbar, Typography, IconButton, Tabs,
    Divider, List, ListItemButton, ListItemIcon, ListItemText  } from "@mui/material";
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { styled, useTheme } from '@mui/material/styles';
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import RecommendOutlinedIcon from '@mui/icons-material/RecommendOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import TheaterComedyOutlinedIcon from '@mui/icons-material/TheaterComedyOutlined';
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import SpeakerOutlinedIcon from '@mui/icons-material/SpeakerOutlined';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';

const drawerWidth = 330;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


function TopBar({selectItem}) {

    // Menu izquierdo
    const [open, setOpen] = useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <AppBar position="absolute" open={open} style={{ background: 'gray' }}>
                <Toolbar
                sx={{
                    pr: '24px',
                }}
                >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    sx={{
                    marginRight: '36px',
                    ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Grid container spacing={1}>
                    <Grid item xs={3} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      <h1>RRECOMENDADOR DE EVENTOS</h1>
                    </Typography>
                    <Grid item  sx={{ mt: 4  }} >
                      <Link to='/'><Button variant="contained"startIcon={<PersonOffOutlinedIcon />}>Cerrar Sesion</Button></Link>
                    </Grid>
                      </Grid>
                </Toolbar>
            </AppBar>

        <Drawer variant="permanent" open={open}>
            <Toolbar
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
            }}
            >
              <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              <ListItemButton onClick={() => selectItem("Menu_1")}>
                  <ListItemIcon>
                    <AssessmentOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Inicio" />
              </ListItemButton>
              <Divider />
              <ListItemButton  onClick={() => selectItem("Menu_2")}>
                  <ListItemIcon>
                    <ThumbUpAltOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Conciertos que te gustan" />
              </ListItemButton>
              <ListItemButton  onClick={() => selectItem("Menu_3")}>
                  <ListItemIcon>
                    <RecommendOutlinedIcon/> 
                  </ListItemIcon>
                  <ListItemText primary="Conciertos recomendados para ti" />
              </ListItemButton>
              <ListItemButton  onClick={() => selectItem("Menu_4")}>
                  <ListItemIcon>
                    <AutoStoriesOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Todos los conciertos" />
              </ListItemButton>
              <Divider />
              <ListItemButton  onClick={() => selectItem("Menu_5")}>
                  <ListItemIcon>
                    <BookmarkAddedOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Artistas que sigues" />
              </ListItemButton>
              <ListItemButton  onClick={() => selectItem("Menu_6")}>
                  <ListItemIcon>
                    <WorkspacePremiumOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Artistas recomendados para ti" />
              </ListItemButton>
              <ListItemButton  onClick={() => selectItem("Menu_7")}>
                  <ListItemIcon>
                    <TheaterComedyOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Todos los artistas" />
              </ListItemButton>
              <Divider />
              <ListItemButton  onClick={() => selectItem("Menu_8")}>
                  <ListItemIcon>
                    <PlaylistAddCheckOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Salas que has valorado" />
              </ListItemButton>
              <ListItemButton  onClick={() => selectItem("Menu_9")}>
                  <ListItemIcon>
                    <SpeakerOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Todas las salas" />
              </ListItemButton>
            </List>
        </Drawer>
        </div>
    );
};

export default TopBar;