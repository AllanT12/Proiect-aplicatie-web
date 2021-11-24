import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import {NavLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import {MenuItem} from "@material-ui/core";
import * as PropTypes from "prop-types";


const useStyles = makeStyles((theme) => ({
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	toolbarTitle: {
		flexGrow: 1,
	},
	paper: {
    marginRight: theme.spacing(2),
  },
	root: {
    display: 'flex',
  },
}));


function Router(props) {
	return null;
}

Router.propTypes = {children: PropTypes.node};

function Header() {
	const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const go = () => {
  	 window.location.assign("/addSport");
  };

  const goc = () => {
  	window.location.assign("/addClubs");
  };

  const goe = () => {
  	window.location.assign("/addEvent");
  };

  const goC = () => {
  	window.location.assign("/Clubs");
  };

  const goDS = () => {
  	window.location.assign("/deleteClub");
  };

  const goDE = () => {
  	window.location.assign("/deleteEvents");
  };

   const goUU = () => {
  	window.location.assign("/updateUser");
  };

   const goUS = () => {
  	window.location.assign("/updateSport");
  };

   const goE = () => {
  	window.location.assign("/Events");
  };
   const goJ = () => {
  	window.location.assign("/joinClub");
  };
   const goR = () => {
  	window.location.assign("/editRequest");
  };
    const goS = () => {
  	window.location.assign("/showMembers");
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar
				position="static"
				color="default"
				elevation={0}
				className={classes.appBar}
			>
				<Toolbar className={classes.toolbar}>
					<Typography
						variant="h6"
						color="inherit"
						noWrap
						className={classes.toolbarTitle}
					>
						<Link
							component={NavLink}
							to="/home"
							underline="none"
							color="textPrimary"
						>
							Evenimete Sportive
						</Link>
					</Typography>
					<Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
						Menu
        </Button>
					<Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem onClick={go}>AddSport</MenuItem>
					  <MenuItem onClick={goUS}>UpdateSport</MenuItem>
					  <MenuItem onClick={goe}>CreateEvent</MenuItem>
					  <MenuItem onClick={goE}>Sports</MenuItem>
					  <MenuItem onClick={goDE}>DeleteEvent</MenuItem>
					  <MenuItem onClick={goc}>CreateClub</MenuItem>
					  <MenuItem onClick={goC}>SeeClub</MenuItem>
					  <MenuItem onClick={goJ}>JoinClub</MenuItem>
					  <MenuItem onClick={goDS}>DeleteClub</MenuItem>
					  <MenuItem onClick={goR}>UpdateRequests</MenuItem>
					  <MenuItem onClick={goS}>ClubMembers</MenuItem>
					  <MenuItem onClick={goUU}>UpdateUser</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>

					<Button
						href="#"
						color="primary"
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to="/logout"
					>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}
export default Header;