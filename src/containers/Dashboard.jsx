
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom'
import ProfileMenu from '../components/DashboardComponents/ProfileMenu'
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DashboardRouter from './DashboardRouter'
import Brand from '../components/UtilComponents/Brand';
import SearchbarRouter from '../components/DashboardComponents/SearchbarRouter'

import SideBarRouter from '../components/DashboardComponents/SideBarRouter' 

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
   codeArea:{
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    width:'100%'
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
}));

 const Navbar = ({handleDrawerToggle,menuButton}) => {
      return (
          <div className='d-flex p-2 px-4 align-items-center bg-white justify-content-between'>
                <div className='text-dark' >   
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                   
                </div>
                <div className='d-flex align-items-center justify-content-end'>
                    <SearchbarRouter />
                    <ProfileMenu/>
                </div>
               
          </div>
      )
  }

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const SideDrawer = ({toggler}) => (
    <div className='sidebar' >
        <div className='px-3 py-2'>
            <Brand color='light'/>
        </div>
        <div className='border-bottom border-white' />
        <SideBarRouter toggler={toggler}/>
    </div>
  );

 

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className='d-flex col-12 p-2'>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
            <Navbar handleDrawerToggle={handleDrawerToggle} menuButton={classes.menuButton} />
      </AppBar>
      
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <SideDrawer toggler = {handleDrawerToggle} />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <SideDrawer toggler = {()=>{}} />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.codeArea} style={{minHeight:'95vh'}}>
        <div className={classes.toolbar} />
        <DashboardRouter/>
      </main>
    </div>
  );
}

export default ResponsiveDrawer;